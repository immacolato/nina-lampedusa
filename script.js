const backToTopBtn = document.getElementById('backToTop');
const heroScroll = document.querySelector('.hero-scroll');
const heroVideo = document.querySelector('.hero-bg');
const heroImage = document.querySelector('.hero-image');
const heroFade = document.querySelector('.hero-fade');

// Set video playback speed to 0.5x
if (heroVideo && heroVideo.tagName === 'VIDEO') {
  heroVideo.playbackRate = 0.5;
  
  // Handle video fadeout after 15 seconds
  heroVideo.addEventListener('timeupdate', () => {
    if (heroVideo.currentTime >= 15 && !heroVideo.classList.contains('hidden')) {
      heroVideo.classList.add('hidden');
      heroImage.classList.add('show');
      heroFade.classList.add('show');
      heroVideo.pause();
    }
  });
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
