// Mobile menu animation
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerIcon = mobileMenuButton?.querySelector(".hamburger-icon");
const closeIcon = mobileMenuButton?.querySelector(".close-icon");
let isMenuOpen = false;

mobileMenuButton?.addEventListener("click", () => {
    if (isMenuOpen) {
        // Close menu
        mobileMenu?.classList.remove("max-h-screen");
        mobileMenu?.classList.add("max-h-0");
        hamburgerIcon?.classList.remove("hidden");
        closeIcon?.classList.add("hidden");
        setTimeout(() => {
            mobileMenu?.classList.add("hidden");
        }, 300);
        isMenuOpen = false;
    } else {
        // Open menu
        mobileMenu?.classList.remove("hidden");
        mobileMenu?.classList.add("block");
        mobileMenu?.classList.remove("max-h-screen"); // Ensure it's at 0
        mobileMenu?.classList.add("max-h-0");
        hamburgerIcon?.classList.add("hidden");
        closeIcon?.classList.remove("hidden");
        requestAnimationFrame(() => {
            mobileMenu?.classList.remove("max-h-0");
            mobileMenu?.classList.add("max-h-screen");
        });
        isMenuOpen = true;
    }
});

// Navigation bar on scroll
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
        nav.classList.add("bg-background/70", "border-b", "border-gray-700");
    } else {
        nav.classList.remove("bg-background/70", "border-b", "border-gray-700");
    }
});