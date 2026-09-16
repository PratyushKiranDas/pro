/* ============================================================
   BIRTHDAY WEBSITE INTERACTIVE SCRIPT: PRATYOYEE (PRO)
   Features:
   1. Ambient falling confetti & floating pastel balloon canvas
   2. Interactive name toggle (Pratyoyee <-> Pro)
   3. 3D Gift Box opening + Confetti burst explosion + Surprise Modal
   4. Polaroid 3D flip card interactions
   5. Smooth sliding accordion with Expand/Collapse All
   6. Minimalist Music Player (with Web Audio music-box chime synthesizer)
   7. Make a Wish interactive particle burst + counter
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initNameToggle();
  initPolaroidGallery();
  initAccordion();
  initMusicPlayer();
  initWishMaker();
  initPhotoLightbox();
});

/* ============================================================
   1. AMBIENT FALLING CONFETTI & FLOATING BALLOONS CANVAS
   ============================================================ */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const pastelColors = [
    '#FFD1DC', '#F4C2C2', '#FFE4EC',
    '#E6E6FA', '#DCD0FF', '#C8B6FF',
    '#FFFDD0', '#FAF0D7', '#FAD2E1'
  ];

  // Ambient Confetti Pieces
  const confettiCount = window.innerWidth < 768 ? 24 : 45;
  const confettiList = Array.from({ length: confettiCount }, () => createConfettiParticle(width, height, pastelColors));

  // Floating Balloons
  const balloonCount = window.innerWidth < 768 ? 4 : 8;
  const balloonList = Array.from({ length: balloonCount }, () => createBalloon(width, height, pastelColors));

  function createConfettiParticle(w, h, colors) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.sin(Math.random() * Math.PI) * 0.7,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.4,
      oscillationSpeed: Math.random() * 0.02 + 0.01,
      oscillationOffset: Math.random() * Math.PI * 2
    };
  }

  function createBalloon(w, h, colors) {
    return {
      x: Math.random() * w,
      y: h + Math.random() * 200,
      radiusX: Math.random() * 10 + 16,
      radiusY: Math.random() * 12 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 0.6 + 0.35,
      driftSpeed: Math.random() * 0.01 + 0.005,
      driftAmp: Math.random() * 30 + 15,
      startX: Math.random() * w,
      opacity: Math.random() * 0.45 + 0.35
    };
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render Ambient Confetti
    confettiList.forEach((c) => {
      c.y += c.speedY;
      c.oscillationOffset += c.oscillationSpeed;
      c.x += Math.sin(c.oscillationOffset) * 0.7;
      c.rotation += c.rotationSpeed;

      if (c.y > height + 20) {
        c.y = -20;
        c.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.globalAlpha = c.opacity;
      ctx.fillStyle = c.color;

      // Draw subtle rounded confetti petal
      ctx.beginPath();
      ctx.ellipse(0, 0, c.size, c.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Render Floating Pastel Balloons
    balloonList.forEach((b) => {
      b.y -= b.speedY;
      b.x = b.startX + Math.sin(b.y * b.driftSpeed) * b.driftAmp;

      if (b.y < -60) {
        b.y = height + 40;
        b.startX = Math.random() * width;
      }

      ctx.save();
      ctx.globalAlpha = b.opacity;

      // Balloon Body
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.radiusX, b.radiusY, 0, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();

      // Balloon Highlight
      ctx.beginPath();
      ctx.ellipse(b.x - b.radiusX * 0.35, b.y - b.radiusY * 0.35, b.radiusX * 0.28, b.radiusY * 0.28, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();

      // Balloon Knot & String
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + b.radiusY);
      ctx.lineTo(b.x - 3, b.y + b.radiusY + 5);
      ctx.lineTo(b.x + 3, b.y + b.radiusY + 5);
      ctx.closePath();
      ctx.fillStyle = b.color;
      ctx.fill();

      // String line
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + b.radiusY + 5);
      ctx.quadraticCurveTo(b.x + 6, b.y + b.radiusY + 18, b.x, b.y + b.radiusY + 30);
      ctx.strokeStyle = 'rgba(200, 180, 195, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    });

    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

/* ============================================================
   2. HERO NICKNAME TOGGLE (Pratyoyee <-> Pro)
   ============================================================ */
function initNameToggle() {
  const toggleBar = document.getElementById('name-toggle-bar');
  const pillToggle = document.getElementById('pill-toggle');
  const optFull = document.getElementById('opt-full');
  const optNick = document.getElementById('opt-nick');
  const nameDisplay = document.getElementById('hero-name-display');
  const modalTitle = document.getElementById('modal-title');

  if (!toggleBar || !nameDisplay) return;

  let isNickname = false;

  function toggle() {
    isNickname = !isNickname;
    pillToggle.classList.toggle('swapped', isNickname);
    optFull.classList.toggle('active', !isNickname);
    optNick.classList.toggle('active', isNickname);

    // Trigger bounce animation on name
    nameDisplay.classList.remove('bounce');
    void nameDisplay.offsetWidth; // reflow
    nameDisplay.classList.add('bounce');

    if (isNickname) {
      nameDisplay.textContent = 'Pro 🌸';
      if (modalTitle) modalTitle.textContent = 'Dearest Pro,';
    } else {
      nameDisplay.textContent = 'Pratyoyee';
      if (modalTitle) modalTitle.textContent = 'Dearest Pratyoyee,';
    }

    // Spawn tiny heart particles at the toggle position
    const rect = toggleBar.getBoundingClientRect();
    spawnFloatingWish(rect.left + rect.width / 2, rect.top, '✨');
  }

  toggleBar.addEventListener('click', toggle);
  toggleBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
}

/* ============================================================
   3. "OPEN PRESENT" 3D GIFT BOX & SURPRISE MODAL
   ============================================================ */
function initGiftBoxAndModal() {
  const giftBox = document.getElementById('gift-box');
  const modal = document.getElementById('surprise-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalDone = document.getElementById('modal-done-btn');
  const burstMoreBtn = document.getElementById('burst-more-btn');

  if (!giftBox || !modal) return;

  function openGift() {
    giftBox.classList.add('opened');

    // Launch celebratory particle confetti burst
    const rect = giftBox.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    triggerConfettiBurst(originX, originY);

    // Play soft sound chime
    playToneSound(659.25, 0.25); // E5
    setTimeout(() => playToneSound(880.0, 0.45), 180); // A5

    // Reveal surprise letter modal with gentle delay
    setTimeout(() => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    }, 450);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  giftBox.addEventListener('click', openGift);
  giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGift();
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalDone) modalDone.addEventListener('click', closeModal);

  // Close modal when clicking outside the card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Re-trigger confetti button inside modal
  if (burstMoreBtn) {
    burstMoreBtn.addEventListener('click', () => {
      triggerConfettiBurst(0.5, 0.45);
      playToneSound(783.99, 0.2); // G5
      setTimeout(() => playToneSound(1046.5, 0.4), 140); // C6
    });
  }
}

/* ============================================================
   CONFETTI EXPLOSION BURST GENERATOR (Physics-based particle canvas)
   ============================================================ */
function triggerConfettiBurst(originX = 0.5, originY = 0.5) {
  const burstCanvas = document.createElement('canvas');
  burstCanvas.style.position = 'fixed';
  burstCanvas.style.inset = '0';
  burstCanvas.style.width = '100vw';
  burstCanvas.style.height = '100vh';
  burstCanvas.style.pointerEvents = 'none';
  burstCanvas.style.zIndex = '10001';
  document.body.appendChild(burstCanvas);

  const ctx = burstCanvas.getContext('2d');
  const w = (burstCanvas.width = window.innerWidth);
  const h = (burstCanvas.height = window.innerHeight);

  const colors = [
    '#FF6B8B', '#FF8E9E', '#FFB3BA',
    '#BA99FF', '#D8B4F8', '#C3B1E1',
    '#FFEAA7', '#FFD166', '#FF9F43',
    '#FF7675', '#FD79A8', '#FFFFFF'
  ];

  const particles = [];
  const particleCount = 110;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 14 + 5;
    particles.push({
      x: originX * w,
      y: originY * h,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 4, // initial upward lift
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      gravity: 0.35,
      drag: 0.96,
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : 'circle'
    });
  }

  let frameId;
  function update() {
    ctx.clearRect(0, 0, w, h);
    let aliveCount = 0;

    particles.forEach((p) => {
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRotation;
      p.opacity -= 0.009;

      if (p.opacity > 0 && p.y < h + 20) {
        aliveCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    if (aliveCount > 0) {
      frameId = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(frameId);
      burstCanvas.remove();
    }
  }

  update();
}

/* ============================================================
   4. POLAROID FLIP GALLERY
   ============================================================ */
function initPolaroidGallery() {
  const cards = document.querySelectorAll('.polaroid-card');

  cards.forEach((card) => {
    function flip(e) {
      if (e.target && e.target.closest('.zoom-btn')) return; // don't flip if zoom button clicked
      card.classList.toggle('flipped');
      playToneSound(523.25, 0.12); // C5 cute tactile click
    }

    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.target && e.target.closest('.zoom-btn')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip(e);
      }
    });
  });
}

/* ============================================================
   5. "REASONS WHY YOU'RE AMAZING" ACCORDION
   ============================================================ */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const expandAllBtn = document.getElementById('expand-all-btn');
  const collapseAllBtn = document.getElementById('collapse-all-btn');

  function openItem(item) {
    item.classList.add('active');
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (header) header.setAttribute('aria-expanded', 'true');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  }

  function closeItem(item) {
    item.classList.remove('active');
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (header) header.setAttribute('aria-expanded', 'false');
    if (body) body.style.maxHeight = null;
  }

  // Set initial height for active items
  accordionItems.forEach((item) => {
    if (item.classList.contains('active')) {
      const body = item.querySelector('.accordion-body');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }

    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        if (isActive) {
          closeItem(item);
        } else {
          openItem(item);
          playToneSound(440, 0.15); // soft A4 chime
        }
      });
    }
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      accordionItems.forEach((item) => openItem(item));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      accordionItems.forEach((item) => closeItem(item));
    });
  }
}

/* ============================================================
   6. POLYPHONIC MUSIC BOX & PLAYLIST ENGINE (Web Audio API)
   Features 3 high-quality synthetic arrangements:
   - Track 1: Pastel Swiss Music Box (Rich Harmonic Chimes)
   - Track 2: Romantic Piano Lullaby (Gentle Dreamy Chords)
   - Track 3: Celebration Bells (Sparkling Glockenspiel)
   ============================================================ */
let audioCtx = null;
let isPlayingMelody = false;
let melodyTimeout = null;
let currentPlaylistIdx = 0;
let currentStepIdx = 0;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Single tone chime for button clicks & micro-interactions
function playToneSound(frequency, duration = 0.2, type = 'sine') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {}
}

// Rich acoustic bell / chime synthesizer with natural harmonics & shimmer
function playChimeVoice(ctx, freq, duration = 1.4, volume = 0.12, timbre = 'musicbox') {
  if (!ctx || !freq) return;
  const now = ctx.currentTime;

  // Fundamental oscillator
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = timbre === 'piano' ? 'sine' : 'triangle';
  osc1.frequency.setValueAtTime(freq, now);

  // Harmonic overtone oscillator (octave shimmer)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // High bell sparkle overtone (Swiss chime resonance at ~2.76x)
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(freq * (timbre === 'piano' ? 3 : 2.76), now);

  // Envelopes
  gain1.gain.setValueAtTime(volume, now);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  gain2.gain.setValueAtTime(volume * 0.4, now);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

  gain3.gain.setValueAtTime(volume * 0.18, now);
  gain3.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.45);

  osc1.connect(gain1);
  osc2.connect(gain2);
  osc3.connect(gain3);

  gain1.connect(ctx.destination);
  gain2.connect(ctx.destination);
  gain3.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc3.start(now);

  osc1.stop(now + duration);
  osc2.stop(now + duration * 0.7);
  osc3.stop(now + duration * 0.45);
}

// 3 Unique, Beautiful Birthday Song Arrangements
const playlist = [
  {
    name: 'Pastel Music Box 🌸',
    timbre: 'musicbox',
    steps: [
      // Phrase 1: "Happy Birthday to you"
      { melody: 261.63, chords: [174.61, 220.00], dur: 360 }, // C4 [F3, A3]
      { melody: 261.63, chords: [], dur: 260 },                // C4
      { melody: 293.66, chords: [130.81, 196.00], dur: 520 }, // D4 [C3, G3]
      { melody: 261.63, chords: [], dur: 520 },                // C4
      { melody: 349.23, chords: [174.61, 261.63], dur: 520 }, // F4 [F3, C4]
      { melody: 329.63, chords: [220.00, 261.63], dur: 950 }, // E4 [A3, C4]

      // Phrase 2: "Happy Birthday to you"
      { melody: 261.63, chords: [174.61, 220.00], dur: 360 }, // C4
      { melody: 261.63, chords: [], dur: 260 },                // C4
      { melody: 293.66, chords: [130.81, 196.00], dur: 520 }, // D4
      { melody: 261.63, chords: [], dur: 520 },                // C4
      { melody: 392.00, chords: [196.00, 246.94], dur: 520 }, // G4 [G3, B3]
      { melody: 349.23, chords: [174.61, 220.00, 261.63], dur: 950 }, // F4 [F3, A3, C4]

      // Phrase 3: "Happy Birthday dear Pratyoyee"
      { melody: 261.63, chords: [174.61, 220.00], dur: 360 }, // C4
      { melody: 261.63, chords: [], dur: 260 },                // C4
      { melody: 523.25, chords: [146.83, 220.00, 293.66], dur: 550 }, // C5 [D3, A3, D4]
      { melody: 440.00, chords: [174.61, 261.63], dur: 550 }, // A4
      { melody: 349.23, chords: [116.54, 174.61, 233.08], dur: 550 }, // F4 [Bb2, F3, Bb3]
      { melody: 329.63, chords: [], dur: 520 },                // E4
      { melody: 293.66, chords: [130.81, 196.00, 261.63], dur: 850 }, // D4 [C3, G3, C4]

      // Phrase 4: "Happy Birthday to you!"
      { melody: 466.16, chords: [116.54, 233.08], dur: 360 }, // Bb4 [Bb2, Bb3]
      { melody: 466.16, chords: [], dur: 260 },                // Bb4
      { melody: 440.00, chords: [174.61, 220.00, 261.63], dur: 550 }, // A4 [F3, A3, C4]
      { melody: 349.23, chords: [130.81, 196.00], dur: 550 }, // F4
      { melody: 392.00, chords: [130.81, 196.00, 261.63], dur: 550 }, // G4 [C3, G3, C4]
      { melody: 349.23, chords: [174.61, 220.00, 261.63, 349.23], dur: 1400 }, // F4 [Full F Maj]

      // Sparkle Arpeggio Outro
      { melody: 523.25, chords: [], dur: 220 }, // C5
      { melody: 659.25, chords: [], dur: 220 }, // E5
      { melody: 783.99, chords: [], dur: 250 }, // G5
      { melody: 1046.50, chords: [174.61, 261.63, 349.23], dur: 1600 } // C6
    ]
  },
  {
    name: 'Piano Lullaby ✨',
    timbre: 'piano',
    steps: [
      { melody: 392.00, chords: [196.00, 293.66], dur: 400 }, // G4 [G3, D4]
      { melody: 392.00, chords: [], dur: 280 },
      { melody: 440.00, chords: [164.81, 246.94], dur: 550 }, // A4 [E3, B3]
      { melody: 392.00, chords: [], dur: 550 },
      { melody: 523.25, chords: [130.81, 196.00, 261.63], dur: 600 }, // C5 [C3, G3, C4]
      { melody: 493.88, chords: [196.00, 246.94], dur: 1100 }, // B4

      { melody: 392.00, chords: [196.00, 293.66], dur: 400 },
      { melody: 392.00, chords: [], dur: 280 },
      { melody: 440.00, chords: [146.83, 220.00], dur: 550 }, // A4 [D3, A3]
      { melody: 392.00, chords: [], dur: 550 },
      { melody: 587.33, chords: [146.83, 220.00, 293.66], dur: 600 }, // D5
      { melody: 523.25, chords: [130.81, 196.00, 261.63], dur: 1100 }, // C5

      { melody: 392.00, chords: [196.00, 246.94], dur: 400 },
      { melody: 392.00, chords: [], dur: 280 },
      { melody: 783.99, chords: [164.81, 246.94, 329.63], dur: 600 }, // G5 [E3, B3, E4]
      { melody: 659.25, chords: [130.81, 196.00], dur: 600 }, // E5
      { melody: 523.25, chords: [130.81, 196.00, 261.63], dur: 600 }, // C5
      { melody: 493.88, chords: [], dur: 550 },
      { melody: 440.00, chords: [146.83, 220.00, 293.66], dur: 950 }, // A4

      { melody: 698.46, chords: [174.61, 261.63], dur: 400 }, // F5
      { melody: 698.46, chords: [], dur: 280 },
      { melody: 659.25, chords: [130.81, 196.00, 261.63], dur: 600 }, // E5
      { melody: 523.25, chords: [196.00, 246.94], dur: 600 },
      { melody: 587.33, chords: [146.83, 220.00, 293.66], dur: 600 }, // D5
      { melody: 523.25, chords: [130.81, 196.00, 261.63, 392.00], dur: 1600 }
    ]
  },
  {
    name: 'Celebration Bells 🎉',
    timbre: 'musicbox',
    steps: [
      { melody: 523.25, chords: [261.63, 329.63, 392.00], dur: 320 }, // C5
      { melody: 523.25, chords: [], dur: 220 },
      { melody: 587.33, chords: [261.63, 392.00], dur: 450 }, // D5
      { melody: 523.25, chords: [], dur: 450 },
      { melody: 698.46, chords: [349.23, 440.00, 523.25], dur: 450 }, // F5
      { melody: 659.25, chords: [329.63, 392.00], dur: 850 }, // E5

      { melody: 523.25, chords: [261.63, 329.63], dur: 320 },
      { melody: 523.25, chords: [], dur: 220 },
      { melody: 587.33, chords: [293.66, 392.00], dur: 450 },
      { melody: 523.25, chords: [], dur: 450 },
      { melody: 783.99, chords: [392.00, 493.88], dur: 450 }, // G5
      { melody: 698.46, chords: [349.23, 440.00, 523.25], dur: 850 }, // F5

      { melody: 523.25, chords: [261.63, 329.63], dur: 320 },
      { melody: 523.25, chords: [], dur: 220 },
      { melody: 1046.50, chords: [261.63, 392.00, 523.25], dur: 500 }, // C6
      { melody: 880.00, chords: [349.23, 440.00], dur: 500 }, // A5
      { melody: 698.46, chords: [233.08, 349.23, 466.16], dur: 500 }, // F5
      { melody: 659.25, chords: [], dur: 450 },
      { melody: 587.33, chords: [293.66, 392.00, 523.25], dur: 750 }, // D5

      { melody: 932.33, chords: [233.08, 349.23, 466.16], dur: 320 }, // Bb5
      { melody: 932.33, chords: [], dur: 220 },
      { melody: 880.00, chords: [349.23, 440.00, 523.25], dur: 500 }, // A5
      { melody: 698.46, chords: [261.63, 392.00], dur: 500 },
      { melody: 783.99, chords: [261.63, 392.00, 523.25], dur: 500 }, // G5
      { melody: 698.46, chords: [349.23, 440.00, 523.25, 698.46], dur: 1400 }
    ]
  }
];

function initMusicPlayer() {
  const player = document.getElementById('music-player');
  const toggleBtn = document.getElementById('music-toggle');
  const titleLabel = document.getElementById('music-title');
  const statusLabel = document.getElementById('music-status');
  const nextBtn = document.getElementById('music-next-btn');
  const audioElement = document.getElementById('bg-audio');

  if (!player || !statusLabel) return;

  function updateSongDisplay() {
    const track = playlist[currentPlaylistIdx];
    if (titleLabel) titleLabel.textContent = track.name;
  }

  function playNextStep() {
    if (!isPlayingMelody) return;
    const track = playlist[currentPlaylistIdx];
    const step = track.steps[currentStepIdx];

    const ctx = getAudioContext();
    if (ctx) {
      // Play main melody note
      playChimeVoice(ctx, step.melody, (step.dur / 1000) * 2.8, 0.13, track.timbre);

      // Play soft backing harmony chords
      if (step.chords && step.chords.length > 0) {
        step.chords.forEach((chordFreq, idx) => {
          setTimeout(() => {
            playChimeVoice(ctx, chordFreq, (step.dur / 1000) * 2.4, 0.055, track.timbre);
          }, idx * 18);
        });
      }
    }

    currentStepIdx = (currentStepIdx + 1) % track.steps.length;
    melodyTimeout = setTimeout(playNextStep, step.dur + 90);
  }

  function startMusic() {
    isPlayingMelody = true;
    player.classList.add('playing');
    statusLabel.textContent = 'Now Playing 🎶';
    updateSongDisplay();
    playNextStep();
  }

  function stopMusic() {
    isPlayingMelody = false;
    clearTimeout(melodyTimeout);
    player.classList.remove('playing');
    statusLabel.textContent = 'Paused ⏸️';
  }

  function toggleAudio() {
    if (audioElement && audioElement.src && audioElement.src.length > 5) {
      if (audioElement.paused) {
        audioElement.play().then(() => {
          player.classList.add('playing');
          statusLabel.textContent = 'Now Playing 🎶';
        }).catch(() => {
          if (isPlayingMelody) stopMusic(); else startMusic();
        });
      } else {
        audioElement.pause();
        player.classList.remove('playing');
        statusLabel.textContent = 'Paused ⏸️';
      }
      return;
    }

    if (isPlayingMelody) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function nextTrack(e) {
    if (e) e.stopPropagation();
    currentPlaylistIdx = (currentPlaylistIdx + 1) % playlist.length;
    currentStepIdx = 0;
    clearTimeout(melodyTimeout);
    updateSongDisplay();

    // Trigger cute particle pulse
    if (titleLabel) {
      titleLabel.style.transform = 'scale(1.1)';
      setTimeout(() => (titleLabel.style.transform = 'scale(1)'), 200);
    }

    if (isPlayingMelody) {
      playNextStep();
    } else {
      startMusic();
    }
  }

  player.addEventListener('click', (e) => {
    if (e.target.closest('#music-next-btn')) return;
    toggleAudio();
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', nextTrack);
  }

  updateSongDisplay();
}

/* ============================================================
   7. INTERACTIVE WISH MAKER
   ============================================================ */
function initWishMaker() {
  const wishBtn = document.getElementById('send-wish-btn');
  const counterEl = document.getElementById('wish-count-number');
  let wishCount = 0;

  if (!wishBtn || !counterEl) return;

  const wishEmojis = ['💖', '✨', '🎂', '🌸', '🎈', '⭐', '🧁', '🥂', '💌', '🌷'];

  wishBtn.addEventListener('click', (e) => {
    wishCount++;
    counterEl.textContent = wishCount;

    // Small scale pop on counter
    counterEl.parentElement.style.transform = 'scale(1.15)';
    setTimeout(() => (counterEl.parentElement.style.transform = 'scale(1)'), 200);

    // Spawn 5 floating wish items around the button
    const rect = wishBtn.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 120;
      const emoji = wishEmojis[Math.floor(Math.random() * wishEmojis.length)];
      setTimeout(() => {
        spawnFloatingWish(rect.left + rect.width / 2 + offsetX, rect.top, emoji);
      }, i * 90);
    }

    // Play sweet ascending chime
    playToneSound(587.33 + wishCount * 20, 0.25);
  });
}

function spawnFloatingWish(x, y, emoji) {
  const el = document.createElement('div');
  el.className = 'floating-wish-item';
  el.textContent = emoji;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.fontSize = `${Math.random() * 1.2 + 1.4}rem`;

  const driftX = (Math.random() - 0.5) * 180;
  el.style.setProperty('--drift-x', `${driftX}px`);

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

/* ============================================================
   PHOTO LIGHTBOX / FULLSCREEN ZOOM
   ============================================================ */
function initPhotoLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const zoomBtns = document.querySelectorAll('.zoom-btn');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    playToneSound(659.25, 0.15); // E5 pleasant chime
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  zoomBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card flip
      const src = btn.getAttribute('data-src');
      const caption = btn.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}
