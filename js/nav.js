function initSiteNav() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;

    const dropdowns = Array.from(header.querySelectorAll('[data-nav-dropdown]'));
    const mobileToggle = header.querySelector('[data-nav-mobile-toggle]');
    const mobileMenu = header.querySelector('[data-nav-mobile-menu]');
    const iconMenu = header.querySelector('[data-nav-icon-menu]');
    const iconClose = header.querySelector('[data-nav-icon-close]');
    const desktopQuery = window.matchMedia('(min-width: 1100px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setDropdownOpen(dropdown, isOpen) {
        const trigger = dropdown.querySelector('[data-nav-dropdown-trigger]');
        const menu = dropdown.querySelector('[data-nav-dropdown-menu]');
        if (!trigger || !menu) return;
        menu.classList.toggle('is-open', isOpen);
        trigger.setAttribute('aria-expanded', String(isOpen));
        dropdown.classList.toggle('is-open', isOpen);
    }

    function closeAllDropdowns(except) {
        dropdowns.forEach((d) => {
            if (d !== except) setDropdownOpen(d, false);
        });
    }

    function setMobileOpen(isOpen) {
        if (!mobileMenu || !mobileToggle) return;
        mobileMenu.hidden = !isOpen;
        mobileMenu.classList.toggle('is-open', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? 'Tanca el menú' : 'Obre el menú');
        iconMenu?.classList.toggle('hidden', isOpen);
        iconClose?.classList.toggle('hidden', !isOpen);
        document.body.classList.toggle('site-nav-lock', isOpen && !desktopQuery.matches);
    }

    function closeMobile() {
        setMobileOpen(false);
    }

    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector('[data-nav-dropdown-trigger]');
        const menu = dropdown.querySelector('[data-nav-dropdown-menu]');
        if (!trigger || !menu) return;

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const open = trigger.getAttribute('aria-expanded') === 'true';
            closeAllDropdowns(dropdown);
            setDropdownOpen(dropdown, !open);
            if (!open) menu.querySelector('a')?.focus();
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                closeAllDropdowns(dropdown);
                setDropdownOpen(dropdown, true);
                menu.querySelector('a')?.focus();
            }
            if (event.key === 'Escape') {
                setDropdownOpen(dropdown, false);
                trigger.focus();
            }
        });

        menu.addEventListener('keydown', (event) => {
            const items = Array.from(menu.querySelectorAll('a[role="menuitem"]'));
            const currentIndex = items.indexOf(document.activeElement);
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                items[(currentIndex + 1) % items.length]?.focus();
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                items[(currentIndex - 1 + items.length) % items.length]?.focus();
            }
            if (event.key === 'Escape') {
                setDropdownOpen(dropdown, false);
                trigger.focus();
            }
        });

        dropdown.addEventListener('mouseenter', () => {
            if (desktopQuery.matches) {
                closeAllDropdowns(dropdown);
                setDropdownOpen(dropdown, true);
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (desktopQuery.matches) setDropdownOpen(dropdown, false);
        });
    });

    mobileToggle?.addEventListener('click', () => {
        const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        setMobileOpen(!isOpen);
    });

    mobileMenu?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobile);
    });

    document.addEventListener('click', (event) => {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) setDropdownOpen(dropdown, false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAllDropdowns();
            closeMobile();
        }
    });

    desktopQuery.addEventListener('change', () => {
        closeMobile();
        closeAllDropdowns();
    });

    if (reduceMotion) {
        header.classList.add('site-nav--reduced');
    }

    closeMobile();
    closeAllDropdowns();
}

document.addEventListener('DOMContentLoaded', initSiteNav);
