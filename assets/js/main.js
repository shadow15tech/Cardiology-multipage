/* =========================================================
   CARDIOLOGIST WEBSITE
   MAIN JAVASCRIPT ENTRY
   ========================================================= */


/* =========================================================
   SHARED COMPONENTS
   ========================================================= */

import "./components/navbar.js";
import "./components/footer.js";
import "./components/animations.js";


/* =========================================================
   PAGE DETECTION
   ========================================================= */

const currentPage =
    document.body.dataset.page;


/* =========================================================
   PAGE-SPECIFIC JAVASCRIPT
   Only the required page module is loaded.
   ========================================================= */

switch (currentPage) {

    case "home":

        import("./pages/home/home.js");

        break;


    case "about":

        import("./pages/about/about.js");

        break;


    case "services":

        import("./pages/services/services.js");

        break;


    case "portfolio":

        import("./pages/portfolio/portfolio.js");

        break;


    case "contact":

        import("./pages/contact/contact.js");

        break;


    default:

        break;
}