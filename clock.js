function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
  const date = now.toLocaleDateString('ja-JP', dateOptions) + ' '; // Adding a space after the date
  const timeString = `${date} ${hours}:${minutes}`;
  document.getElementById('clock').textContent = timeString;
}

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();