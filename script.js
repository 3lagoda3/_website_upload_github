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

