/* =========================================================
   CARDIOLOGIST WEBSITE
   FOOTER
   ========================================================= */


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const footerCopyright =
    document.querySelector(".site-footer__copyright");

if (footerCopyright) {

    const currentYear =
        new Date().getFullYear();

    footerCopyright.textContent =
        `© ${currentYear} CardioCare. All rights reserved.`;
}