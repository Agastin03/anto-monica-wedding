/**
 * Anto & Monica Wedding Invitation
 * Live Countdown Timer (Asia/Kolkata - IST)
 * Target: Sunday, 29 November 2026, 10:30 AM IST
 * IST is UTC+05:30 -> UTC 05:00:00 -> 1795928400000 ms
 */

(function () {
  'use strict';

  // Target time: 29 November 2026, 10:30:00 AM IST (UTC 05:00:00)
  // Exact Unix epoch timestamp in milliseconds: 1795928400000
  const TARGET_TIMESTAMP = 1795928400000;

  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const celebrationMsg = document.getElementById('countdown-celebration');

  function padZero(num) {
    const val = Math.max(0, Math.floor(num));
    return val < 10 ? '0' + val : String(val);
  }

  function updateCountdown() {
    try {
      const now = Date.now();
      const diff = TARGET_TIMESTAMP - now;

      // When the sacred matrimony ceremony time has genuinely arrived
      if (diff <= 0) {
        if (countdownGrid) {
          countdownGrid.style.display = 'none';
        }
        if (celebrationMsg) {
          celebrationMsg.style.display = 'block';
          celebrationMsg.classList.add('is-celebrating', 'reveal', 'active');
        }
        return;
      }

      // During the countdown period before the wedding
      if (countdownGrid && countdownGrid.style.display === 'none') {
        countdownGrid.style.display = 'grid';
      }
      if (celebrationMsg) {
        celebrationMsg.style.display = 'none';
        celebrationMsg.classList.remove('is-celebrating');
      }

      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (daysEl) daysEl.textContent = padZero(days);
      if (hoursEl) hoursEl.textContent = padZero(hours);
      if (minutesEl) minutesEl.textContent = padZero(minutes);
      if (secondsEl) secondsEl.textContent = padZero(seconds);
    } catch (err) {
      console.error("Countdown calculation error:", err);
    }
  }

  // Run calculation immediately upon script evaluation
  updateCountdown();

  // Tick every second
  const timerInterval = setInterval(updateCountdown, 1000);

  // Recalculate on DOMContentLoaded, window load, and pageshow (back/forward cache restore)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCountdown);
  }
  window.addEventListener('load', updateCountdown);
  window.addEventListener('pageshow', updateCountdown);

  // Expose helper to global window for testing & debugging
  window.WeddingCountdown = {
    target: TARGET_TIMESTAMP,
    update: updateCountdown,
    timerInterval: timerInterval
  };
})();
