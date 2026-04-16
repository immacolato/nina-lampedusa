const backToTopBtn = document.getElementById('backToTop');
const heroScroll = document.querySelector('.hero-scroll');
const heroVideo = document.querySelector('.hero-bg');
const heroImage = document.querySelector('.hero-image');
const heroFade = document.querySelector('.hero-fade');
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.nav-mobile-menu');

// Set video playback speed to 0.5x
if (heroVideo && heroVideo.tagName === 'VIDEO') {
  heroVideo.playbackRate = 0.5;
  
  // Handle video fadeout after 10 seconds
  heroVideo.addEventListener('timeupdate', () => {
    if (heroVideo.currentTime >= 10 && !heroVideo.classList.contains('hidden')) {
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

// Hamburger menu toggle
burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});
