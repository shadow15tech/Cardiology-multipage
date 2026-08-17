/* =========================================================
   CARDIOLOGIST WEBSITE
   ABOUT PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   ABOUT PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initAboutReveal();

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initAboutReveal() {

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (!revealElements.length) {
        return;
    }


    /* =====================================================
       INTERSECTION OBSERVER
       ===================================================== */

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
                    "0px 0px -50px 0px"
            }
        );


    /* =====================================================
       OBSERVE ELEMENTS
       ===================================================== */

    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });

}