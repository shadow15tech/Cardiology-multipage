/* =========================================================
   CARDIOLOGIST WEBSITE
   SERVICES PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initServicesReveal();

});


/* =========================================================
   SERVICES REVEAL ANIMATION
   ========================================================= */

function initServicesReveal() {

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    /* -------------------------------------------------------
       SAFETY CHECK
       ------------------------------------------------------- */

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


    /* -------------------------------------------------------
       START OBSERVING
       ------------------------------------------------------- */

    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });

}