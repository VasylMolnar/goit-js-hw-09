import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
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
      window.alert('Please choose a date in the future');
      selectedDates[0] = new Date();
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

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
  timerID = setInterval(() => {
    const componentsTimer = convertMs(selectedTime - Date.now());
    updateComponentsTimer(componentsTimer);
    if (componentsTimer.hours <= 0) {
      stopTimer();
    }
    //console.log(componentsTimer.hours);
  }, 1000);
});
