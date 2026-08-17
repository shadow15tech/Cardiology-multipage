/* =========================================================
   CARDIOLOGIST WEBSITE
   HOME — TESTIMONIALS
   ========================================================= */


/* =========================================================
   TESTIMONIAL SLIDER
   ========================================================= */

const testimonialSlider =
    document.querySelector(
        "[data-testimonials-slider]"
    );


if (testimonialSlider) {

    const track =
        testimonialSlider.querySelector(
            ".home-testimonials__track"
        );

    const cards =
        testimonialSlider.querySelectorAll(
            "[data-testimonial]"
        );

    const previousButton =
        testimonialSlider.querySelector(
            "[data-testimonial-prev]"
        );

    const nextButton =
        testimonialSlider.querySelector(
            "[data-testimonial-next]"
        );

    const currentNumber =
        testimonialSlider.querySelector(
            "[data-testimonial-current]"
        );

    const totalNumber =
        testimonialSlider.querySelector(
            "[data-testimonial-total]"
        );


    /* =====================================================
       STATE
       ===================================================== */

    let currentIndex = 0;

    const totalSlides =
        cards.length;


    /* =====================================================
       TOTAL NUMBER
       ===================================================== */

    if (totalNumber) {

        totalNumber.textContent =
            String(totalSlides).padStart(2, "0");

    }


    /* =====================================================
       GET VISIBLE SLIDES
       ===================================================== */

    const getSlidesPerView = () => {

        if (window.innerWidth <= 650) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;

    };


    /* =====================================================
       UPDATE SLIDER
       ===================================================== */

    const updateSlider = () => {

        const slidesPerView =
            getSlidesPerView();


        const maxIndex =
            Math.max(
                0,
                totalSlides - slidesPerView
            );


        currentIndex =
            Math.min(
                currentIndex,
                maxIndex
            );


        if (window.innerWidth <= 650) {

            const offset =
                currentIndex * 100;

            track.style.transform =
                `translateX(-${offset}%)`;

        } else {

            track.style.transform =
                "translateX(0)";

        }


        if (currentNumber) {

            currentNumber.textContent =
                String(currentIndex + 1)
                    .padStart(2, "0");

        }


        if (previousButton) {

            previousButton.disabled =
                currentIndex === 0;

        }


        if (nextButton) {

            nextButton.disabled =
                currentIndex >= maxIndex;

        }

    };


    /* =====================================================
       NEXT
       ===================================================== */

    const goNext = () => {

        const slidesPerView =
            getSlidesPerView();

        const maxIndex =
            Math.max(
                0,
                totalSlides - slidesPerView
            );


        if (currentIndex < maxIndex) {

            currentIndex++;

            updateSlider();

        }

    };


    /* =====================================================
       PREVIOUS
       ===================================================== */

    const goPrevious = () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateSlider();

        }

    };


    /* =====================================================
       EVENTS
       ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            goNext
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            goPrevious
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    testimonialSlider.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowRight") {

                goNext();

            }

            if (event.key === "ArrowLeft") {

                goPrevious();

            }

        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                updateSlider,
                150
            );

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateSlider();

}