const daysBlock = document.querySelector(".timer__days");
const hoursBlock = document.querySelector(".timer__hours");
const minutesBlock = document.querySelector(".timer__minutes");
const secondsBlock = document.querySelector(".timer__seconds");

let interval;

const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const lastNum = value % 10;

  if ((value > 10) & (value < 20)) return words[2];
  if (lastNum > 1 && lastNum < 5) return words[1];
  if (lastNum === 1) return words[0];

  return words[2];
};

const updateTimer = () => {
  const date = new Date();
  const dateDeadLine = new Date("5 december 2025").getTime();
  const timeRemaining = (dateDeadLine - date) / 1000;

  const days = Math.floor(timeRemaining / 60 / 60 / 24);
  const hours = Math.floor((timeRemaining / 60 / 60) % 24);
  const minutes = Math.floor((timeRemaining / 60) % 60);
  const seconds = Math.floor(timeRemaining % 60);

  const fDays = days < 10 ? "0" + days : days;
  const fHours = hours < 10 ? "0" + hours : hours;
  const fMinutes = minutes < 10 ? "0" + minutes : minutes;
  const fSeconds = seconds < 10 ? "0" + seconds : seconds;

  daysBlock.textContent = fDays;
  hoursBlock.textContent = fHours;
  minutesBlock.textContent = fMinutes;
  secondsBlock.textContent = fSeconds;

  const setLabel = (block, value, words) => {
    if (!block) return;
    const labelEl = block.nextElementSibling;
    if (!labelEl) return;
    labelEl.textContent = numWord(value, words);
  };

  setLabel(secondsBlock, seconds, ["секунда", "секунды", "секунд"]);
  setLabel(minutesBlock, minutes, ["минута", "минуты", "минут"]);
  setLabel(hoursBlock, hours, ["час", "часа", "часов"]);
  setLabel(daysBlock, days, ["день", "дня", "дней"]);

  if (timeRemaining <= 0) {
    clearInterval(interval);
    daysBlock.textContent = "00";
    hoursBlock.textContent = "00";
    minutesBlock.textContent = "00";
    secondsBlock.textContent = "00";
  }
};

updateTimer();

interval = setInterval(updateTimer, 500);
