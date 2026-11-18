document.querySelectorAll('button:not(.projects-carousel__btn):not([data-nav-dropdown-trigger]):not([data-nav-mobile-toggle]), .group:not(.projects-carousel__slide)').forEach((el) => {
    el.addEventListener('mousedown', () => {
        el.style.transform = 'translateY(2px)';
    });
    el.addEventListener('mouseup', () => {
        el.style.transform = '';
    });
});

function initProjectsCarousel() {
    const section = document.querySelector('#projectes');
    if (!section) return;

    const carousel = section.querySelector('[data-projects-carousel]');
    const track = carousel?.querySelector('[data-projects-track]');
    const slides = Array.from(carousel?.querySelectorAll('[data-projects-slide]') ?? []);
    const prevBtn = section.querySelector('[data-projects-prev]');
    const nextBtn = section.querySelector('[data-projects-next]');
    const dotsContainer = carousel?.querySelector('[data-projects-dots]');

    if (!track || slides.length === 0 || !dotsContainer) return;

    let currentIndex = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'projects-carousel__dot';
        dot.setAttribute('aria-label', `Anar al projecte ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.projects-carousel__dot'));

    function goTo(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === currentIndex);
            dot.setAttribute('aria-current', dotIndex === currentIndex ? 'true' : 'false');
        });
    }

    prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

    goTo(0);
}

initProjectsCarousel();
