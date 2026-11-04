/**
 * David & Monica Wedding Invitation
 * Main Application Script
 */

(function () {
  'use strict';

  // Toast Notification System
  const toast = document.getElementById('toast-notification');
  let toastTimer = null;

  window.showToast = function (message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  window.triggerHeroReveal = function () {
    const heroReveals = document.querySelectorAll('.hero-section .reveal');
    heroReveals.forEach(el => el.classList.add('active'));
  };

  // Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Navigation Drawer
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navOverlay = document.getElementById('mobile-nav-overlay');
  const navClose = document.getElementById('mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (navOverlay) navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
  if (navClose) navClose.addEventListener('click', closeMobileNav);
  if (navOverlay) {
    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) closeMobileNav();
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Copy Address to Clipboard
  document.querySelectorAll('[data-copy-address]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const address = this.getAttribute('data-copy-address');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(() => {
          window.showToast("Address copied to clipboard!");
        }).catch(() => {
          fallbackCopyText(address);
        });
      } else {
        fallbackCopyText(address);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      window.showToast("Address copied to clipboard!");
    } catch (err) {
      window.showToast("Unable to copy address.");
    }
    document.body.removeChild(textArea);
  }

  // WhatsApp Share Generator
  const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareMessage = 
        `🕊️ *Wedding Invitation*\n\n` +
        `Together with our families, we joyfully invite you to celebrate the holy matrimony of\n\n` +
        `💍 *David Anto Viagul & Monica Merlin*\n\n` +
        `📅 *Date:* Sunday, 29 November 2026\n` +
        `⛪ *Ceremony:* Seven Dolour's Church, Mettupatti, Dindigul (10:30 AM – 11:45 AM)\n` +
        `✨ *Reception:* Sowrastra Sabai, Nootrandu Vizha Mahal, Bharathipuram, Dindigul\n\n` +
        `_"The Lord has made everything beautiful in its time."_ — Ecclesiastes 3:11\n\n` +
        `View our digital wedding invitation:\n${currentUrl}`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Smooth Back to Top
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smart Progressive Photo Loader:
  // Detects if the couple's real photographs (JPG/PNG/WEBP) are present,
  // and smoothly transitions to them while maintaining the ornate vector illustration as fallback.
  function checkAndLoadRealPhotos() {
    const heroImg = document.getElementById('hero-couple-img');
    if (heroImg && heroImg.dataset.realSrc) {
      const realHero = new Image();
      realHero.src = heroImg.dataset.realSrc;
      realHero.onload = () => {
        heroImg.src = realHero.src;
      };
    }

    // Check gallery photos (photo1.jpg to photo6.jpg)
    document.querySelectorAll('.gallery-img').forEach((gImg, idx) => {
      const potentialJpg = `assets/images/couple/photo${idx + 1}.jpg`;
      const testImg = new Image();
      testImg.src = potentialJpg;
      testImg.onload = () => {
        gImg.src = potentialJpg;
        if (window.WeddingGallery && window.WeddingGallery.items[idx]) {
          window.WeddingGallery.items[idx].src = potentialJpg;
        }
      };
    });
  }

  checkAndLoadRealPhotos();

  console.log("David & Monica Wedding Invitation initialized successfully.");
})();
