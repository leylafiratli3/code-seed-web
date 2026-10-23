document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.studio-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    const menuButton = document.getElementById('studio-menu-button');
    const menu = document.getElementById('studio-menu');
    if (menuButton && menu) {
        menuButton.addEventListener('click', () => {
            const open = menu.classList.toggle('hidden') === false;
            menuButton.setAttribute('aria-expanded', String(open));
            header.classList.add('is-scrolled');
        });
        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
        }));
    }

    // Hero parallax: characters drift with the pointer, nearer ones more
    const hero = document.querySelector('.studio-hero');
    const units = [...document.querySelectorAll('.hero-unit')].map(el => ({
        el,
        depth: parseFloat(getComputedStyle(el).getPropertyValue('--depth')) || 0,
    }));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hero && units.length && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        let frame = 0;
        hero.addEventListener('pointermove', (event) => {
            const rect = hero.getBoundingClientRect();
            const dx = (event.clientX - rect.left) / rect.width - 0.5;
            const dy = (event.clientY - rect.top) / rect.height - 0.5;
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => units.forEach(({ el, depth }) => {
                el.style.setProperty('--px', `${(-dx * depth).toFixed(1)}px`);
                el.style.setProperty('--py', `${(-dy * depth * 0.5).toFixed(1)}px`);
            }));
        });
        hero.addEventListener('pointerleave', () => units.forEach(({ el }) => {
            el.style.setProperty('--px', '0px');
            el.style.setProperty('--py', '0px');
        }));
    }

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Newsletter: submit inline via Formspree, fall back to a normal POST on failure
    const form = document.getElementById('newsletter-form');
    const status = document.getElementById('newsletter-status');
    if (form && status) {
        if (window.FormGuard) FormGuard.protect(form);
        const showThanks = () => {
            form.reset();
            status.className = 'text-sm mt-4 min-h-[1.25rem] text-seed';
            status.textContent = "You're on the list. See you in the next dispatch.";
        };
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (window.FormGuard) {
                const verdict = FormGuard.check(form);
                if (!verdict.ok) {
                    if (verdict.silent) { showThanks(); return; }
                    status.className = 'text-sm mt-4 min-h-[1.25rem] text-red-300';
                    status.textContent = verdict.message;
                    return;
                }
            }
            const button = form.querySelector('button[type="submit"]');
            button.disabled = true;
            status.className = 'text-sm mt-4 min-h-[1.25rem] text-slate-400';
            status.textContent = 'Subscribing…';
            try {
                const data = new FormData(form);
                data.delete('contact_website');
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { Accept: 'application/json' },
                });
                if (!response.ok) throw new Error(response.statusText);
                showThanks();
            } catch {
                status.className = 'text-sm mt-4 min-h-[1.25rem] text-red-300';
                status.textContent = 'Something went wrong. Please try again, or join us on Discord.';
            } finally {
                button.disabled = false;
                if (window.FormGuard) FormGuard.reset(form);
            }
        });
    }
});
