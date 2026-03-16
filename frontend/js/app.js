/**
 * app.js — Entry point. Initialises all UI, loads initial data from backend.
 * Runs after the DOM is ready (deferred script in index.html).
 */

async function init() {
    // ── 1. Navbar setup ───────────────────────────────────────────────────────
    initDarkModeToggle();
    initMobileMenu();

    // Nav link and mobile-link click handling
    document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach((el) => {
        el.addEventListener('click', () => {
            const page = el.dataset.page;
            if (page) showPage(page);

            // Close mobile menu after navigation
            const menu = document.getElementById('mobile-menu');
            const btn = document.getElementById('hamburger-btn');
            if (menu) menu.classList.remove('open');
            if (btn) btn.textContent = '☰';
        });
    });

    // ── 2. Landing page (static content, no async needed) ────────────────────
    renderLandingPage();

    // ── 3. Show the home page first ───────────────────────────────────────────
    showPage('home');

    // ── 4. Pre-fetch garments so Try-On panel works immediately ──────────────
    try {
        const garmentData = await fetchGarments();
        // Make garments available to the Try-On state
        tryOnState.allGarments = garmentData;
    } catch (err) {
        console.warn('Could not pre-fetch garments:', err.message);
    }
}

// Run init when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
