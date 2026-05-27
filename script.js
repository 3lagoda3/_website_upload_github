// ─── INTRO LOADER ───
const intro = document.getElementById('intro');
const introText = document.getElementById('introText');

const words = [
  { text: 'HELLO', small: false },
  { text: 'ПРИВІТ', small: false },
  { text: 'HALLO', small: false },
  { text: 'f*ck ruzzia', small: true },
];

let wordIndex = 0;

function showWord() {
  const word = words[wordIndex];
  introText.textContent = word.text;
  introText.classList.toggle('is-small', word.small);
  introText.classList.remove('is-visible');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      introText.classList.add('is-visible');
    });
  });

  wordIndex++;

  if (wordIndex < words.length) {
    setTimeout(() => {
      introText.classList.remove('is-visible');
      setTimeout(showWord, 350);
    }, 500);
  } else {
    setTimeout(hideIntro, 600);
  }
}

function hideIntro() {
  introText.classList.remove('is-visible');
  setTimeout(() => {
    intro.classList.add('is-hidden');
    setTimeout(() => {
      intro.style.display = 'none';
    }, 600);
  }, 200);
}

// Start immediately, hide after words finish or video loads — whichever is later
const heroVideo = document.querySelector('.hero__video');
let wordsFinished = false;
let videoReady = false;

function checkHide() {
  if (wordsFinished && videoReady) hideIntro();
}

showWord();

// Mark words done after all words play (~2.5s)
setTimeout(() => {
  wordsFinished = true;
  checkHide();
}, 2500);

// Mark video ready when it can play
heroVideo.addEventListener('canplay', () => {
  videoReady = true;
  checkHide();
});

// Fallback — hide after 4 seconds no matter what
setTimeout(() => {
  hideIntro();
}, 4000);
// Hover-to-play previews
document.querySelectorAll('.work__item').forEach(item => {
  const video = item.querySelector('.work__video');

  item.addEventListener('mouseenter', () => {
    video.play().catch(() => {});
  });

  item.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// Modal
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modalVideo');
const modalPlay = document.getElementById('modalPlay');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.work__item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('.work__video').src;
    modalVideo.src = src;
    modalVideo.muted = false;
    modalVideo.pause();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modalPlay.classList.remove('is-hidden');
    history.pushState({ modal: true }, '');
  });
});

modalPlay.addEventListener('click', () => {
  modalVideo.play();
  modalPlay.classList.add('is-hidden');
});

modalVideo.addEventListener('pause', () => {
  modalPlay.classList.remove('is-hidden');
});

modalVideo.addEventListener('play', () => {
  modalPlay.classList.add('is-hidden');
});

modalVideo.addEventListener('click', () => {
  if (modalVideo.paused) {
    modalVideo.play();
  } else {
    modalVideo.pause();
  }
});

function closeModal() {
  modalVideo.pause();
  modalVideo.src = '';
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

window.addEventListener('popstate', e => {
  if (modal.classList.contains('is-open')) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Scroll button
document.getElementById('heroScroll').addEventListener('click', () => {
  document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
});

// Lockup click → back to top
document.getElementById('heroLockup').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

