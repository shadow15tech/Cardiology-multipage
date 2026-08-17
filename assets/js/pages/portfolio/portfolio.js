/* =========================================================
   CARDIOLOGIST WEBSITE
   PORTFOLIO / EXPERTISE PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPortfolioReveal();

    initPortfolioFilter();

});


/* =========================================================
   01. REVEAL ANIMATION
   ========================================================= */

function initPortfolioReveal() {

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (!revealElements.length) {
        return;
    }


    /* -------------------------------------------------------
       REDUCED MOTION
       ------------------------------------------------------- */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach((element) => {

            element.classList.add(
                "is-revealed"
            );

        });

        return;
    }


    /* -------------------------------------------------------
       INTERSECTION OBSERVER
       ------------------------------------------------------- */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "is-revealed"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });

}


/* =========================================================
   02. EXPERTISE FILTER
   ========================================================= */

function initPortfolioFilter() {

    const filterButtons =
        document.querySelectorAll(
            ".portfolio-filter__button"
        );


    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !filterButtons.length ||
        !projectCards.length
    ) {
        return;
    }


    /* -------------------------------------------------------
       FILTER BUTTON CLICK
       ------------------------------------------------------- */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter;


                updateActiveFilter(
                    filterButtons,
                    button
                );


                filterProjects(
                    projectCards,
                    selectedFilter
                );

            }
        );

    });


    /* -------------------------------------------------------
       KEYBOARD ACCESSIBILITY
       ------------------------------------------------------- */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key !== "ArrowRight" &&
                    event.key !== "ArrowLeft"
                ) {
                    return;
                }


                event.preventDefault();


                const buttons =
                    Array.from(
                        filterButtons
                    );


                const currentIndex =
                    buttons.indexOf(button);


                let nextIndex;


                if (
                    event.key === "ArrowRight"
                ) {

                    nextIndex =
                        (currentIndex + 1)
                        % buttons.length;

                } else {

                    nextIndex =
                        (
                            currentIndex -
                            1 +
                            buttons.length
                        )
                        % buttons.length;

                }


                buttons[nextIndex].focus();

            }
        );

    });

}


/* =========================================================
   03. ACTIVE FILTER STATE
   ========================================================= */

function updateActiveFilter(
    buttons,
    activeButton
) {

    buttons.forEach((button) => {

        const isActive =
            button === activeButton;


        button.classList.toggle(
            "is-active",
            isActive
        );


        button.setAttribute(
            "aria-selected",
            String(isActive)
        );

    });

}


/* =========================================================
   04. FILTER PROJECTS
   ========================================================= */

function filterProjects(
    projectCards,
    selectedFilter
) {

    projectCards.forEach((card, index) => {

        const cardCategory =
            card.dataset.category;


        const shouldShow =
            selectedFilter === "all" ||
            cardCategory === selectedFilter;


        if (shouldShow) {

            showProjectCard(
                card,
                index
            );

        } else {

            hideProjectCard(
                card
            );

        }

    });

}


/* =========================================================
   05. SHOW PROJECT CARD
   ========================================================= */

function showProjectCard(
    card,
    index
) {

    card.classList.remove(
        "is-filtered-out"
    );


    card.removeAttribute(
        "aria-hidden"
    );


    card.style.display = "";


    /*
     * Small stagger when cards return.
     */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !prefersReducedMotion
    ) {

        card.style.transitionDelay =
            `${Math.min(index * 60, 300)}ms`;

    }

}


/* =========================================================
   06. HIDE PROJECT CARD
   ========================================================= */

function hideProjectCard(card) {

    card.classList.add(
        "is-filtered-out"
    );


    card.setAttribute(
        "aria-hidden",
        "true"
    );


    card.style.transitionDelay =
        "0ms";


    /*
     * Wait for the card's fade/transform
     * transition before removing it
     * from the layout.
     */

    const removeTimer =
        window.setTimeout(
            () => {

                if (
                    card.classList.contains(
                        "is-filtered-out"
                    )
                ) {

                    card.style.display =
                        "none";

                }

            },
            300
        );


    /*
     * Store timer so repeated filtering
     * doesn't create stale transitions.
     */

    card._filterTimer =
        removeTimer;

}


/* =========================================================
   07. FILTER STATE CLEANUP
   ========================================================= */

function resetFilterTransitions() {

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach((card) => {

        if (card._filterTimer) {

            window.clearTimeout(
                card._filterTimer
            );

            card._filterTimer = null;

        }


        card.style.transitionDelay =
            "";

    });

}


/* =========================================================
   08. SAFE FILTER OVERRIDE
   ========================================================= */

const originalFilter =
    window.filterProjects;


window.filterProjects =
    function (
        projectCards,
        selectedFilter
    ) {

        resetFilterTransitions();


        if (typeof originalFilter === "function") {

            originalFilter(
                projectCards,
                selectedFilter
            );

            return;
        }


        projectCards.forEach((card) => {

            const cardCategory =
                card.dataset.category;


            const shouldShow =
                selectedFilter === "all" ||
                cardCategory === selectedFilter;


            if (shouldShow) {

                card.classList.remove(
                    "is-filtered-out"
                );

                card.removeAttribute(
                    "aria-hidden"
                );

                card.style.display = "";

            } else {

                card.classList.add(
                    "is-filtered-out"
                );

                card.setAttribute(
                    "aria-hidden",
                    "true"
                );

                card.style.display = "none";

            }

        });

    };