/**
 * David & Monica Wedding Invitation
 * Couple Photo Gallery & Lightbox Controller
 */

(function () {
  'use strict';

  const galleryItems = [
    {
      src: 'assets/images/couple/photo1.svg',
      fallback: 'assets/images/couple/photo1.jpg',
      title: 'The Sacred Promise',
      subtitle: 'Before God & Loved Ones'
    },
    {
      src: 'assets/images/couple/photo2.svg',
      fallback: 'assets/images/couple/photo2.jpg',
      title: 'Hand in Hand',
      subtitle: 'Two Hearts United As One'
    },
    {
      src: 'assets/images/couple/photo3.svg',
      fallback: 'assets/images/couple/photo3.jpg',
      title: 'Walking in Faith',
      subtitle: 'Guided by Grace & Devotion'
    },
    {
      src: 'assets/images/couple/photo4.svg',
      fallback: 'assets/images/couple/photo4.jpg',
      title: 'A Love Ordained',
      subtitle: 'Blessed with Everlasting Peace'
    },
    {
      src: 'assets/images/couple/photo5.svg',
      fallback: 'assets/images/couple/photo5.jpg',
      title: 'Joyful Hearts',
      subtitle: 'Laughter, Faith & Cherished Moments'
    },
    {
      src: 'assets/images/couple/photo6.svg',
      fallback: 'assets/images/couple/photo6.jpg',
      title: 'Forever & Always',
      subtitle: 'David & Monica • November 2026'
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

    // Check if jpg exists or use svg
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

  // Touch Swipe on mobile
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
      showNext(); // Swiped left -> Next
    }
    if (touchEndX > touchStartX + threshold) {
      showPrev(); // Swiped right -> Prev
    }
  }

  window.WeddingGallery = {
    open: openLightbox,
    close: closeLightbox,
    items: galleryItems
  };
})();
