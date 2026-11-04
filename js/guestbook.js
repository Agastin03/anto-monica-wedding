/**
 * David & Monica Wedding Invitation
 * Interactive Guestbook & Blessings
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'david_monica_wedding_wishes';
  const form = document.getElementById('wishes-form');
  const feed = document.getElementById('wishes-feed');

  // Pre-seeded authentic blessings
  const defaultWishes = [
    {
      name: "Rev. Father & Parish Council",
      relation: "Seven Dolours Church",
      message: "May the divine grace of Almighty God bless your union with eternal love, unwavering faith, and joyful peace. 'What God has joined together, let no one separate.'",
      date: "Confirmed"
    },
    {
      name: "The Viagul & Merlin Families",
      relation: "Family",
      message: "With hearts full of gratitude, we rejoice as David & Monica step into holy matrimony. May your home be filled with endless smiles and God's abundant favors.",
      date: "Confirmed"
    }
  ];

  function getWishes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultWishes;
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function renderWishes() {
    if (!feed) return;
    const wishes = getWishes();
    feed.innerHTML = '';

    wishes.forEach(wish => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.innerHTML = `
        <div class="wish-card-header">
          <span class="wish-author">${escapeHtml(wish.name)}</span>
          <span class="wish-date">${escapeHtml(wish.date || 'Recent')}</span>
        </div>
        <p class="wish-text">"${escapeHtml(wish.message)}"</p>
      `;
      feed.appendChild(card);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Simple Golden Confetti Burst without external npm library
  function triggerCelebration() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.inset = '0';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    const colors = ['#C49A55', '#E5C378', '#8E302A', '#FFF7EC', '#F5E4B8'];
    const pieceCount = 60;

    for (let i = 0; i < pieceCount; i++) {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = '50%';
      el.style.top = '60%';
      el.style.width = Math.random() * 8 + 6 + 'px';
      el.style.height = Math.random() * 12 + 8 + 'px';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(el);

      const angle = (Math.PI * 2 * i) / pieceCount + (Math.random() - 0.5);
      const velocity = Math.random() * 350 + 150;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 250; // upward push

      el.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${vx}px, ${vy + 600}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 1200 + 1400,
        easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)',
        fill: 'forwards'
      });
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 2800);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('guest-name');
      const messageInput = document.getElementById('guest-message');
      const attendanceSelect = document.getElementById('guest-attendance');

      if (!nameInput || !messageInput) return;

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      const attendance = attendanceSelect ? attendanceSelect.value : 'Attending';

      if (!name || !message) {
        if (window.showToast) {
          window.showToast("Please enter your name and message.");
        }
        return;
      }

      const newWish = {
        name: name + (attendance ? ` (${attendance})` : ''),
        message: message,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      const wishes = getWishes();
      wishes.unshift(newWish);
      saveWishes(wishes);

      renderWishes();
      form.reset();

      triggerCelebration();

      if (window.showToast) {
        window.showToast("Your heartfelt blessings have been sent! Thank you.");
      }
    });
  }

  // Initial render
  renderWishes();
})();
