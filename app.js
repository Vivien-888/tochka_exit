/* =========================================================
   ТОЧКА ВЫХОДА
   Главный JavaScript
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let allCountries = [...fallbackCountries];

let currentQuestion = 0;
let testScore = 0;


/* =========================================================
   HELPERS
========================================================= */

function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0
    }).format(Math.round(value));
}


function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}


/* =========================================================
   COUNTRIES
========================================================= */

async function loadCountries() {

    const grid = document.getElementById("countryGrid");

    try {

        /*
         * Используем внешний источник стран.
         *
         * Если API недоступен, автоматически
         * используем локальную резервную базу.
         */

        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,subregion"
        );

        if (!response.ok) {
            throw new Error("Countries API error");
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Empty countries response");
        }

        allCountries = data
            .map(country => ({
                name:
                    country?.name?.common ||
                    "Неизвестная страна",

                code:
                    country?.cca2 ||
                    "",

                flag:
                    country?.flags?.emoji ||
                    getFlagEmoji(country?.cca2),

                region:
                    country?.region ||
                    "Other",

                meta:
                    country?.subregion ||
                    country?.region ||
                    "—"
            }))
            .sort((a, b) =>
                a.name.localeCompare(
                    b.name,
                    "ru"
                )
            );

        renderCountries();

    } catch (error) {

        console.warn(
            "Не удалось загрузить внешний список стран:",
            error
        );

        allCountries = [...fallbackCountries];

        renderCountries();
    }
}


function getFlagEmoji(countryCode) {

    if (!countryCode || countryCode.length !== 2) {
        return "🌎";
    }

    return countryCode
        .toUpperCase()
        .split("")
        .map(char =>
            String.fromCodePoint(
                127397 + char.charCodeAt(0)
            )
        )
        .join("");
}


function renderCountries() {

    const grid = document.getElementById("countryGrid");

    const search =
        document
            .getElementById("countrySearch")
            .value
            .trim()
            .toLowerCase();

    const region =
        document
            .getElementById("regionFilter")
            .value;

    const filtered =
        allCountries.filter(country => {

            const matchesSearch =
                country.name
                    .toLowerCase()
                    .includes(search);

            const matchesRegion =
                region === "all" ||
                country.region === region;

            return matchesSearch && matchesRegion;
        });


    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="loading">
                Ничего не найдено.
            </div>
        `;

        return;
    }


    grid.innerHTML = filtered
        .slice(0, 100)
        .map(country => {

            const flag =
                country.flag ||
                getFlagEmoji(country.code);

            return `
                <article class="country-card">

                    <div class="country-flag">
                        ${escapeHTML(flag)}
                    </div>

                    <h3>
                        ${escapeHTML(country.name)}
                    </h3>

                    <div class="country-meta">
                        ${escapeHTML(country.meta || "—")}
                    </div>

                    <div class="country-tags">

                        <span class="country-tag">
                            🌎 страна
                        </span>

                        <span class="country-tag">
                            📚 база
                        </span>

                        <span class="country-tag">
                            🧭 навигатор
                        </span>

                    </div>

                </article>
            `;
        })
        .join("");
}


/* =========================================================
   CALCULATOR
========================================================= */

function calculateMove() {

    const ticket =
        Number(document.getElementById("ticket").value) || 0;

    const housing =
        Number(document.getElementById("housing").value) || 0;

    const deposit =
        Number(document.getElementById("deposit").value) || 0;

    const documents =
        Number(document.getElementById("documents").value) || 0;

    const insurance =
        Number(document.getElementById("insurance").value) || 0;

    const food =
        Number(document.getElementById("food").value) || 0;

    const transport =
        Number(document.getElementById("transport").value) || 0;

    const reserve =
        Number(document.getElementById("reserve").value) || 0;


    const minimum =
        ticket +
        housing +
        documents +
        food +
        transport;


    const realistic =
        minimum +
        deposit +
        insurance;


    const comfortable =
        realistic +
        reserve;


    document.getElementById(
        "minimumResult"
    ).textContent =
        `$${formatMoney(minimum)}`;


    document.getElementById(
        "realisticResult"
    ).textContent =
        `$${formatMoney(realistic)}`;


    document.getElementById(
        "comfortableResult"
    ).textContent =
        `$${formatMoney(comfortable)}`;
}


/* =========================================================
   TEST
========================================================= */

const testQuestions = [

    {
        question:
            "Что сильнее всего заставляет тебя думать о переезде?",

        answers: [
            {
                text: "Хочу изменить образ жизни",
                score: 2
            },
            {
                text: "Хочу больше возможностей",
                score: 2
            },
            {
                text: "Мне некомфортно оставаться там, где я сейчас",
                score: 3
            },
            {
                text: "Просто интересно, что есть в других странах",
                score: 1
            }
        ]
    },


    {
        question:
            "Есть ли у тебя финансовая подушка?",

        answers: [
            {
                text: "Да, есть запас на несколько месяцев",
                score: 3
            },
            {
                text: "Есть немного денег",
                score: 2
            },
            {
                text: "Почти нет",
                score: 0
            },
            {
                text: "Пока не знаю",
                score: 1
            }
        ]
    },


    {
        question:
            "Есть ли у тебя источник дохода после переезда?",

        answers: [
            {
                text: "Да, удалённая работа или стабильный доход",
                score: 3
            },
            {
                text: "Есть профессия, которую можно искать на месте",
                score: 2
            },
            {
                text: "Пока ничего нет",
                score: 0
            },
            {
                text: "Планирую учиться",
                score: 1
            }
        ]
    },


    {
        question:
            "Как ты относишься к необходимости учить новый язык?",

        answers: [
            {
                text: "Готов активно учить",
                score: 3
            },
            {
                text: "Готов, но мне будет сложно",
                score: 2
            },
            {
                text: "Не хочу учить язык",
                score: 0
            },
            {
                text: "Пока не знаю",
                score: 1
            }
        ]
    },


    {
        question:
            "Насколько ты готов к неопределённости?",

        answers: [
            {
                text: "Готов. Понимаю, что всё не будет идеально",
                score: 3
            },
            {
                text: "Немного боюсь, но хочу попробовать",
                score: 2
            },
            {
                text: "Мне нужна максимальная стабильность",
                score: 1
            },
            {
                text: "Я вообще не представляю, что меня ждёт",
                score: 0
            }
        ]
    },


    {
        question:
            "Есть ли у тебя план действий?",

        answers: [
            {
                text: "Да, примерно понимаю каждый следующий шаг",
                score: 3
            },
            {
                text: "Есть направление, но много неизвестного",
                score: 2
            },
            {
                text: "Есть только желание уехать",
                score: 1
            },
            {
                text: "Пока ничего не планировал",
                score: 0
            }
        ]
    },


    {
        question:
            "Если переезд окажется сложнее, чем ты ожидал, что будешь делать?",

        answers: [
            {
                text: "Буду искать другой вариант",
                score: 3
            },
            {
                text: "Попробую адаптироваться",
                score: 2
            },
            {
                text: "Скорее всего вернусь",
                score: 1
            },
            {
                text: "Я пока не знаю",
                score: 0
            }
        ]
    }

];


function renderQuestion() {

    const question =
        testQuestions[currentQuestion];

    const questionText =
        document.getElementById("questionText");

    const answers =
        document.getElementById("answers");

    const progress =
        document.getElementById("testProgress");

    const progressFill =
        document.getElementById("progressFill");


    questionText.textContent =
        question.question;


    progress.textContent =
        `Вопрос ${currentQuestion + 1} из ${testQuestions.length}`;


    progressFill.style.width =
        `${(
            (currentQuestion + 1) /
            testQuestions.length
        ) * 100}%`;


    answers.innerHTML =
        question.answers
            .map((answer, index) => `
                <button
                    class="answer-button"
                    data-answer="${index}"
                >
                    ${escapeHTML(answer.text)}
                </button>
            `)
            .join("");


    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const answerIndex =
                        Number(
                            button.dataset.answer
                        );

                    testScore +=
                        question.answers[
                            answerIndex
                        ].score;


                    currentQuestion++;


                    if (
                        currentQuestion >=
                        testQuestions.length
                    ) {

                        showTestResult();

                    } else {

                        renderQuestion();
                    }

                }
            );

        });
}


function showTestResult() {

    document
        .getElementById("questionContainer")
        .style.display = "none";


    document
        .getElementById("testResult")
        .classList.remove("hidden");


    let title;
    let text;


    if (testScore >= 18) {

        title =
            "Ты уже довольно близко к реальному планированию.";

        text =
            "У тебя есть несколько сильных факторов для переезда. Следующий шаг — не искать «идеальную страну», а собрать конкретный маршрут: страна → документы → деньги → доход → первые месяцы.";


    } else if (testScore >= 12) {

        title =
            "Переезд может быть реальным, но подготовка важна.";

        text =
            "У тебя есть основания рассматривать переезд, но некоторые элементы пока требуют подготовки. Особенно важно закрыть финансовые, рабочие и документальные вопросы.";


    } else {

        title =
            "Сейчас лучше не торопиться.";

        text =
            "Это не означает «не уезжай». Скорее всего, тебе стоит сначала разобраться с причинами, деньгами, работой или планом. Хорошая эмиграция начинается не с билета, а с подготовки.";

    }


    document.getElementById(
        "testResultTitle"
    ).textContent = title;


    document.getElementById(
        "testResultText"
    ).textContent = text;
}


function restartTest() {

    currentQuestion = 0;
    testScore = 0;


    document
        .getElementById("questionContainer")
        .style.display = "";


    document
        .getElementById("testResult")
        .classList.add("hidden");


    renderQuestion();
}


/* =========================================================
   NEWS — GDELT
========================================================= */

async function loadNews() {

    const grid =
        document.getElementById("newsGrid");

    const status =
        document.getElementById("newsStatus");


    status.textContent =
        "Обновляем ленту...";


    /*
     * GDELT DOC 2.0
     *
     * Ищем темы, которые относятся
     * к эмиграции:
     *
     * immigration
     * visa
     * residence permit
     * citizenship
     * border
     * taxes
     * work
     * education
     * housing
     */

    const query =
        `(immigration OR visa OR "residence permit" OR citizenship OR border OR taxes OR employment OR education OR housing)`;


    const url =
        "https://api.gdeltproject.org/api/v2/doc/doc" +
        `?query=${encodeURIComponent(query)}` +
        "&mode=artlist" +
        "&format=json" +
        "&maxrecords=12" +
        "&timespan=1d" +
        "&sort=datedesc";


    try {

        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                `News API error ${response.status}`
            );
        }


        const data =
            await response.json();


        const articles =
            data.articles || [];


        if (!articles.length) {

            throw new Error(
                "Новости не найдены"
            );
        }


        grid.innerHTML =
            articles
                .slice(0, 9)
                .map(article => {

                    const title =
                        article.title ||
                        "Материал без заголовка";


                    const domain =
                        article.domain ||
                        "Источник";


                    const date =
                        formatNewsDate(
                            article.seendate
                        );


                    const link =
                        article.url ||
                        "#";


                    return `
                        <article class="news-card">

                            <div class="news-source">

                                <span>
                                    📰 ${escapeHTML(domain)}
                                </span>

                                <span>
                                    МЕДИА
                                </span>

                            </div>

                            <h3>
                                ${escapeHTML(title)}
                            </h3>

                            <div class="news-date">
                                ${escapeHTML(date)}
                            </div>

                            <a
                                class="news-link"
                                href="${escapeHTML(link)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Читать первоисточник →
                            </a>

                        </article>
                    `;

                })
                .join("");


        status.textContent =
            `Обновлено: ${new Date().toLocaleString(
                "ru-RU"
            )}`;


    } catch (error) {

        console.error(error);


        grid.innerHTML = `
            <div class="loading">

                Не удалось получить актуальную ленту.

                <br><br>

                Попробуй обновить страницу позже.

            </div>
        `;


        status.textContent =
            "Лента временно недоступна";
    }
}


function formatNewsDate(value) {

    if (!value) {
        return "Дата неизвестна";
    }


    /*
     * GDELT часто использует:
     * YYYYMMDDTHHMMSSZ
     */

    const match =
        String(value)
            .match(
                /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/
            );


    if (!match) {
        return value;
    }


    const [
        ,
        year,
        month,
        day,
        hour,
        minute
    ] = match;


    return `${day}.${month}.${year} ${hour}:${minute}`;
}


/* =========================================================
   CURRENCY — FRANKFURTER
========================================================= */

async function convertCurrency() {

    const amount =
        Number(
            document.getElementById(
                "currencyAmount"
            ).value
        ) || 0;


    const from =
        document.getElementById(
            "currencyFrom"
        ).value;


    const to =
        document.getElementById(
            "currencyTo"
        ).value;


    const result =
        document.getElementById(
            "currencyResult"
        );


    const date =
        document.getElementById(
            "currencyDate"
        );


    if (amount <= 0) {

        result.textContent =
            "Введите сумму";

        return;
    }


    if (from === to) {

        result.textContent =
            `${formatMoney(amount)} ${to}`;

        date.textContent =
            "Одинаковые валюты";

        return;
    }


    result.textContent =
        "Считаем...";


    try {

        const response =
            await fetch(
                `https://api.frankfurter.dev/v2/rate/${from}/${to}`
            );


        if (!response.ok) {
            throw new Error(
                "Currency API error"
            );
        }


        const data =
            await response.json();


        const converted =
            amount * Number(data.rate);


        result.textContent =
            `${formatMoney(converted)} ${to}`;


        date.textContent =
            `Курс: 1 ${from} = ${data.rate} ${to} · дата курса: ${data.date}`;


    } catch (error) {

        console.error(error);

        result.textContent =
            "Не удалось получить курс";

        date.textContent =
            "Попробуйте ещё раз позже.";
    }
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCountries();

        renderQuestion();

        calculateMove();

        loadNews();

        convertCurrency();


        document
            .getElementById("countrySearch")
            .addEventListener(
                "input",
                renderCountries
            );


        document
            .getElementById("regionFilter")
            .addEventListener(
                "change",
                renderCountries
            );


        document
            .getElementById("calculateButton")
            .addEventListener(
                "click",
                calculateMove
            );


        document
            .getElementById("restartTest")
            .addEventListener(
                "click",
                restartTest
            );


        document
            .getElementById("refreshNews")
            .addEventListener(
                "click",
                loadNews
            );


        document
            .getElementById("convertButton")
            .addEventListener(
                "click",
                convertCurrency
            );

    }
);