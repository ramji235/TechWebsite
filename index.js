    /* =========================================================
   VASTRA - VASTU & LIFE SCIENCES
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const header = document.querySelector(".site-header");
    const navigation = document.querySelector(".main-navigation");

    if (header && navigation) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.type = "button";
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        header.querySelector(".container").appendChild(menuButton);

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("mobile-navigation");

            menuButton.classList.toggle("menu-open");

        });


        /* Close menu after clicking a link */

        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove(
                    "mobile-navigation"
                );

                menuButton.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =====================================================
       2. ADD MOBILE MENU CSS THROUGH JS
    ===================================================== */

    const mobileStyles =
        document.createElement("style");

    mobileStyles.innerHTML = `

        .mobile-menu-button {
            display: none;
            width: 42px;
            height: 42px;
            border: 1px solid rgba(7, 26, 47, 0.15);
            background: transparent;
            border-radius: 4px;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
        }

        .mobile-menu-button span {
            width: 20px;
            height: 2px;
            background: #071a2f;
            transition: 0.3s ease;
        }

        @media (max-width: 760px) {

            .mobile-menu-button {
                display: flex;
            }

            .main-navigation.mobile-navigation {
                display: flex;
                position: absolute;
                left: 15px;
                right: 15px;
                top: 72px;
                padding: 20px;
                flex-direction: column;
                align-items: stretch;
                gap: 8px;
                background: #ffffff;
                box-shadow: 0 20px 50px rgba(7, 26, 47, 0.15);
                border: 1px solid rgba(7, 26, 47, 0.08);
                border-radius: 8px;
            }

            .main-navigation.mobile-navigation > a {
                padding: 13px 10px !important;
            }

            .main-navigation.mobile-navigation
            .navigation-button {
                text-align: center;
            }

            .mobile-menu-button.menu-open
            span:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }

            .mobile-menu-button.menu-open
            span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-button.menu-open
            span:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }
        }
    `;

    document.head.appendChild(mobileStyles);


    /* =====================================================
       3. HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader =
        document.querySelector(".site-header");

    function updateHeader() {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 50) {

            siteHeader.classList.add(
                "header-scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "header-scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       4. HEADER SCROLL CSS
    ===================================================== */

    const headerScrollStyles =
        document.createElement("style");

    headerScrollStyles.innerHTML = `

        .site-header {
            transition:
                background 0.3s ease,
                box-shadow 0.3s ease;
        }

        .site-header.header-scrolled {
            box-shadow:
                0 8px 30px rgba(7, 26, 47, 0.08);
        }

    `;

    document.head.appendChild(headerScrollStyles);


    /* =====================================================
       5. SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       6. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".course-card, " +
            ".article-card, " +
            ".process-item, " +
            ".stat-item, " +
            ".about-heading, " +
            ".about-content, " +
            ".contact-content, " +
            ".consultation-form"
        );


    const revealStyles =
        document.createElement("style");

    revealStyles.innerHTML = `

        .scroll-reveal {
            opacity: 0;
            transform: translateY(35px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

    `;

    document.head.appendChild(revealStyles);


    revealElements.forEach(function (element) {

        element.classList.add(
            "scroll-reveal"
        );

    });


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       7. STATISTICS COUNTER
    ===================================================== */

    const statNumbers =
        document.querySelectorAll(
            ".stat-item strong"
        );


    function animateCounter(element) {

        const originalText =
            element.textContent.trim();

        const number =
            parseInt(
                originalText.replace(/\D/g, ""),
                10
            );

        if (isNaN(number)) {
            return;
        }

        const suffix =
            originalText.replace(/[0-9]/g, "");

        let current = 0;

        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            current =
                Math.floor(
                    number * easedProgress
                );

            element.textContent =
                current + suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    number + suffix;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    statNumbers.forEach(function (number) {

        counterObserver.observe(number);

    });


    /* =====================================================
       8. ENERGY WHEEL INTERACTION
    ===================================================== */

    const energyWheel =
        document.querySelector(
            ".energy-wheel"
        );


    if (energyWheel) {

        energyWheel.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    energyWheel.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    35;

                const rotateY =
                    (centerX - x) /
                    35;

                energyWheel.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)
                    `;

            }
        );


        energyWheel.addEventListener(
            "mouseleave",
            function () {

                energyWheel.style.transform =
                    `
                    perspective(800px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1)
                    `;

            }
        );


        energyWheel.style.transition =
            "transform 0.25s ease";

    }


    /* =====================================================
       9. SERVICE CARD INTERACTION
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.classList.add(
                    "service-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.classList.remove(
                    "service-active"
                );

            }
        );

    });


    /* =====================================================
       10. CONSULTATION FORM
    ===================================================== */

    const consultationForm =
        document.querySelector(
            ".consultation-form"
        );


    if (consultationForm) {

        consultationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .querySelector("#name")
                        ?.value
                        .trim();


                const phone =
                    document
                        .querySelector("#phone")
                        ?.value
                        .trim();


                const service =
                    document
                        .querySelector("#service")
                        ?.value
                        .trim();


                if (!name || !phone) {

                    showFormMessage(
                        "Please enter your name and phone number.",
                        "error"
                    );

                    return;

                }


                showFormMessage(
                    `Thank you ${name}! Your ${service} consultation request has been received.`,
                    "success"
                );


                consultationForm.reset();

            }
        );

    }


    /* =====================================================
       11. FORM MESSAGE
    ===================================================== */

    function showFormMessage(
        message,
        type
    ) {

        let messageBox =
            document.querySelector(
                ".form-message"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "div"
                );

            messageBox.className =
                "form-message";

            consultationForm.prepend(
                messageBox
            );

        }


        messageBox.textContent =
            message;


        messageBox.className =
            `form-message ${type}`;


        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });


        setTimeout(function () {

            messageBox.remove();

        }, 5000);

    }


    /* =====================================================
       12. FORM MESSAGE CSS
    ===================================================== */

    const formMessageStyles =
        document.createElement("style");

    formMessageStyles.innerHTML = `

        .form-message {
            padding: 14px 16px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-size: 13px;
            line-height: 1.5;
        }

        .form-message.success {
            background: #e8f5ed;
            color: #1d6840;
            border: 1px solid #b8ddc7;
        }

        .form-message.error {
            background: #fff0ef;
            color: #a33a31;
            border: 1px solid #efc1bd;
        }

    `;

    document.head.appendChild(
        formMessageStyles
    );


    /* =====================================================
       13. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.main-navigation a[href^="#"]'
        );


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            (siteHeader
                ? siteHeader.offsetHeight
                : 0) +
            100;


        sections.forEach(function (section) {

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove(
                "active-navigation"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active-navigation"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       14. ACTIVE NAV CSS
    ===================================================== */

    const activeNavStyles =
        document.createElement("style");

    activeNavStyles.innerHTML = `

        .main-navigation
        .active-navigation {
            color: #9d7838 !important;
        }

        .main-navigation
        .active-navigation::after {
            width: 100% !important;
        }

    `;

    document.head.appendChild(
        activeNavStyles
    );


    /* =====================================================
       15. CURRENT YEAR
    ===================================================== */

    const footerBottom =
        document.querySelector(
            ".footer-bottom p"
        );


    if (footerBottom) {

        footerBottom.textContent =
            `© ${new Date().getFullYear()} VASTRA. All Rights Reserved.`;

    }


    /* =====================================================
       16. ESC KEY - CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navigation &&
                menuButton
            ) {

                navigation.classList.remove(
                    "mobile-navigation"
                );

                menuButton.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       17. PAGE LOAD
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    const pageLoadStyles =
        document.createElement("style");

    pageLoadStyles.innerHTML = `

        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        body.page-loaded {
            opacity: 1;
        }

    `;

    document.head.appendChild(
        pageLoadStyles
    );

});