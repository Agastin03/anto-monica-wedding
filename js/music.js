/**
 * David & Monica Wedding Invitation
 * Sacred Hymn & Romantic Instrumental Music Player
 * Synthesizes a peaceful, gentle harp/piano arpeggio via Web Audio API
 * or plays assets/music/wedding.mp3 if present.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let synthInterval = null;
  let audioElement = null;

  const musicBtn = document.getElementById('music-toggle-btn');
  const soundWaves = document.getElementById('sound-waves');

  // Chord progression (Canon in D / sacred hymn inspired in D Major):
  // D -> A -> Bm -> F#m -> G -> D -> G -> A
  const notesFreq = {
    D3: 146.83, Fs3: 185.00, A3: 220.00,
    D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88, Cs5: 554.37,
    D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880.00
  };

  // Gentle harp arpeggios
  const arpeggios = [
    // D Maj
    ['D3', 'A3', 'D4', 'Fs4', 'A4', 'D5'],
    // A Maj
    ['A3', 'E4', 'A4', 'Cs5', 'E5'],
    // B min
    ['D3', 'Fs3', 'B4', 'D5', 'Fs5'],
    // F# min
    ['Fs3', 'Cs4', 'Fs4', 'A4', 'Cs5'],
    // G Maj
    ['D3', 'G4', 'B4', 'D5', 'G4'],
    // D Maj
    ['D3', 'Fs4', 'A4', 'D5', 'Fs4'],
    // G Maj
    ['D3', 'G4', 'B4', 'D5', 'G4'],
    // A Maj
    ['A3', 'E4', 'A4', 'Cs5', 'E4']
  ];

  let currentPattern = 0;
  let noteIndex = 0;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Plucks a single gentle harp note with soft resonance
  function playHarpNote(freq, time, volume = 0.12) {
    if (!audioCtx || !isPlaying) return;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Gentle triangle + sine for warm acoustic pluck
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, time);
    filter.frequency.exponentialRampToValueAtTime(400, time + 2.0);

    // Natural harp envelope (quick attack, long ringing release)
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(volume, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + 2.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 2.5);
    osc2.stop(time + 2.5);
  }

  function tickHarp() {
    if (!isPlaying || !audioCtx) return;

    const currentNotes = arpeggios[currentPattern];
    const noteKey = currentNotes[noteIndex];
    const freq = notesFreq[noteKey] || 440;

    playHarpNote(freq, audioCtx.currentTime, 0.1);

    noteIndex++;
    if (noteIndex >= currentNotes.length) {
      noteIndex = 0;
      currentPattern = (currentPattern + 1) % arpeggios.length;
    }
  }

  function startMusic() {
    initAudioContext();
    isPlaying = true;

    // Smooth fade in
    masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 1.5);

    if (synthInterval) clearInterval(synthInterval);
    synthInterval = setInterval(tickHarp, 340); // 340ms per arpeggio note (relaxing tempo)

    updateUI(true);
  }

  function pauseMusic() {
    isPlaying = false;
    if (audioCtx && masterGain) {
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    }
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    updateUI(false);
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }

  function updateUI(playing) {
    if (musicBtn) {
      if (playing) {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('title', 'Pause Music');
        musicBtn.setAttribute('aria-label', 'Pause Music');
      } else {
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('title', 'Play Music');
        musicBtn.setAttribute('aria-label', 'Play Music');
      }
    }
    if (soundWaves) {
      if (playing) {
        soundWaves.classList.remove('paused');
      } else {
        soundWaves.classList.add('paused');
      }
    }
  }

  // Start on envelope open
  function startOnInviteOpen() {
    if (!isPlaying) {
      startMusic();
    }
  }

  // Export to window
  window.WeddingMusic = {
    start: startMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    startOnInviteOpen: startOnInviteOpen,
    isPlaying: () => isPlaying
  };

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }
})();
