/**
 * Anto & Monica Wedding Invitation
 * Couple Photo Gallery & Lightbox Controller
 */

(function () {
  'use strict';

  const galleryItems = [
    {
      src: 'assets/images/couple/photo1.jpg',
      title: 'Traditional Elegance',
      subtitle: 'United in Faith & Grace'
    },
    {
      src: 'assets/images/couple/photo2.jpg',
      title: 'Love in Lights',
      subtitle: 'Two Hearts, One Celebration'
    },
    {
      src: 'assets/images/couple/photo3.png',
      title: 'Written in the Stars',
      subtitle: 'Under God’s Guiding Light'
    },
    {
      src: 'assets/images/couple/photo4.png',
      title: 'Timeless Romance',
      subtitle: 'Beginning Our Eternal Journey'
    },
    {
      src: 'assets/images/couple/photo5.png',
      title: 'Moonlit Devotion',
      subtitle: 'Silhouetted in Holy Love'
    },
    {
      src: 'assets/images/couple/photo6.jpg',
      title: 'Together Forever',
      subtitle: 'Anto & Monica • 29 November 2026'
    }
  ];

  let currentIndex = 0;

  const modal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const captionTitle = document.getElementById('lightbox-caption-title');
  const captionDesc = document.getElementById('lightbox-caption-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal || !lightboxImg) return;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = galleryItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;

    if (captionTitle) captionTitle.textContent = item.title;
    if (captionDesc) captionDesc.textContent = item.subtitle;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  }

  // Bind gallery cards
  document.querySelectorAll('.gallery-item').forEach((itemEl, idx) => {
    itemEl.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  // Buttons
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Click outside image to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      showNext();
    }
    if (touchEndX > touchStartX + threshold) {
      showPrev();
    }
  }

  window.WeddingGallery = {
    open: openLightbox,
    close: closeLightbox,
    items: galleryItems
  };
})();
