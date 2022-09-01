import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let selectedTime = null;
let timerID;
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      //window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
      //test selectedTime = new Date('Fri Sep 01 2022 17:43:00 GMT+0300');
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const updateComponentsTimer = ({ days, hours, minutes, seconds }) => {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};

const stopTimer = () => {
  clearInterval(timerID);
};

refs.startBtn.disabled = true;
flatpickr(refs.inputDate, options);

refs.startBtn.addEventListener('click', () => {
  console.log(selectedTime);
  timerID = setInterval(() => {
    const deltaTime = selectedTime - Date.now();
    const componentsTimer = convertMs(deltaTime);
    updateComponentsTimer(componentsTimer);
    if (deltaTime <= 0) {
      stopTimer();
    }
    //console.log(componentsTimer.hours);
  }, 1000);
});
