/**
 * Anto & Monica Wedding Invitation
 * Live Countdown Timer (Asia/Kolkata - IST)
 * Target: 29 November 2026, 10:30 AM IST
 */

(function () {
  'use strict';

  // Target time: 29 November 2026, 10:30 AM IST (which is 05:00:00 UTC)
  const TARGET_TIMESTAMP = Date.UTC(2026, 10, 29, 5, 0, 0);

  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const celebrationMsg = document.getElementById('countdown-celebration');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function padZero(num) {
    return num < 10 ? '0' + num : num.toString();
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = TARGET_TIMESTAMP - now;

    if (diff <= 0) {
      if (countdownGrid) countdownGrid.style.display = 'none';
      if (celebrationMsg) {
        celebrationMsg.style.display = 'block';
        celebrationMsg.classList.add('reveal', 'active');
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = padZero(days);
    hoursEl.textContent = padZero(hours);
    minutesEl.textContent = padZero(minutes);
    secondsEl.textContent = padZero(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
