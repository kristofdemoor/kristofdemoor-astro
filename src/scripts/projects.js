document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll("#projects .filter-btn");
    const projectCards = document.querySelectorAll("#project-grid > div[data-category]");

    if (!filterButtons.length || !projectCards.length) {
        return;
    }

    const clearActiveButtons = () => {
        filterButtons.forEach((button) => {
            button.classList.remove("bg-rose", "text-white");
            button.classList.add("text-white/70", "hover:text-white", "hover:bg-white/10");
        });
    };

    const setActiveButton = (button) => {
        clearActiveButtons();
        button.classList.remove("text-white/70", "hover:text-white", "hover:bg-white/10");
        button.classList.add("bg-rose", "text-white");
    };

    const filterProjects = (filter) => {
        const category = filter.startsWith(".") ? filter.slice(1) : filter;
        const TRANSITION_DELAY_MS = 100; // Delay between each card's transition in milliseconds
        let revealIndex = 0;
        let hideIndex = 0;

        projectCards.forEach((card) => {
            const isVisible = category === "all" || card.dataset.category === category;
            const isHidden = card.classList.contains("hidden");

            if (isVisible) {
                if (isHidden) {
                    card.style.transitionDelay = `${revealIndex * TRANSITION_DELAY_MS}ms`;
                    revealIndex += 1;
                    card.classList.remove("hidden");
                    card.classList.add("opacity-0", "translate-y-4");
                    requestAnimationFrame(() => {
                        card.classList.remove("opacity-0", "translate-y-4");
                    });
                } else {
                    card.style.transitionDelay = "";
                }
            } else {
                if (!isHidden) {
                    card.style.transitionDelay = `${hideIndex * TRANSITION_DELAY_MS}ms`;
                    hideIndex += 1;

                    const onTransitionEnd = (event) => {
                        if (event.target === card && event.propertyName === "opacity") {
                            card.classList.add("hidden");
                            card.style.transitionDelay = "";
                            card.removeEventListener("transitionend", onTransitionEnd);
                        }
                    };

                    card.addEventListener("transitionend", onTransitionEnd);
                    card.classList.add("opacity-0", "translate-y-4");
                }
            }
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setActiveButton(button);
            filterProjects(button.dataset.filter);
        });
    });

    const defaultButton = Array.from(filterButtons).find((button) =>
        button.classList.contains("bg-rose")
    );

    if (defaultButton) {
        filterProjects(defaultButton.dataset.filter);
    }
});
