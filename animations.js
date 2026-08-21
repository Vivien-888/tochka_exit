(function () {

    "use strict";


    /*
     * АНИМАЦИИ ТОЧКИ ВЫХОДА
     *
     * Здесь намеренно нет тяжёлых библиотек.
     * Всё работает на CSS + IntersectionObserver.
     */


    /* REVEAL */

    function initRevealAnimations() {

        const elements =
            document.querySelectorAll(
                ".reveal:not(.reveal-ready)"
            );

        if (!elements.length) return;

        elements.forEach(element => {
            element.classList.add("reveal-ready");
        });

        if (!("IntersectionObserver" in window)) {

            elements.forEach(element => {
                element.classList.add("visible");
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: .08,
                    rootMargin: "0px 0px -30px 0px"
                }
            );

        elements.forEach(element => {
            observer.observe(element);
        });
    }


    /* HEADER */

    function initHeaderAnimation() {

        const header =
            document.getElementById("header");

        if (!header) return;

        const updateHeader = () => {

            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();
    }


    /* MOUSE PARALLAX */

    function initHeroParallax() {

        const hero =
            document.querySelector(".hero");

        const visual =
            document.querySelector(".hero-visual");

        if (!hero || !visual) return;

        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        hero.addEventListener("mousemove", event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;

            visual.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;
        });

        hero.addEventListener("mouseleave", () => {

            visual.style.transform =
                "translate(0,0)";
        });
    }


    /* TILT FOR CARDS */

    function initCardTilt() {

        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        document.addEventListener("mousemove", event => {

            const card =
                event.target.closest(
                    ".quick-card, .country-card, .knowledge-card"
                );

            if (!card) return;

            const rect =
                card.getBoundingClientRect();

            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                return;
            }

            const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;

            card.style.transform =
                `perspective(700px)
                 rotateX(${y * -2}deg)
                 rotateY(${x * 2}deg)
                 translateY(-5px)`;
        });

        document.addEventListener("mouseleave", event => {

            const card =
                event.target.closest(
                    ".quick-card, .country-card, .knowledge-card"
                );

            if (!card) return;

            card.style.transform = "";
        }, true);
    }


    /* MAGNETIC BUTTON */

    function initMagneticButtons() {

        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        document.addEventListener("mousemove", event => {

            const button =
                event.target.closest(".btn-primary");

            if (!button) return;

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;

            const distance =
                Math.sqrt(x * x + y * y);

            if (distance > 90) {

                button.style.transform = "";

                return;
            }

            button.style.transform =
                `translate(${x * .04}px, ${y * .04}px)`;
        });

        document.addEventListener("mouseleave", event => {

            const button =
                event.target.closest(".btn-primary");

            if (button) {
                button.style.transform = "";
            }

        }, true);
    }


    /* SCROLL PROGRESS */

    function initScrollProgress() {

        const progress =
            document.createElement("div");

        progress.className =
            "scroll-progress";

        progress.style.cssText = `
            position:fixed;
            top:0;
            left:0;
            width:0;
            height:2px;
            background:#477c65;
            z-index:3000;
            pointer-events:none;
            transition:width .08s linear;
        `;

        document.body.appendChild(progress);

        window.addEventListener(
            "scroll",
            () => {

                const scrollTop =
                    window.scrollY;

                const height =
                    document.documentElement.scrollHeight -
                    window.innerHeight;

                const percent =
                    height > 0
                        ? (scrollTop / height) * 100
                        : 0;

                progress.style.width =
                    `${percent}%`;

            },
            { passive: true }
        );
    }


    /* REDUCE MOTION */

    function respectReducedMotion() {

        const reduced =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (!reduced) return;

        const style =
            document.createElement("style");

        style.textContent = `
            *,
            *::before,
            *::after {
                animation-duration: .01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: .01ms !important;
                scroll-behavior: auto !important;
            }
        `;

        document.head.appendChild(style);
    }


    /* INITIALIZE */

    function initAll() {

        respectReducedMotion();

        initHeaderAnimation();
        initHeroParallax();
        initCardTilt();
        initMagneticButtons();
        initScrollProgress();

        initRevealAnimations();

        window.initRevealAnimations =
            initRevealAnimations;
    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initAll
        );

    } else {

        initAll();

    }

})();