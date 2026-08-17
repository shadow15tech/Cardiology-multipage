/* =========================================================
   CARDIOLOGIST WEBSITE
   CONTACT PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initContactReveal();

    initAppointmentForm();

    initPreferredDate();

});


/* =========================================================
   01. CONTACT REVEAL ANIMATION
   ========================================================= */

function initContactReveal() {

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
   02. APPOINTMENT FORM
   ========================================================= */

function initAppointmentForm() {

    const form =
        document.querySelector(
            "#appointment-contact-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            clearFormErrors();


            const isValid =
                validateAppointmentForm(
                    form
                );


            if (!isValid) {
                return;
            }


            showFormSuccess(form);

        }
    );


    /* -------------------------------------------------------
       CLEAR ERROR WHILE USER TYPES
       ------------------------------------------------------- */

    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach((field) => {

        field.addEventListener(
            "input",
            () => {

                clearFieldError(
                    field
                );

            }
        );


        field.addEventListener(
            "change",
            () => {

                clearFieldError(
                    field
                );

            }
        );

    });

}


/* =========================================================
   03. FORM VALIDATION
   ========================================================= */

function validateAppointmentForm(form) {

    let isValid = true;


    /* -------------------------------------------------------
       NAME
       ------------------------------------------------------- */

    const name =
        form.querySelector(
            "#patient-name"
        );


    if (
        !name ||
        name.value.trim().length < 2
    ) {

        setFieldError(
            name,
            "Please enter your full name."
        );

        isValid = false;

    }


    /* -------------------------------------------------------
       PHONE
       ------------------------------------------------------- */

    const phone =
        form.querySelector(
            "#patient-phone"
        );


    const phonePattern =
        /^[0-9+\-\s()]{10,18}$/;


    if (
        !phone ||
        !phonePattern.test(
            phone.value.trim()
        )
    ) {

        setFieldError(
            phone,
            "Please enter a valid phone number."
        );

        isValid = false;

    }


    /* -------------------------------------------------------
       EMAIL
       ------------------------------------------------------- */

    const email =
        form.querySelector(
            "#patient-email"
        );


    if (
        email &&
        email.value.trim() !== ""
    ) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                email.value.trim()
            )
        ) {

            setFieldError(
                email,
                "Please enter a valid email address."
            );

            isValid = false;

        }

    }


    /* -------------------------------------------------------
       REASON FOR VISIT
       ------------------------------------------------------- */

    const concern =
        form.querySelector(
            "#patient-concern"
        );


    if (
        !concern ||
        !concern.value
    ) {

        setFieldError(
            concern,
            "Please select a reason for your visit."
        );

        isValid = false;

    }


    /* -------------------------------------------------------
       PREFERRED DATE
       ------------------------------------------------------- */

    const preferredDate =
        form.querySelector(
            "#preferred-date"
        );


    if (
        preferredDate &&
        preferredDate.value
    ) {

        const selectedDate =
            new Date(
                `${preferredDate.value}T00:00:00`
            );


        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        if (
            selectedDate < today
        ) {

            setFieldError(
                preferredDate,
                "Please select a future date."
            );

            isValid = false;

        }

    }


    return isValid;

}


/* =========================================================
   04. FIELD ERROR
   ========================================================= */

function setFieldError(
    field,
    message
) {

    if (!field) {
        return;
    }


    const fieldWrapper =
        field.closest(
            ".contact-form__field"
        );


    if (!fieldWrapper) {
        return;
    }


    fieldWrapper.classList.add(
        "is-invalid"
    );


    const errorElement =
        fieldWrapper.querySelector(
            ".contact-form__error"
        );


    if (errorElement) {

        errorElement.textContent =
            message;

    }

}


/* =========================================================
   05. CLEAR FIELD ERROR
   ========================================================= */

function clearFieldError(field) {

    if (!field) {
        return;
    }


    const fieldWrapper =
        field.closest(
            ".contact-form__field"
        );


    if (!fieldWrapper) {
        return;
    }


    fieldWrapper.classList.remove(
        "is-invalid"
    );


    const errorElement =
        fieldWrapper.querySelector(
            ".contact-form__error"
        );


    if (errorElement) {

        errorElement.textContent = "";

    }

}


/* =========================================================
   06. CLEAR ALL FORM ERRORS
   ========================================================= */

function clearFormErrors() {

    const invalidFields =
        document.querySelectorAll(
            ".contact-form__field.is-invalid"
        );


    invalidFields.forEach(
        (fieldWrapper) => {

            fieldWrapper.classList.remove(
                "is-invalid"
            );

        }
    );


    const errorMessages =
        document.querySelectorAll(
            ".contact-form__error"
        );


    errorMessages.forEach(
        (error) => {

            error.textContent = "";

        }
    );

}


/* =========================================================
   07. FORM SUCCESS
   ========================================================= */

function showFormSuccess(form) {

    const status =
        form.querySelector(
            "#contact-form-status"
        );


    if (!status) {
        return;
    }


    status.textContent =
        "Thank you. Your appointment request has been received. Our team will contact you to confirm the appointment.";


    status.classList.add(
        "is-success"
    );


    form.reset();


    /* -------------------------------------------------------
       SCROLL STATUS INTO VIEW
       ------------------------------------------------------- */

    status.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* =========================================================
   08. PREFERRED DATE
   ========================================================= */

function initPreferredDate() {

    const dateInput =
        document.querySelector(
            "#preferred-date"
        );


    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    dateInput.min =
        `${year}-${month}-${day}`;

}