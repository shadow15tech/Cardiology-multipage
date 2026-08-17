/* =========================================================
   CARDIOLOGIST WEBSITE
   HOME HERO
   ========================================================= */


/* =========================================================
   HERO ELEMENT
   ========================================================= */

const hero =
    document.querySelector(".home-hero");


if (hero) {


    /* =====================================================
       HERO VISUAL PARALLAX
       Subtle mouse movement on desktop.
       ===================================================== */

    const heroVisual =
        hero.querySelector(".home-hero__visual");


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        heroVisual &&
        !reduceMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 8;

                const moveY =
                    (y - 0.5) * 8;


                heroVisual.style.transform =
                    `translate3d(${moveX}px, ${moveY}px, 0)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroVisual.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );

    }


    /* =====================================================
       HERO CTA MICRO INTERACTION
       ===================================================== */

    const heroButtons =
        hero.querySelectorAll(".btn");


    heroButtons.forEach((button) => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.classList.add(
                    "is-hovered"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.classList.remove(
                    "is-hovered"
                );

            }
        );

    });

}