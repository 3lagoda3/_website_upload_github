// ─── INTRO LOADER ───
const intro = document.getElementById('intro');
const introText = document.getElementById('introText');

const words = [
  { text: 'HELLO',       small: false },
  { text: 'ПРИВІТ',      small: false },
  { text: 'HALLO',       small: false },
  { text: 'f*ck ruzzia', small: true  },
];

let wordIndex = 0;
let introDone = false;

function hideIntro() {
  if (introDone) return;
  introDone = true;
  introText.classList.remove('is-visible');
  setTimeout(() => {
    intro.classList.add('is-hidden');
    setTimeout(() => { intro.style.display = 'none'; }, 600);
  }, 200);
}

function showWord() {
  const word = words[wordIndex];
  introText.textContent = word.text;
  introText.classList.toggle('is-small', word.small);
  introText.classList.remove('is-visible');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    introText.classList.add('is-visible');
  }));

  wordIndex++;

  if (wordIndex < words.length) {
    setTimeout(() => {
      introText.classList.remove('is-visible');
      setTimeout(showWord, 350);
    }, 500);
  } else {
    setTimeout(hideIntro, 800);
  }
}

showWord();
setTimeout(hideIntro, 4000); // hard fallback
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

