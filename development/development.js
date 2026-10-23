document.addEventListener('DOMContentLoaded', () => {
    // Header border once scrolled
    const header = document.querySelector('.dev-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    const menuButton = document.getElementById('dev-menu-button');
    const menu = document.getElementById('dev-menu');
    if (menuButton && menu) {
        const setOpen = (open) => {
            menu.classList.toggle('hidden', !open);
            header.classList.toggle('menu-open', open);
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menuButton.querySelector('i').className = open ? 'fas fa-xmark text-xl' : 'fas fa-bars text-xl';
        };
        menuButton.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    }

    // Reveal sections as they scroll into view
    const revealTargets = document.querySelectorAll('.service-item, .featured, .quote-card, .principles li, .team-card');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealTargets.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 4) * 70}ms`;
            observer.observe(el);
        });
    }

    // Studios cards: gentle 3D tilt and glare that follow the pointer
    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (canTilt) {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            const inner = card.querySelector('.studio-card-inner');
            card.addEventListener('pointermove', (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                card.classList.add('is-tilting');
                inner.style.setProperty('--ry', `${((x - 0.5) * 6).toFixed(2)}deg`);
                inner.style.setProperty('--rx', `${((0.5 - y) * 6).toFixed(2)}deg`);
                inner.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
                inner.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
            });
            card.addEventListener('pointerleave', () => {
                card.classList.remove('is-tilting');
                inner.style.setProperty('--rx', '0deg');
                inner.style.setProperty('--ry', '0deg');
            });
        });
    }

    // Count up ListForge numbers when they scroll into view
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = Number(el.dataset.count);
                const start = performance.now();
                const duration = 1400;
                const tick = (now) => {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = `${Math.round(target * eased).toLocaleString('en-US')}+`;
                    if (t < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            });
        }, { threshold: 0.6 });
        counters.forEach(el => countObserver.observe(el));
    }

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Contact form: submit inline via Formspree
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    if (form && status) {
        if (window.FormGuard) FormGuard.protect(form);
        const showThanks = () => {
            form.reset();
            status.className = 'text-sm mt-4 min-h-[1.25rem] text-center text-secondary font-medium';
            status.textContent = "Thanks! We've received your message and will be in touch soon.";
        };
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (window.FormGuard) {
                const verdict = FormGuard.check(form);
                if (!verdict.ok) {
                    if (verdict.silent) { showThanks(); return; }
                    status.className = 'text-sm mt-4 min-h-[1.25rem] text-center text-red-600';
                    status.textContent = verdict.message;
                    return;
                }
            }
            const button = form.querySelector('button[type="submit"]');
            button.disabled = true;
            status.className = 'text-sm mt-4 min-h-[1.25rem] text-center text-slate-500';
            status.textContent = 'Sending…';
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
                status.className = 'text-sm mt-4 min-h-[1.25rem] text-center text-red-600';
                status.textContent = 'Something went wrong sending your message. Please try again.';
            } finally {
                button.disabled = false;
                if (window.FormGuard) FormGuard.reset(form);
            }
        });
    }
});
