/*
    ==========================================
    МОБИЛЬНОЕ МЕНЮ
    ==========================================
    */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
            });

        });

    }


    /*
    ==========================================
    АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ
    ==========================================
    */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /*
    ==========================================
    СТРАНЫ
    ==========================================
    */

    const countriesGrid =
        document.getElementById("countriesGrid");

    const countrySearch =
        document.getElementById("countrySearch");

    const countryRegion =
        document.getElementById("countryRegion");

    const countryEmpty =
        document.getElementById("countryEmpty");


    function renderCountries() {

        if (!countriesGrid) {
            return;
        }

        const search =
            (countrySearch?.value || "")
                .trim()
                .toLowerCase();

        const region =
            countryRegion?.value || "all";


        const filtered =
            countries.filter(country => {

                const matchesSearch =
                    country.name
                        .toLowerCase()
                        .includes(search) ||

                    country.description
                        .toLowerCase()
                        .includes(search) ||

                    country.tags.some(tag =>
                        tag.toLowerCase().includes(search)
                    );


                const matchesRegion =
                    region === "all" ||
                    country.region === region;


                return matchesSearch && matchesRegion;

            });


        countriesGrid.innerHTML = "";


        filtered.forEach((country, index) => {

            const card =
                document.createElement("article");

            card.className =
                "country-card country-enter";

            card.style.animationDelay =
                `${index * 45}ms`;


            card.innerHTML = `

                <div class="country-top">

                    <span class="country-flag">
                        ${country.flag}
                    </span>

                    <span class="country-region">
                        ${country.regionName}
                    </span>

                </div>

                <h3>
                    ${country.name}
                </h3>

                <p>
                    ${country.description}
                </p>

                <div class="country-tags">

                    ${country.tags
                        .map(tag =>
                            `<span class="country-tag">
                                ${tag}
                             </span>`
                        )
                        .join("")
                    }

                </div>
            `;


            countriesGrid.appendChild(card);

        });


        if (countryEmpty) {

            countryEmpty.classList.toggle(
                "hidden",
                filtered.length !== 0
            );

        }

    }


    if (countrySearch) {
        countrySearch.addEventListener(
            "input",
            renderCountries
        );
    }


    if (countryRegion) {
        countryRegion.addEventListener(
            "change",
            renderCountries
        );
    }


    renderCountries();


    /*
    ==========================================
    КАЛЬКУЛЯТОР
    ==========================================
    */

    const calculateButton =
        document.getElementById("calculateButton");


    function value(id) {

        const element =
            document.getElementById(id);

        if (!element) {
            return 0;
        }

        return Math.max(
            0,
            Number(element.value) || 0
        );

    }


    function formatUSD(number) {

        return "$" +
            Math.round(number)
                .toLocaleString("en-US");

    }


    function calculateBudget() {

        const total =
            value("ticket") +
            value("housing") +
            value("deposit") +
            value("documents") +
            value("insurance") +
            value("food") +
            value("transport") +
            value("reserve");


        const minimum =
            Math.round(total * 0.75);

        const realistic =
            Math.round(total);

        const comfortable =
            Math.round(total * 1.35);


        const minimumResult =
            document.getElementById(
                "minimumResult"
            );

        const realisticResult =
            document.getElementById(
                "realisticResult"
            );

        const comfortableResult =
            document.getElementById(
                "comfortableResult"
            );


        if (minimumResult) {

            minimumResult.textContent =
                formatUSD(minimum);

            minimumResult.classList.remove(
                "result-pop"
            );

            void minimumResult.offsetWidth;

            minimumResult.classList.add(
                "result-pop"
            );

        }


        if (realisticResult) {

            realisticResult.textContent =
                formatUSD(realistic);

            realisticResult.classList.remove(
                "result-pop"
            );

            void realisticResult.offsetWidth;

            realisticResult.classList.add(
                "result-pop"
            );

        }


        if (comfortableResult) {

            comfortableResult.textContent =
                formatUSD(comfortable);

            comfortableResult.classList.remove(
                "result-pop"
            );

            void comfortableResult.offsetWidth;

            comfortableResult.classList.add(
                "result-pop"
            );

        }

    }


    if (calculateButton) {

        calculateButton.addEventListener(
            "click",
            calculateBudget
        );

    }


    document
        .querySelectorAll(
            "#calculator input"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                calculateBudget
            );

        });


    calculateBudget();


    /*
    ==========================================
    ТЕСТ
    ==========================================
    */

    const testQuestions = [

        {
            question:
                "Если бы финансовый вопрос был решён, ты бы хотел переехать?",

            answers: [
                {
                    text: "Да, я давно об этом думаю.",
                    score: 3
                },
                {
                    text: "Скорее да, но есть сомнения.",
                    score: 2
                },
                {
                    text: "Не уверен.",
                    score: 1
                },
                {
                    text: "Нет.",
                    score: 0
                }
            ]
        },

        {
            question:
                "Есть ли у тебя причина, из-за которой ты рассматриваешь переезд?",

            answers: [
                {
                    text: "Да, причина очень серьёзная.",
                    score: 3
                },
                {
                    text: "Есть несколько причин.",
                    score: 2
                },
                {
                    text: "Просто хочется попробовать.",
                    score: 1
                },
                {
                    text: "Особой причины нет.",
                    score: 0
                }
            ]
        },

        {
            question:
                "Готов ли ты некоторое время жить в новой стране без привычного окружения?",

            answers: [
                {
                    text: "Да, я готов к этому.",
                    score: 3
                },
                {
                    text: "Думаю, справлюсь.",
                    score: 2
                },
                {
                    text: "Мне будет сложно.",
                    score: 1
                },
                {
                    text: "Нет.",
                    score: 0
                }
            ]
        },

        {
            question:
                "Есть ли у тебя источник дохода или план его найти?",

            answers: [
                {
                    text: "Да, доход уже есть.",
                    score: 3
                },
                {
                    text: "Есть план.",
                    score: 2
                },
                {
                    text: "Пока ищу варианты.",
                    score: 1
                },
                {
                    text: "Нет.",
                    score: 0
                }
            ]
        },

        {
            question:
                "Готов ли ты заниматься документами и бюрократией?",

            answers: [
                {
                    text: "Да, разберусь.",
                    score: 3
                },
                {
                    text: "Если надо — буду.",
                    score: 2
                },
                {
                    text: "Не люблю такое.",
                    score: 1
                },
                {
                    text: "Совсем не хочу.",
                    score: 0
                }
            ]
        },

        {
            question:
                "Готов ли ты принять, что первые месяцы могут быть непростыми?",

            answers: [
                {
                    text: "Да. Я понимаю это.",
                    score: 3
                },
                {
                    text: "Скорее да.",
                    score: 2
                },
                {
                    text: "Не знаю.",
                    score: 1
                },
                {
                    text: "Нет, хочу чтобы всё сразу было идеально.",
                    score: 0
                }
            ]
        },

        {
            question:
                "Если подходящая страна найдётся, готов ли ты начать подготовку?",

            answers: [
                {
                    text: "Да. Хочу начать.",
                    score: 3
                },
                {
                    text: "Скорее да.",
                    score: 2
                },
                {
                    text: "Пока просто изучаю.",
                    score: 1
                },
                {
                    text: "Нет.",
                    score: 0
                }
            ]
        }

    ];


    const testQuestion =
        document.getElementById(
            "testQuestion"
        );

    const testAnswers =
        document.getElementById(
            "testAnswers"
        );

    const testNextButton =
        document.getElementById(
            "testNextButton"
        );

    const testProgress =
        document.getElementById(
            "testProgress"
        );

    const testProgressText =
        document.getElementById(
            "testProgressText"
        );

    const testQuestionNumber =
        document.getElementById(
            "testQuestionNumber"
        );

    const testResult =
        document.getElementById(
            "testResult"
        );

    const testResultEmoji =
        document.getElementById(
            "testResultEmoji"
        );

    const testResultTitle =
        document.getElementById(
            "testResultTitle"
        );

    const testResultText =
        document.getElementById(
            "testResultText"
        );

    const restartTest =
        document.getElementById(
            "restartTest"
        );


    let currentQuestion = 0;
    let selectedScore = null;
    let totalScore = 0;


    function renderQuestion() {

        if (
            !testQuestion ||
            !testAnswers
        ) {
            return;
        }


        const question =
            testQuestions[currentQuestion];


        selectedScore = null;

        if (testNextButton) {
            testNextButton.disabled = true;
        }


        testQuestion.innerHTML =
            question.question;


        testAnswers.innerHTML = "";


        question.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "answer-button";

                button.type =
                    "button";

                button.textContent =
                    answer.text;


                button.addEventListener(
                    "click",
                    () => {

                        testAnswers
                            .querySelectorAll(
                                ".answer-button"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "selected"
                                    )
                            );


                        button.classList.add(
                            "selected"
                        );


                        selectedScore =
                            answer.score;


                        if (testNextButton) {
                            testNextButton.disabled =
                                false;
                        }

                    }
                );


                testAnswers.appendChild(
                    button
                );

            }
        );


        const questionNumber =
            currentQuestion + 1;


        if (testProgressText) {

            testProgressText.textContent =
                `Вопрос ${questionNumber} из ${testQuestions.length}`;

        }


        if (testQuestionNumber) {

            testQuestionNumber.textContent =
                String(questionNumber)
                    .padStart(2, "0");

        }


        if (testProgress) {

            testProgress.style.width =
                `${(
                    questionNumber /
                    testQuestions.length
                ) * 100}%`;

        }

    }


    function showTestResult() {

        const maxScore =
            testQuestions.length * 3;


        const percentage =
            totalScore / maxScore;


        let emoji;
        let title;
        let text;


        if (percentage >= 0.75) {

            emoji = "🧭";

            title =
                "Похоже, ты действительно готов рассматривать переезд.";

            text =
                "У тебя достаточно сильная мотивация и готовность заниматься практической частью. Следующий шаг — подобрать страны, посчитать бюджет и составить конкретный план.";

        } else if (percentage >= 0.45) {

            emoji = "🌿";

            title =
                "Тебе стоит рассмотреть переезд спокойнее.";

            text =
                "Похоже, интерес есть, но некоторые вопросы пока требуют ответа. Не обязательно принимать решение сейчас. Сначала изучи направления, деньги, документы и варианты дохода.";

        } else {

            emoji = "🫧";

            title =
                "Сейчас тебе, возможно, не стоит торопиться.";

            text =
                "Результат не означает «не уезжай». Возможно, тебе сначала нужно решить несколько вопросов дома: деньги, работа, мотивация или понимание того, куда именно ты хочешь двигаться.";

        }


        if (testResultEmoji) {
            testResultEmoji.textContent = emoji;
        }


        if (testResultTitle) {
            testResultTitle.textContent = title;
        }


        if (testResultText) {
            testResultText.textContent = text;
        }


        document
            .querySelector(".test-card")
            ?.classList.add("hidden");


        testResult?.classList.remove(
            "hidden"
        );


        testResult?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    if (testNextButton) {

        testNextButton.addEventListener(
            "click",
            () => {

                if (selectedScore === null) {
                    return;
                }


                totalScore += selectedScore;


                if (
                    currentQuestion <
                    testQuestions.length - 1
                ) {

                    currentQuestion++;

                    renderQuestion();

                } else {

                    showTestResult();

                }

            }
        );

    }


    if (restartTest) {

        restartTest.addEventListener(
            "click",
            () => {

                currentQuestion = 0;
                totalScore = 0;
                selectedScore = null;


                testResult?.classList.add(
                    "hidden"
                );


                document
                    .querySelector(".test-card")
                    ?.classList.remove("hidden");


                renderQuestion();

            }
        );

    }


    renderQuestion();


    /*
    ==========================================
    БАЗА ЗНАНИЙ
    ==========================================
    */

    const knowledgeData = {

        documents: {

            icon: "📄",

            title: "Документы",

            content: `
                <p>
                    Подготовка документов — одна из первых
                    задач перед международным переездом.
                </p>

                <ul>
                    <li>Проверь срок действия паспорта.</li>
                    <li>Сделай цифровые копии важных документов.</li>
                    <li>Проверь требования конкретной страны.</li>
                    <li>Уточни необходимость переводов.</li>
                    <li>Проверь требования к апостилю или легализации.</li>
                    <li>Отдельно проверь визовые документы.</li>
                </ul>
            `

        },


        work: {

            icon: "💼",

            title: "Работа",

            content: `
                <p>
                    До переезда желательно понимать,
                    на что ты будешь жить после приезда.
                </p>

                <ul>
                    <li>Удалённая работа.</li>
                    <li>Местный работодатель.</li>
                    <li>Фриланс.</li>
                    <li>Собственный проект или бизнес.</li>
                    <li>Финансовый резерв на первые месяцы.</li>
                </ul>
            `

        },


        study: {

            icon: "🎓",

            title: "Учёба",

            content: `
                <p>
                    Учёба может быть отдельным основанием
                    для переезда и способом адаптации.
                </p>

                <ul>
                    <li>Университеты.</li>
                    <li>Языковые курсы.</li>
                    <li>Профессиональные программы.</li>
                    <li>Стипендии.</li>
                    <li>Подтверждение образования.</li>
                </ul>
            `

        },


        housing: {

            icon: "🏠",

            title: "Жильё",

            content: `
                <p>
                    Первое жильё лучше рассматривать отдельно
                    от долгосрочной аренды.
                </p>

                <ul>
                    <li>Заранее изучи районы.</li>
                    <li>Посчитай депозит.</li>
                    <li>Проверь условия договора.</li>
                    <li>Уточни коммунальные платежи.</li>
                    <li>Не отправляй деньги незнакомым людям без проверки.</li>
                </ul>
            `

        },


        things: {

            icon: "🎒",

            title: "Что взять",

            content: `
                <p>
                    Главное правило — не перевозить половину дома.
                </p>

                <ul>
                    <li>Паспорт и документы.</li>
                    <li>Телефон и зарядки.</li>
                    <li>Ноутбук, если нужен для работы.</li>
                    <li>Базовую аптечку.</li>
                    <li>Одежду по климату.</li>
                    <li>Резервные копии важных файлов.</li>
                </ul>
            `

        },


        rules: {

            icon: "🚨",

            title: "Можно и нельзя",

            content: `
                <p>
                    Правила отличаются от страны к стране.
                    Всегда проверяй актуальную информацию.
                </p>

                <ul>
                    <li>Миграционные правила.</li>
                    <li>Сроки пребывания.</li>
                    <li>Правила регистрации.</li>
                    <li>Налоговые обязанности.</li>
                    <li>Правила работы иностранцев.</li>
                    <li>Местные ограничения.</li>
                </ul>
            `

        }

    };


    const modal =
        document.getElementById(
            "knowledgeModal"
        );

    const modalOverlay =
        document.getElementById(
            "modalOverlay"
        );

    const closeModal =
        document.getElementById(
            "closeModal"
        );

    const modalIcon =
        document.getElementById(
            "modalIcon"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalContent =
        document.getElementById(
            "modalContent"
        );


    function openKnowledge(topic) {

        const data =
            knowledgeData[topic];


        if (!data) {
            return;
        }


        if (modalIcon) {
            modalIcon.textContent =
                data.icon;
        }


        if (modalTitle) {
            modalTitle.textContent =
                data.title;
        }


        if (modalContent) {
            modalContent.innerHTML =
                data.content;
        }


        modal?.classList.remove(
            "hidden"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeKnowledge() {

        modal?.classList.add(
            "hidden"
        );

        document.body.style.overflow =
            "";

    }


    document
        .querySelectorAll(
            ".knowledge-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openKnowledge(
                        button.dataset.topic
                    );

                }
            );

        });


    closeModal?.addEventListener(
        "click",
        closeKnowledge
    );


    modalOverlay?.addEventListener(
        "click",
        closeKnowledge
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeKnowledge();
            }

        }
    );


    /*
    ==========================================
    КОНВЕРТЕР ВАЛЮТ
    ==========================================
    */

    const converterAmount =
        document.getElementById(
            "converterAmount"
        );

    const converterFrom =
        document.getElementById(
            "converterFrom"
        );

    const converterTo =
        document.getElementById(
            "converterTo"
        );

    const convertButton =
        document.getElementById(
            "convertButton"
        );

    const converterResult =
        document.getElementById(
            "converterResult"
        );


    async function convertCurrency() {

        const amount =
            Number(
                converterAmount?.value
            ) || 0;


        const from =
            converterFrom?.value;

        const to =
            converterTo?.value;


        if (!from || !to) {
            return;
        }


        if (from === to) {

            if (converterResult) {

                converterResult.textContent =
                    `${amount.toLocaleString(
                        "en-US"
                    )} ${from} = ${amount.toLocaleString(
                        "en-US"
                    )} ${to}`;

            }

            return;

        }


        if (converterResult) {

            converterResult.textContent =
                "Получаем актуальный курс…";

        }


        try {

            const response =
                await fetch(
                    `https://api.frankfurter.app/latest?amount=${encodeURIComponent(
                        amount
                    )}&from=${encodeURIComponent(
                        from
                    )}&to=${encodeURIComponent(
                        to
                    )}`
                );


            if (!response.ok) {
                throw new Error(
                    "Currency API error"
                );
            }


            const data =
                await response.json();


            const converted =
                data.rates?.[to];


            if (
                typeof converted !==
                "number"
            ) {
                throw new Error(
                    "No rate"
                );
            }


            if (converterResult) {

                converterResult.textContent =
                    `${amount.toLocaleString(
                        "en-US"
                    )} ${from} ≈ ${converted.toLocaleString(
                        "en-US",
                        {
                            maximumFractionDigits: 2
                        }
                    )} ${to}`;

            }


        } catch (error) {

            if (converterResult) {

                converterResult.textContent =
                    "Не удалось получить курс. Попробуй ещё раз.";

            }

        }

    }


    convertButton?.addEventListener(
        "click",
        convertCurrency
    );


    /*
    ==========================================
    ПЛАВНАЯ НАВИГАЦИЯ
    ==========================================
    */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /*
    ==========================================
    ЗАПУСК
    ==========================================
    */

    console.log(
        "Точка выхода: система загружена."
    );

});
