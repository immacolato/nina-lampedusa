const backToTopBtn = document.getElementById('backToTop');
const heroScroll = document.querySelector('.hero-scroll');
const heroVideo = document.querySelector('.hero-bg');

// Set video playback speed to 0.5x
if (heroVideo && heroVideo.tagName === 'VIDEO') {
  heroVideo.playbackRate = 0.5;
}

window.addEventListener('scroll', () => {
  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }

  // Hero scroll indicator visibility
  if (window.scrollY > 50) {
    heroScroll.classList.add('hidden');
  } else {
    heroScroll.classList.remove('hidden');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
