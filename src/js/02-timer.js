import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  input: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

refs.buttonStart.setAttribute('disabled', true);
let targetDate = null;

refs.buttonStart.addEventListener('click', handleStartTimer);

function toggleStatus(isDisabled, ...refs) {
  refs.forEach(item => {
    item.disabled = isDisabled;
  });
}
function handleStartTimer() {
  toggleStatus(true, refs.input, refs.buttonStart);
  const intervalId = setInterval(() => {
    if (targetDate - new Date() < 1000) {
      toggleStatus(false, refs.input, refs.buttonStart);
      clearInterval(intervalId);
    }
    const { days, hours, minutes, seconds } = convertMs(
      targetDate - new Date()
    );
    const { daysRef, hoursRef, minutesRef, secondsRef } = refs;
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      refs.buttonStart.disabled = false;
      targetDate = selectedDates[0];
    } else {
      refs.buttonStart.disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 1500,
        width: '400px',
      });
    }
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
}
