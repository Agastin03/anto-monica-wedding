/**
 * David & Monica Wedding Invitation
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

    // Trigger subtle celebratory sound or start background music if available
    if (window.WeddingMusic && typeof window.WeddingMusic.startOnInviteOpen === 'function') {
      window.WeddingMusic.startOnInviteOpen();
    }

    // After flap flips and card rises, fade out the envelope screen
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      document.body.style.overflow = '';
      
      // Scroll smoothly to top of main content
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger scroll reveals for hero
      if (window.triggerHeroReveal) {
        window.triggerHeroReveal();
      }
    }, 1400);
  }

  function skipEnvelope() {
    envelopeScreen.classList.add('opened');
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.triggerHeroReveal) {
      window.triggerHeroReveal();
    }
  }

  function reopenEnvelope() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    envelopeWrapper.classList.remove('opening');
    envelopeScreen.classList.remove('opened');
    isOpening = false;
  }

  // Event Listeners
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

  // Prevent background scroll while envelope is active
  if (!envelopeScreen.classList.contains('opened')) {
    document.body.style.overflow = 'hidden';
  }
})();
