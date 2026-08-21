/* =========================================================
   ТОЧКА ВЫХОДА — ANIMATIONS
   Не меняет основную цветовую схему.
========================================================= */

html {
    scroll-behavior: smooth;
}

/* ---------- HERO ---------- */

.hero-content {
    animation: heroContentIn .8s ease both;
}

.hero-card {
    animation: heroCardIn .9s .12s ease both;
}

@keyframes heroContentIn {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes heroCardIn {
    from {
        opacity: 0;
        transform: translateY(30px) scale(.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* ---------- GLOW ---------- */

.hero-glow-one {
    animation: glowOne 8s ease-in-out infinite alternate;
}

.hero-glow-two {
    animation: glowTwo 10s ease-in-out infinite alternate;
}

@keyframes glowOne {
    from {
        transform: translate3d(0, 0, 0) scale(1);
    }

    to {
        transform: translate3d(-35px, 25px, 0) scale(1.12);
    }
}

@keyframes glowTwo {
    from {
        transform: translate3d(0, 0, 0) scale(1);
    }

    to {
        transform: translate3d(30px, -25px, 0) scale(1.08);
    }
}

/* ---------- LIVE DOT ---------- */

.live-dot {
    animation: livePulse 2s ease-in-out infinite;
}

@keyframes livePulse {
    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: .45;
        transform: scale(.72);
    }
}

/* ---------- BUTTONS ---------- */

.btn {
    transition:
        transform .22s ease,
        box-shadow .22s ease,
        background-color .22s ease;
}

.btn:hover {
    transform: translateY(-3px);
}

.btn:active {
    transform: translateY(0) scale(.98);
}

.btn-primary:hover {
    box-shadow:
        0 14px 32px rgba(8,127,196,.28);
}

/* ---------- CARDS ---------- */

.tool-card,
.country-card,
.knowledge-card {
    transition:
        transform .25s ease,
        box-shadow .25s ease,
        border-color .25s ease;
}

.tool-card:hover,
.country-card:hover,
.knowledge-card:hover {
    transform: translateY(-5px);
    box-shadow:
        0 18px 45px rgba(30,110,150,.10);
}

/* ---------- ROUTE ---------- */

.route-item {
    transition:
        transform .25s ease,
        background .25s ease;
}

.route-item:hover {
    transform: translateX(5px);
}

.route-item.active {
    animation: routeActive 3s ease-in-out infinite;
}

@keyframes routeActive {
    0%,
    100% {
        box-shadow: 0 0 0 rgba(8,127,196,0);
    }

    50% {
        box-shadow:
            0 0 0 5px rgba(8,127,196,.035);
    }
}

/* ---------- COUNTRY BUTTON ---------- */

.country-open {
    transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;
}

.country-open:hover {
    transform: translateY(-2px);
}

/* ---------- ANSWERS ---------- */

.answer-button {
    transition:
        transform .2s ease,
        border-color .2s ease,
        background .2s ease,
        box-shadow .2s ease;
}

.answer-button:hover {
    box-shadow:
        0 8px 20px rgba(8,127,196,.08);
}

/* ---------- INPUTS ---------- */

input,
select {
    transition:
        border-color .2s ease,
        box-shadow .2s ease;
}

input:focus,
select:focus {
    border-color: #74c4e8 !important;

    box-shadow:
        0 0 0 4px rgba(8,127,196,.08);
}

/* ---------- MODALS ---------- */

.modal-card {
    animation: modalIn .25s ease both;
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: translateY(18px) scale(.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* ---------- SCROLL REVEAL ---------- */

@media (prefers-reduced-motion: no-preference) {

    .section-heading,
    .tool-card,
    .country-card,
    .calculator,
    .test-box,
    .knowledge-card,
    .currency-box,
    .support-box {
        animation: softAppear .65s ease both;
    }
}

@keyframes softAppear {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ---------- MOBILE ---------- */

@media (max-width: 700px) {

    .hero-content,
    .hero-card {
        animation-duration: .6s;
    }

    .tool-card:hover,
    .country-card:hover,
    .knowledge-card:hover {
        transform: translateY(-2px);
    }
}

/* ---------- ACCESSIBILITY ---------- */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: .01ms !important;
    }
}
