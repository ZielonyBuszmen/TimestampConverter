const ONE_DAY = 86400;

function resetForms(type) {
  if (type === 'timestamp') {
    const input = document.getElementById('timestamp-input');
    input.value = '';
    input.focus();
  } else if (type === 'date') {
    const day = document.getElementById('date-day');
    const month = document.getElementById('date-month');
    const year = document.getElementById('date-year');
    day.value = '';
    month.value = '';
    year.value = '';
    day.focus();
  }
}

/**
 * TIMESTAMP to human date
 */
const timestampChanged = (e) => {
  e.preventDefault();
  const timestampValue = document.querySelector('#timestamp-input').value;
  const timestampToDateResult = document.querySelector('#timestamp-to-date-result');
  timestampToDateResult.innerHTML = timestampToDate(timestampValue);
};

/**
 * Human date to TIMESTAMP
 */
const dateChanged = (e) => {
  e.preventDefault();
  const day = document.querySelector('#date-day').value || 1;
  const month = (document.querySelector('#date-month').value || 1) - 1;
  const year = document.querySelector('#date-year').value || 1970;
  const dateToTimestamp = document.querySelector('#date-to-timestamp-result');
  dateToTimestamp.innerHTML = Date.UTC(year, month, day) / 1000;
};

// add listeners to input's and form
document.getElementById('timestamp-form').addEventListener('submit', timestampChanged);
document.getElementById('timestamp-input').addEventListener('keyup', timestampChanged);
document.getElementById('timestamp-input').addEventListener('change', timestampChanged);
document.getElementById('timestamp-input').focus();

document.getElementById('date-form').addEventListener('submit', dateChanged);
document.getElementById('date-year').addEventListener('change', dateChanged);


/** * * * * * * * * * * * * * * * * * * *
 * Helper functions
 */

const addLeadingZero = (number) => number < 10 ? `0${number}` : `${number}`;

function timestampToDate(unix_timestamp) {
  const a = new Date(unix_timestamp * 1000);
  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  const year = a.getUTCFullYear();
  const month = addLeadingZero(a.getUTCMonth() + 1); // +1, because returns month from 0
  const date = a.getUTCDate();
  const hour = a.getUTCHours();
  const min = addLeadingZero(a.getUTCMinutes());
  const sec = addLeadingZero(a.getUTCSeconds());
  return `${date}.${month}.${year} ${hour}:${min}:${sec}`;
}

function toStartOfDay() {
  const timestampInput = document.getElementById('timestamp-input');
  timestampInput.value = timestampInput.value - timestampInput.value % ONE_DAY;
  document.getElementById('goTimestamp').click();
}

function toStartOfMonth() {
  const timestampInput = document.getElementById('timestamp-input');
  const a = new Date(timestampInput.value * 1000);
  const month = a.getUTCMonth();
  const year = a.getUTCFullYear();
  timestampInput.value = Date.UTC(year, month) / 1000;
  document.getElementById('goTimestamp').click();
}

function toStartOfYear() {
  const timestampInput = document.getElementById('timestamp-input');
  const a = new Date(timestampInput.value * 1000);
  const year = a.getUTCFullYear();
  timestampInput.value = Date.UTC(year, 0) / 1000;
  document.getElementById('goTimestamp').click();
}

/**
 * Increment or decrement DAY, MONTH or YEAR
 */
function cremento(element, type, min, max) {
  let value = (parseInt(element.value) || 1);
  value += (type === '+') ? +1 : -1;
  if (value >= min && value <= max) {
    element.value = value;
  }
  if (min === max) element.value = value; // to avoid limits, like years' input
  document.getElementById('goDate').click();
}

function crementoDay(type) {
  const element = document.getElementById('date-day');
  cremento(element, type, 1, 31);
}

function crementoMonth(type) {
  const element = document.getElementById('date-month');
  cremento(element, type, 1, 12);
}

function crementoYear(type) {
  const element = document.getElementById('date-year');
  cremento(element, type, 0, 0);
}


/**  * * * * * * * * * * * * * * * * * * *
 * Highlight UTV and LT buttons
 */

function highlightUTCButton(type) {
  const secondary = type === 'utc_button' ? 'lt_button' : 'utc_button';
  const primaryButton = document.getElementById(type);
  primaryButton.classList.remove('btn-secondary');
  primaryButton.classList.add('btn-primary');
  const secondaryButton = document.getElementById(secondary);
  secondaryButton.classList.remove('btn-primary');
  secondaryButton.classList.add('btn-secondary');
}

function UTCToggle(type) {
  if (type === 'utc') {
    highlightUTCButton('utc_button');
  }
  if (type === 'lt') {
    highlightUTCButton('lt_button');
  }
}

/** * * * * * * * * * * * * * * * * * * *
 * "NOW" button
 */
function getToday() {
  const now = new Date();
  document.getElementById('date-day').value = now.getUTCDate();
  document.getElementById('date-month').value = addLeadingZero(now.getUTCMonth() + 1);
  document.getElementById('date-year').value = now.getUTCFullYear();
  document.getElementById('goDate').click();
}