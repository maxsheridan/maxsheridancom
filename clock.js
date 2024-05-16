function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const date = now.toDateString(); // Get the current date
  const timeString = `${date} ${hours}:${minutes}`; // Combine date and time
  document.getElementById('clock').textContent = timeString;
}

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();