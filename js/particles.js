/**
 * David & Monica Wedding Invitation
 * Ambient Floating Gold Dust & Petals Canvas
 */

(function () {
  'use strict';

  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle configuration
  const particleCount = window.innerWidth < 768 ? 24 : 45;
  const particles = [];

  // Colors: gold foil dust & soft rose/champagne petals
  const colors = [
    'rgba(229, 195, 120, ',
    'rgba(196, 154, 85, ',
    'rgba(245, 230, 210, ',
    'rgba(180, 70, 63, ' // soft rose petal hint
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 3 + 1.2;
      this.isPetal = Math.random() > 0.65; // Some are small petals, others are light dust
      this.speedY = Math.random() * 0.7 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.aspect = Math.random() * 0.5 + 0.5; // for petal elongation
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4;
      this.rotation += this.rotationSpeed;

      // Wrap around bounds
      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color + this.opacity + ')';

      if (this.isPetal) {
        // Draw delicate petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 2, this.size * 1.2 * this.aspect, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw soft glowing gold sparkle
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;
  let isPageVisible = true;

  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) loop();
  });

  function loop() {
    if (!isPageVisible) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
})();
