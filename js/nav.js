function initSiteNav() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;

    const dropdown = header.querySelector('[data-nav-dropdown]');
    const trigger = dropdown?.querySelector('[data-nav-dropdown-trigger]');
    const menu = dropdown?.querySelector('[data-nav-dropdown-menu]');
    const mobileToggle = header.querySelector('[data-nav-mobile-toggle]');
    const mobileMenu = header.querySelector('[data-nav-mobile-menu]');
    const iconMenu = header.querySelector('[data-nav-icon-menu]');
    const iconClose = header.querySelector('[data-nav-icon-close]');

    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    function setDropdownOpen(isOpen) {
        if (!menu || !trigger) return;

        menu.classList.toggle('is-open', isOpen);
        trigger.setAttribute('aria-expanded', String(isOpen));
    }

    function closeDropdown() {
        setDropdownOpen(false);
    }

    function openDropdown() {
        setDropdownOpen(true);
    }

    function toggleDropdown() {
        const isOpen = trigger?.getAttribute('aria-expanded') === 'true';
        setDropdownOpen(!isOpen);
    }

    function setMobileOpen(isOpen) {
        if (!mobileMenu || !mobileToggle) return;

        mobileMenu.classList.toggle('hidden', !isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        iconMenu?.classList.toggle('hidden', isOpen);
        iconClose?.classList.toggle('hidden', !isOpen);
        document.body.classList.toggle('overflow-hidden', isOpen && !desktopQuery.matches);
    }

    function closeMobile() {
        setMobileOpen(false);
    }

    trigger?.addEventListener('click', (event) => {
        event.preventDefault();
        toggleDropdown();
    });

    trigger?.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            openDropdown();
            menu?.querySelector('a')?.focus();
        }

        if (event.key === 'Escape') {
            closeDropdown();
            trigger.blur();
        }
    });

    menu?.addEventListener('keydown', (event) => {
        const items = Array.from(menu.querySelectorAll('a[role="menuitem"]'));
        const currentIndex = items.indexOf(document.activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const next = items[(currentIndex + 1) % items.length];
            next?.focus();
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prev = items[(currentIndex - 1 + items.length) % items.length];
            prev?.focus();
        }

        if (event.key === 'Escape') {
            closeDropdown();
            trigger?.focus();
        }
    });

    dropdown?.addEventListener('mouseenter', () => {
        if (desktopQuery.matches) openDropdown();
    });

    dropdown?.addEventListener('mouseleave', () => {
        if (desktopQuery.matches) closeDropdown();
    });

    mobileToggle?.addEventListener('click', () => {
        const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        setMobileOpen(!isOpen);
    });

    mobileMenu?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobile);
    });

    document.addEventListener('click', (event) => {
        if (dropdown && !dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDropdown();
            closeMobile();
        }
    });

    desktopQuery.addEventListener('change', () => {
        closeMobile();
        closeDropdown();
    });
}

document.addEventListener('DOMContentLoaded', initSiteNav);
