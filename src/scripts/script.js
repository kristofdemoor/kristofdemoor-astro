// Set current year in footer
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

// Counter animation for highlights section
function animateCounter(element, target, duration = 1250) {
    let current = 0;
    // const increment = target / (duration / 16); // 16ms per frame for ~60fps
    const startTime = Date.now();

    const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeValue = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        current = Math.floor(target * easeValue);
        element.textContent = "+" + current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = "+" + target;
        }
    };

    requestAnimationFrame(updateCounter);
}

// Trigger animation when highlights section comes into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            const counters = entry.target.querySelectorAll(".counter");
            counters.forEach((counter) => {
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe highlights section
const highlightsSection = document.querySelector(".flex.flex-col.gap-4.rounded-4xl.bg-white\\/5").closest("section");
if (highlightsSection) {
    observer.observe(highlightsSection);
};