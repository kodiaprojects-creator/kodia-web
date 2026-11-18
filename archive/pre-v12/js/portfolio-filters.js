document.querySelectorAll('[data-portfolio-filter]').forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.portfolioFilter;

        document.querySelectorAll('[data-portfolio-filter]').forEach((btn) => {
            const isActive = btn === button;
            btn.classList.toggle('bg-kodia-bg-dark', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('border-kodia-black', !isActive);
            btn.classList.toggle('bg-white', !isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        document.querySelectorAll('[data-portfolio-item]').forEach((item) => {
            const matches = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !matches);
        });
    });
});
