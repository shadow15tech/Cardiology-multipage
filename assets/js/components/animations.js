/* =========================================================
   CARDIOLOGIST WEBSITE
   SHARED ANIMATIONS
   ========================================================= */


/* =========================================================
   REDUCED MOTION CHECK
   Respect user's accessibility preference.
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   STOP ANIMATIONS FOR REDUCED MOTION USERS
   ========================================================= */

if (!prefersReducedMotion) {


    /* =====================================================
       INTERSECTION OBSERVER
       Reveals elements when they enter the viewport.
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (revealElements.length) {

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
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       STAGGERED REVEAL
       Supports:
       data-reveal-group
       ===================================================== */

    const revealGroups =
        document.querySelectorAll(
            "[data-reveal-group]"
        );


    revealGroups.forEach((group) => {

        const children =
            group.querySelectorAll(
                "[data-reveal-item]"
            );


        children.forEach((child, index) => {

            child.style.setProperty(
                "--reveal-delay",
                `${index * 80}ms`
            );

        });

    });

}