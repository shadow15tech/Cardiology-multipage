/* =========================================================
   CARDIOLOGIST WEBSITE
   NAVBAR
   ========================================================= */

const menuToggle = document.querySelector(".site-header__menu-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");

if (menuToggle && mobileNavigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.classList.toggle("is-active");

        mobileNavigation.classList.toggle(
            "is-open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* Close mobile navigation after selecting a link */

    const mobileLinks =
        mobileNavigation.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("is-active");

            mobileNavigation.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* Close menu when viewport becomes desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            menuToggle.classList.remove("is-active");

            mobileNavigation.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });

}