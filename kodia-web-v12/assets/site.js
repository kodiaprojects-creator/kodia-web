gsap.registerPlugin(ScrollTrigger);

const menu = document.querySelector('.menu');
const navEl = document.querySelector('.navlinks');

function setMenuOpen(isOpen) {
  if (!menu || !navEl) return;
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Tanca el menú' : 'Obre el menú');
  navEl.classList.toggle('open', isOpen);
}

function closeMenu() {
  setMenuOpen(false);
}

if (menu && navEl) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    setMenuOpen(open);
  });
  navEl.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
}

const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  if (document.querySelector('.nav')) {
    gsap.from('.nav', { y: -16, autoAlpha: 0, duration: 0.65, ease: 'power3.out' });
  }
  if (document.querySelector('.hero .hero-title')) {
    const t = gsap.timeline({ defaults: { ease: 'power3.out' } });
    t.from('.hero .hero-title .hline', { yPercent: 110, duration: 0.9, stagger: 0.12 })
      .from('.hero-copy', { y: 18, autoAlpha: 0, duration: 0.7 }, '-.35')
      .from('.hero-bottom', { scaleX: 0, transformOrigin: 'left center', duration: 0.65 }, '-.25');
  }
  if (document.querySelector('.progress')) {
    gsap.to('.progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'max',
        scrub: 0.22,
      },
    });
  }
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 18,
      autoAlpha: 0,
      duration: 0.68,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
});
