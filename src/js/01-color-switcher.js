function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const INTERVAL = 1000;
let intervalId = null;

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', changeColor);
buttonStop.addEventListener('click', onButtonStop);

function changeColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
  buttonStart.disabled = true;
}

function onButtonStop() {
  clearInterval(intervalId);
  buttonStart.disabled = false;
}
