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

const footer = document.querySelector('footer');
const GAP = 16;
let rafPending = false;

function updateBackToTopPosition() {
  const footerRect = footer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const newBottom = footerRect.top < viewportHeight
    ? (viewportHeight - footerRect.top + GAP) + 'px'
    : '32px';
  backToTopBtn.style.bottom = newBottom;
  rafPending = false;
}

window.addEventListener('scroll', () => {
  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }

  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(updateBackToTopPosition);
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

// ── COOKIE CONSENT ──
const CONSENT_KEY = 'nina_cookie_consent';
const cookieBanner   = document.getElementById('cookieBanner');
const cookieMain     = document.getElementById('cookieMain');
const cookiePrefs    = document.getElementById('cookiePrefs');
const cookieAccept   = document.getElementById('cookieAccept');
const cookieReject   = document.getElementById('cookieReject');
const cookieCustomize = document.getElementById('cookieCustomize');
const cookieBack     = document.getElementById('cookieBack');
const cookieSave     = document.getElementById('cookieSave');
const toggleAnalytics = document.getElementById('toggleAnalytics');
const toggleMarketing = document.getElementById('toggleMarketing');

function hideBanner() {
  cookieBanner.classList.remove('cookie-banner-visible');
  cookieBanner.addEventListener('transitionend', () => {
    cookieBanner.hidden = true;
    // Reset to main view for next time
    cookiePrefs.hidden = true;
    cookieMain.hidden = false;
  }, { once: true });
}

function loadAnalytics() {
  // ═══ ATTIVA QUANDO AGGIUNGI GOOGLE ANALYTICS ═══
  // if (!document.getElementById('ga-script')) {
  //   const s = document.createElement('script');
  //   s.id = 'ga-script';
  //   s.async = true;
  //   s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  //   document.head.appendChild(s);
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){ dataLayer.push(arguments); }
  //   gtag('js', new Date());
  //   gtag('config', 'G-XXXXXXXXXX');
  // }
}

function loadMarketing() {
  // ═══ ATTIVA QUANDO AGGIUNGI FACEBOOK PIXEL ═══
  // if (!window.fbq) {
  //   !function(f,b,e,v,n,t,s){...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  //   fbq('init', 'XXXXXXXXXXXXXXXXXX');
  //   fbq('track', 'PageView');
  // }
}

function applyConsent(prefs) {
  if (prefs.analytics) loadAnalytics();
  if (prefs.marketing) loadMarketing();
}

// Init from saved consent
const savedConsent = localStorage.getItem(CONSENT_KEY);
if (!savedConsent) {
  cookieBanner.hidden = false;
  requestAnimationFrame(() => cookieBanner.classList.add('cookie-banner-visible'));
} else if (savedConsent === 'accepted') {
  applyConsent({ analytics: true, marketing: true });
} else if (savedConsent !== 'rejected') {
  try {
    const prefs = JSON.parse(savedConsent);
    applyConsent(prefs);
  } catch(e) { /* ignore malformed */ }
}

// Accetta tutto
cookieAccept.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  hideBanner();
  applyConsent({ analytics: true, marketing: true });
});

// Solo necessari
cookieReject.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'rejected');
  hideBanner();
});

// Personalizza – mostra pannello preferenze
cookieCustomize.addEventListener('click', () => {
  // Pre-check toggles based on existing consent
  if (savedConsent === 'accepted') {
    toggleAnalytics.checked = true;
    toggleMarketing.checked = true;
  } else if (savedConsent && savedConsent !== 'rejected') {
    try {
      const prefs = JSON.parse(savedConsent);
      toggleAnalytics.checked = !!prefs.analytics;
      toggleMarketing.checked = !!prefs.marketing;
    } catch(e) {}
  }
  cookieMain.hidden = true;
  cookiePrefs.hidden = false;
});

// Indietro
cookieBack.addEventListener('click', () => {
  cookiePrefs.hidden = true;
  cookieMain.hidden = false;
});

// Riapertura da footer
document.getElementById('openCookieSettings').addEventListener('click', () => {
  const current = localStorage.getItem(CONSENT_KEY);
  if (current === 'accepted') {
    toggleAnalytics.checked = true;
    toggleMarketing.checked = true;
  } else if (current && current !== 'rejected') {
    try {
      const prefs = JSON.parse(current);
      toggleAnalytics.checked = !!prefs.analytics;
      toggleMarketing.checked = !!prefs.marketing;
    } catch(e) {}
  } else {
    toggleAnalytics.checked = false;
    toggleMarketing.checked = false;
  }
  cookiePrefs.hidden = false;
  cookieMain.hidden = true;
  cookieBanner.hidden = false;
  requestAnimationFrame(() => cookieBanner.classList.add('cookie-banner-visible'));
});

// Salva preferenze
cookieSave.addEventListener('click', () => {
  const prefs = {
    analytics: toggleAnalytics.checked,
    marketing: toggleMarketing.checked
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  hideBanner();
  applyConsent(prefs);
});

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
