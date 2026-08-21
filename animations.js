.reveal {
    opacity: 0;
    transform: translateY(25px);

    transition:
        opacity 0.8s ease,
        transform 0.8s ease;
}


.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}


/* Плавное движение самолётика */

.plane {
    animation:
        planeFloat 3s ease-in-out infinite,
        planeFlight 7s ease-in-out infinite;
}


@keyframes planeFloat {

    0%,
    100% {
        transform: translateY(0) rotate(-8deg);
    }

    50% {
        transform: translateY(-8px) rotate(-3deg);
    }

}


@keyframes planeFlight {

    0% {
        left: 48%;
    }

    45% {
        left: 61%;
    }

    70% {
        left: 54%;
    }

    100% {
        left: 48%;
    }

}


/* Точки карты */

.map-dot {
    animation: dotPulse 2.8s ease-in-out infinite;
}


.dot-2 {
    animation-delay: .4s;
}


.dot-3 {
    animation-delay: .8s;
}


.dot-4 {
    animation-delay: 1.2s;
}


.dot-5 {
    animation-delay: 1.6s;
}


@keyframes dotPulse {

    0%,
    100% {
        box-shadow:
            0 0 0 7px rgba(91, 160, 204, 0.13),
            0 0 20px rgba(91, 160, 204, 0.3);
    }

    50% {
        box-shadow:
            0 0 0 13px rgba(91, 160, 204, 0.04),
            0 0 30px rgba(91, 160, 204, 0.4);
    }

}


/* Пунктирный маршрут */

.flight-line {
    animation: routeMove 2s linear infinite;
}


@keyframes routeMove {

    from {
        background-position: 0 0;
    }

    to {
        background-position: 23px 0;
    }

}


/* Лёгкое парение карточек */

.tool-card:nth-child(1) {
    animation-delay: 0s;
}


.tool-card:nth-child(2) {
    animation-delay: .15s;
}


.tool-card:nth-child(3) {
    animation-delay: .3s;
}


/* Modal */

@keyframes modalIn {

    from {
        opacity: 0;
        transform: translateY(20px) scale(.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

}


/* Появление результатов калькулятора */

.result-pop {
    animation: resultPop .4s ease;
}


@keyframes resultPop {

    0% {
        opacity: 0;
        transform: translateY(8px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }

}


/* Пульсация CTA */

.button-primary {
    position: relative;
    overflow: hidden;
}


.button-primary::after {
    content: "";

    position: absolute;

    top: 0;
    left: -120%;

    width: 70%;
    height: 100%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.25),
            transparent
        );

    transform: skewX(-20deg);

    transition: left .7s ease;
}


.button-primary:hover::after {
    left: 150%;
}


/* Уважение к системному reduced motion */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
    }

}
