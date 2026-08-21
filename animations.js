/* =========================================================
   ТОЧКА ВЫХОДА — ANIMATIONS
   Не меняет цветовую систему сайта.
========================================================= */


/* Плавное появление элементов */

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


/* Мягкое появление справа */

@keyframes fadeRight {
    from {
        opacity: 0;
        transform: translateX(24px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}


/* Плавное движение свечения */

@keyframes floatGlow {
    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(0, 18px, 0);
    }
}


/* Мягкое свечение точки */

@keyframes livePulse {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.45);
        opacity: .55;
    }
}


/* Hero */

.hero-content {
    animation: fadeUp .75s ease both;
}

.hero-card {
    animation: fadeRight .85s ease .08s both;
}

.hero-glow-one {
    animation: floatGlow 8s ease-in-out infinite;
}

.hero-glow-two {
    animation: floatGlow 10s ease-in-out infinite reverse;
}

.live-dot {
    animation: livePulse 2.2s ease-in-out infinite;
}


/* Карточки */

.tool-card,
.country-card,
.knowledge-card,
.calculator-form,
.calculator-result,
.test-box,
.currency-box,
.support-box {
    will-change: transform;
}


/* Более мягкое нажатие */

.btn:active,
.tool-card:active,
.country-open:active,
.answer-button:active {
    transform: scale(.985);
}


/* Модальное окно */

@keyframes modalIn {
    from {
        opacity: 0;
        transform: translateY(18px) scale(.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal:not(.hidden) .modal-card {
    animation: modalIn .25s ease both;
}


/* Появление ответа теста */

.answer-button {
    animation: fadeUp .35s ease both;
}

.answer-button:nth-child(2) {
    animation-delay: .04s;
}

.answer-button:nth-child(3) {
    animation-delay: .08s;
}

.answer-button:nth-child(4) {
    animation-delay: .12s;
}


/* Страны */

.country-card {
    animation: fadeUp .45s ease both;
}


/* Уважение к системной настройке пользователя */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
        scroll-behavior: auto !important;
    }
}
