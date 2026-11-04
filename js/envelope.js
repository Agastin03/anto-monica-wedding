/**
 * Anto & Monica Wedding Invitation
 * Envelope 3D Opening Controller
 */

(function () {
  'use strict';

  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const btnOpen = document.getElementById('btn-open-envelope');
  const btnSkip = document.getElementById('btn-skip-envelope');
  const seal = document.getElementById('envelope-seal');
  const reopenBtn = document.getElementById('btn-reopen-envelope');

  if (!envelopeScreen || !envelopeWrapper) return;

  let isOpening = false;

  function openEnvelope() {
    if (isOpening) return;
    isOpening = true;

    // Trigger opening animation class on the wrapper
    envelopeWrapper.classList.add('opening');

    // Start background music softly
    if (window.WeddingMusic && typeof window.WeddingMusic.startOnInviteOpen === 'function') {
      window.WeddingMusic.startOnInviteOpen();
    }

    // Smooth transition
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      document.body.style.overflow = '';
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (window.triggerHeroReveal) {
        window.triggerHeroReveal();
      }

      // Hide completely from layout after transition completes
      setTimeout(() => {
        envelopeScreen.style.display = 'none';
      }, 900);
    }, 1300);
  }

  function skipEnvelope() {
    envelopeScreen.classList.add('opened');
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.triggerHeroReveal) {
      window.triggerHeroReveal();
    }
    setTimeout(() => {
      envelopeScreen.style.display = 'none';
    }, 400);
  }

  function reopenEnvelope() {
    envelopeScreen.style.display = 'flex';
    // Force reflow
    void envelopeScreen.offsetHeight;
    envelopeWrapper.classList.remove('opening');
    envelopeScreen.classList.remove('opened');
    isOpening = false;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  if (btnOpen) {
    btnOpen.addEventListener('click', function (e) {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (seal) {
    seal.addEventListener('click', function (e) {
      e.stopPropagation();
      openEnvelope();
    });
  }

  envelopeWrapper.addEventListener('click', function () {
    openEnvelope();
  });

  if (btnSkip) {
    btnSkip.addEventListener('click', function (e) {
      e.stopPropagation();
      skipEnvelope();
    });
  }

  if (reopenBtn) {
    reopenBtn.addEventListener('click', function (e) {
      e.preventDefault();
      reopenEnvelope();
    });
  }

  // Prevent scroll while envelope is active
  if (!envelopeScreen.classList.contains('opened')) {
    document.body.style.overflow = 'hidden';
  }
})();
