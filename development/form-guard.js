// Spam protection shared by every form on the site.
// - Honeypot: a hidden field real visitors never see or fill in.
// - Minimum fill time: bots submit instantly; people take a few seconds.
// - Cloudflare Turnstile: verified server-side by Formspree once a site key is set.
//   Create a widget at https://dash.cloudflare.com/?to=/:account/turnstile (allowed domain: code-seed.io),
//   paste its site key below, and select Turnstile + paste the secret key in the Formspree form settings.
const TURNSTILE_SITE_KEY = '0x4AAAAAAFiV2EFPgvMOrkBD';
const MIN_FILL_MS = 3000;

window.FormGuard = (() => {
    const loadedAt = new WeakMap();

    function addHoneypot(form) {
        const trap = document.createElement('div');
        trap.setAttribute('aria-hidden', 'true');
        trap.style.cssText = 'position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;';
        trap.innerHTML = '<label>Leave this field empty<input type="text" name="contact_website" tabindex="-1" autocomplete="off"></label>';
        form.appendChild(trap);
    }

    function addTurnstile(form) {
        if (!TURNSTILE_SITE_KEY) return;
        if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
        const widget = document.createElement('div');
        widget.className = 'cf-turnstile';
        widget.dataset.sitekey = TURNSTILE_SITE_KEY;
        widget.dataset.appearance = 'always';
        widget.dataset.size = 'flexible';
        widget.style.marginTop = '1rem';
        if (form.dataset.turnstile === 'end') {
            widget.style.flexBasis = '100%';
            widget.style.marginTop = '0';
            form.appendChild(widget);
        } else {
            form.insertBefore(widget, form.querySelector('button[type="submit"]'));
        }
    }

    function protect(form) {
        loadedAt.set(form, Date.now());
        addHoneypot(form);
        addTurnstile(form);
    }

    // Returns { ok: true } to send, { ok: false, silent: true } to quietly drop a bot,
    // or { ok: false, message } when a person needs to do something.
    function check(form) {
        const trap = form.querySelector('input[name="contact_website"]');
        const gotcha = form.querySelector('input[name="_gotcha"]');
        if ((trap && trap.value) || (gotcha && gotcha.value)) return { ok: false, silent: true };
        if (Date.now() - (loadedAt.get(form) || 0) < MIN_FILL_MS) return { ok: false, silent: true };
        if (TURNSTILE_SITE_KEY) {
            const token = form.querySelector('input[name="cf-turnstile-response"]');
            if (!token || !token.value) return { ok: false, message: 'Please wait a moment for the security check to finish, then try again.' };
        }
        return { ok: true };
    }

    function reset(form) {
        loadedAt.set(form, Date.now());
        if (TURNSTILE_SITE_KEY && window.turnstile) window.turnstile.reset(form.querySelector('.cf-turnstile'));
    }

    return { protect, check, reset };
})();
