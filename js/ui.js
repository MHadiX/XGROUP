// js/ui.js
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navElements = document.getElementById('nav-elements');

    // Only run if BOTH elements exist on the current page
    if (mobileMenuBtn && navElements) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the document click from closing it immediately
            navElements.classList.toggle('show');
            console.log("Navigation toggled");
        });

        // Close menu when clicking anywhere else on the screen
        document.addEventListener('click', (e) => {
            if (!navElements.contains(e.target) && e.target !== mobileMenuBtn) {
                navElements.classList.remove('show');
            }
        });
    } else {
        console.warn("Navigation elements not found on this page. Skipping nav logic.");
    }
});