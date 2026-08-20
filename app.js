/* =========================================================
   COUNTRY SYSTEM
========================================================= */

const countryGrid = document.getElementById("countryGrid");
const countrySearch = document.getElementById("countrySearch");
const regionFilter = document.getElementById("regionFilter");

function renderCountries() {

    const search = countrySearch.value
        .trim()
        .toLowerCase();

    const region = regionFilter.value;

    const filtered = countries.filter(country => {

        const matchesSearch =
            country.name.toLowerCase().includes(search) ||
            country.capital.toLowerCase().includes(search) ||
            country.language.toLowerCase().includes(search) ||
            country.currency.toLowerCase().includes(search);

        const matchesRegion =
            region === "all" ||
            country.region === region;

        return matchesSearch && matchesRegion;
    });

    if (!filtered.length) {

        countryGrid.innerHTML = `
            <div class="loading">
                Ничего не найдено.
            </div>
        `;

        return;
    }

    countryGrid.innerHTML = filtered.map(country => `

        <article class="country-card">

            <div class="country-flag">
                ${country.flag}
            </div>

            <h3>
                ${country.name}
            </h3>

            <div class="country-meta">
                ${country.capital} · ${country.currency}
            </div>

            <div class="country-tags">

                ${country.tags.map(tag => `
                    <span class="country-tag">
                        ${tag}
                    </span>
                `).join("")}

            </div>

            <button
                class="country-open"
                data-country="${country.id}"
            >
                Подробнее о стране →
            </button>

        </article>

    `).join("");

    document
        .querySelectorAll(".country-open")
        .forEach(button => {

            button.addEventListener("click", () => {

                const country = countries.find(
                    item => item.id === button.dataset.country
                );

                openCountryModal(country);
            });

        });
}


countrySearch.addEventListener(
    "input",
    renderCountries
);

regionFilter.addEventListener(
    "change",
    renderCountries
);

renderCountries();


/* =========================================================
   COUNTRY MODAL
========================================================= */

function openCountryModal(country) {

    const modal = document.getElementById("knowledgeModal");

    const title =
        document.getElementById("knowledgeModalTitle");

    const content =
        document.getElementById("knowledgeModalContent");

    title.innerHTML = "";

    content.innerHTML = `

        <div class="country-detail">

            <div class="country-detail-flag">
                ${country.flag}
            </div>

            <h3>
                ${country.name}
            </h3>

            <p>
                ${country.description}
            </p>

            <div class="country-detail-grid">

                <div class="detail-item">
                    <strong>СТОЛИЦА</strong>
                    <span>${country.capital}</span>
                </div>

                <div class="detail-item">
                    <strong>ВАЛЮТА</strong>
                    <span>${country.currency}</span>
                </div>

                <div class="detail-item">
                    <strong>ЯЗЫК</strong>
                    <span>${country.language}</span>
                </div>

                <div class="detail-item">
                    <strong>КЛИМАТ</strong>
                    <span>${country.climate}</span>
                </div>

            </div>

            <div class="country-more-note">

                <h4>Что здесь появится дальше</h4>

                <p>
                    Полная страница страны:
                    документы, визы, стоимость жизни,
                    жильё, работа, учёба, безопасность,
                    города, достопримечательности,
                    полезные сайты и реальные особенности
                    переезда.
                </p>

            </div>

        </div>
    `;

    modal.classList.remove("hidden");
}


/* =========================================================
   CALCULATOR
========================================================= */

const calculateButton =
    document.getElementById("calculateButton");

calculateButton.addEventListener("click", calculateBudget);

function value(id) {

    const element =
        document.getElementById(id);

    return Math.max(
        0,
        Number(element.value) || 0
    );
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

    document.getElementById("minimumResult")
        .textContent =
        "$" + minimum.toLocaleString("en-US");

    document.getElementById("realisticResult")
        .textContent =
        "$" + realistic.toLocaleString("en-US");

    document.getElementById("comfortableResult")
        .textContent =
        "$" + comfortable.toLocaleString("en-US");
}

calculateBudget();


/* =========================================================
   TEST
========================================================= */

const questions = [

    {
        question:
            "Что сильнее всего заставляет тебя думать о переезде?",

        answers: [
            "Хочу изменить образ жизни",
            "Не чувствую себя комфортно там, где живу",
            "Хочу учиться или работать за границей",
            "Просто рассматриваю варианты"
        ]
    },

    {
        question:
            "Есть ли у тебя финансовая подушка?",

        answers: [
            "Да, на несколько месяцев",
            "Есть немного",
            "Почти нет",
            "Пока вообще нет"
        ]
    },

    {
        question:
            "Готов ли ты изучать язык страны?",

        answers: [
            "Да, без проблем",
            "Если понадобится",
            "Не очень хочу",
            "Только английский"
        ]
    },

    {
        question:
            "Есть ли у тебя профессия или источник дохода?",

        answers: [
            "Да, стабильный",
            "Есть навыки",
            "Пока ищу себя",
            "Нет"
        ]
    },

    {
        question:
            "Насколько ты готов к бюрократии?",

        answers: [
            "Готов разбираться",
            "Если будет понятная инструкция",
            "Не люблю документы",
            "Это меня пугает"
        ]
    },

    {
        question:
            "Что для тебя важнее всего в новой стране?",

        answers: [
            "Безопасность",
            "Деньги и работа",
            "Климат и образ жизни",
            "Учёба и развитие"
        ]
    },

    {
        question:
            "Насколько ты уверен в решении?",

        answers: [
            "Хочу уехать как можно скорее",
            "Скорее да",
            "Пока сомневаюсь",
            "Я вообще не уверен"
        ]
    }

];

let currentQuestion = 0;
let testScore = 0;

function renderQuestion() {

    const question =
        questions[currentQuestion];

    document.getElementById("questionText")
        .textContent = question.question;

    document.getElementById("testProgress")
        .textContent =
        `Вопрос ${currentQuestion + 1} из ${questions.length}`;

    document.getElementById("progressFill")
        .style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    const answers =
        document.getElementById("answers");

    answers.innerHTML =
        question.answers.map(
            (answer, index) => `

                <button
                    class="answer-button"
                    data-answer="${index}"
                >
                    ${answer}
                </button>

            `
        ).join("");

    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    testScore +=
                        Number(button.dataset.answer);

                    nextQuestion();
                }
            );

        });
}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showTestResult();

        return;
    }

    renderQuestion();
}

function showTestResult() {

    document
        .getElementById("questionContainer")
        .classList.add("hidden");

    document
        .getElementById("testResult")
        .classList.remove("hidden");

    let title;
    let text;

    if (testScore <= 7) {

        title = "Сначала подготовь почву";

        text =
            "Переезд может быть возможен, но сейчас лучше сначала разобраться с деньгами, документами и источником дохода.";

    } else if (testScore <= 14) {

        title = "Тебе стоит изучить варианты";

        text =
            "Похоже, у тебя уже есть некоторые основания рассматривать переезд. Не торопись — сначала сравни страны и условия.";

    } else {

        title = "У тебя есть сильная мотивация";

        text =
            "Похоже, ты достаточно серьёзно рассматриваешь переезд. Следующий шаг — выбрать направление и составить реальный план.";

    }

    document.getElementById("testResultTitle")
        .textContent = title;

    document.getElementById("testResultText")
        .textContent = text;
}

document
    .getElementById("restartTest")
    .addEventListener("click", () => {

        currentQuestion = 0;
        testScore = 0;

        document
            .getElementById("testResult")
            .classList.add("hidden");

        document
            .getElementById("questionContainer")
            .classList.remove("hidden");

        renderQuestion();
    });

renderQuestion();


/* =========================================================
   INFO MODALS
========================================================= */

const infoModal =
    document.getElementById("infoModal");

const modalText =
    document.getElementById("modalText");

const modalTitle =
    document.getElementById("modalTitle");

document
    .querySelectorAll(".info-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            modalTitle.textContent =
                "Что это значит?";

            modalText.textContent =
                button.dataset.info;

            infoModal.classList.remove("hidden");
        });

    });

document
    .getElementById("closeModal")
    .addEventListener("click", () => {

        infoModal.classList.add("hidden");
    });


/* =========================================================
   KNOWLEDGE MODALS
========================================================= */

const knowledgeData = {

    documents: {
        title: "Документы",
        html: `
            <div class="knowledge-modal-content">

                <p>
                    Документы зависят от страны, цели поездки
                    и твоего статуса.
                </p>

                <h4>Основное</h4>

                <ul>
                    <li><strong>Паспорт</strong> — основной документ для поездки.</li>
                    <li>Виза или другое основание для въезда.</li>
                    <li>Подтверждение проживания.</li>
                    <li>Финансовые документы — если их требует страна.</li>
                    <li>Медицинские документы — если требуются.</li>
                </ul>

                <h4>Апостиль</h4>

                <p>
                    Апостиль — специальное подтверждение
                    подлинности документа для использования
                    в другой стране в случаях, когда между странами
                    действует соответствующий порядок.
                </p>

                <h4>Доверенность</h4>

                <p>
                    Доверенность позволяет одному человеку
                    официально действовать от имени другого
                    в пределах предоставленных полномочий.
                </p>

                <p>
                    Для конкретной страны всегда нужно проверять,
                    нужна ли нотариальная форма, перевод,
                    легализация или апостиль.
                </p>

            </div>
        `
    },

    work: {
        title: "Работа",
        html: `
            <div class="knowledge-modal-content">

                <p>
                    Работа за границей может быть локальной,
                    удалённой, сезонной или связанной с учёбой.
                </p>

                <h4>Перед поиском</h4>

                <ul>
                    <li>Проверь право на работу.</li>
                    <li>Подготовь CV.</li>
                    <li>Определи нужный язык.</li>
                    <li>Изучи местные сайты вакансий.</li>
                </ul>

            </div>
        `
    },

    study: {
        title: "Учёба",
        html: `
            <div class="knowledge-modal-content">

                <p>
                    Для поступления могут понадобиться
                    документы об образовании, переводы
                    и подтверждение их подлинности.
                </p>

                <h4>Что проверить</h4>

                <ul>
                    <li>Требования университета.</li>
                    <li>Язык обучения.</li>
                    <li>Признание предыдущего образования.</li>
                    <li>Перевод документов.</li>
                    <li>Финансовые требования.</li>
                </ul>

            </div>
        `
    },

    housing: {
        title: "Жильё",
        html: `
            <div class="knowledge-modal-content">

                <p>
                    Перед арендой важно проверить договор,
                    депозит, коммунальные расходы и условия
                    досрочного расторжения.
                </p>

            </div>
        `
    },

    packing: {
        title: "Что взять с собой",
        html: `
            <div class="knowledge-modal-content">

                <h4>Не забудь проверить</h4>

                <ul>
                    <li>Паспорт и копии.</li>
                    <li>Документы об образовании.</li>
                    <li>Медицинские документы.</li>
                    <li>Банковские документы.</li>
                    <li>Телефон и зарядку.</li>
                    <li>Необходимую одежду.</li>
                </ul>

            </div>
        `
    },

    rules: {
        title: "Можно и нельзя",
        html: `
            <div class="knowledge-modal-content">

                <p>
                    У каждой страны есть собственные
                    правила ввоза вещей, лекарства,
                    валюты и других предметов.
                </p>

                <h4>Непредвиденные ситуации</h4>

                <p>
                    Здесь мы постепенно соберём инструкции:
                    потеря паспорта, проблемы на границе,
                    потеря денег, медицинские ситуации,
                    контакт с консульством и другие случаи.
                </p>

                <h4>Важно</h4>

                <p>
                    Конкретные запреты нужно проверять
                    по официальным источникам страны.
                </p>

            </div>
        `
    }

};

document
    .querySelectorAll(".knowledge-open")
    .forEach(button => {

        button.addEventListener("click", () => {

            const data =
                knowledgeData[button.dataset.knowledge];

            document
                .getElementById("knowledgeModalTitle")
                .textContent = data.title;

            document
                .getElementById("knowledgeModalContent")
                .innerHTML = data.html;

            document
                .getElementById("knowledgeModal")
                .classList.remove("hidden");

        });

    });


document
    .getElementById("closeKnowledgeModal")
    .addEventListener("click", () => {

        document
            .getElementById("knowledgeModal")
            .classList.add("hidden");

    });


/* =========================================================
   CLOSE MODALS BY OVERLAY
========================================================= */

document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener("click", () => {

            overlay
                .closest(".modal")
                .classList.add("hidden");

        });

    });


/* =========================================================
   CURRENCY
========================================================= */

const currencyFrom =
    document.getElementById("currencyFrom");

const currencyTo =
    document.getElementById("currencyTo");

const currencyAmount =
    document.getElementById("currencyAmount");

const currencyResult =
    document.getElementById("currencyResult");

const currencyDate =
    document.getElementById("currencyDate");


const currencyNames = {

    USD: ["🇺🇸", "Доллар США", "$"],
    EUR: ["🇪🇺", "Евро", "€"],
    GBP: ["🇬🇧", "Фунт стерлингов", "£"],
    JPY: ["🇯🇵", "Японская иена", "¥"],
    CNY: ["🇨🇳", "Китайский юань", "¥"],
    KRW: ["🇰🇷", "Южнокорейская вона", "₩"],
    INR: ["🇮🇳", "Индийская рупия", "₹"],
    AUD: ["🇦🇺", "Австралийский доллар", "A$"],
    CAD: ["🇨🇦", "Канадский доллар", "C$"],
    NZD: ["🇳🇿", "Новозеландский доллар", "NZ$"],
    SGD: ["🇸🇬", "Сингапурский доллар", "S$"],
    HKD: ["🇭🇰", "Гонконгский доллар", "HK$"],
    CHF: ["🇨🇭", "Швейцарский франк", "CHF"],
    NOK: ["🇳🇴", "Норвежская крона", "kr"],
    SEK: ["🇸🇪", "Шведская крона", "kr"],
    DKK: ["🇩🇰", "Датская крона", "kr"],
    PLN: ["🇵🇱", "Польский злотый", "zł"],
    CZK: ["🇨🇿", "Чешская крона", "Kč"],
    HUF: ["🇭🇺", "Венгерский форинт", "Ft"],
    RON: ["🇷🇴", "Румынский лей", "lei"],
    BGN: ["🇧🇬", "Болгарский лев", "лв"],
    RSD: ["🇷🇸", "Сербский динар", "дин"],
    TRY: ["🇹🇷", "Турецкая лира", "₺"],
    GEL: ["🇬🇪", "Грузинский лари", "₾"],
    AMD: ["🇦🇲", "Армянский драм", "֏"],
    AZN: ["🇦🇿", "Азербайджанский манат", "₼"],
    KZT: ["🇰🇿", "Казахстанский тенге", "₸"],
    UZS: ["🇺🇿", "Узбекский сум", "сўм"],
    THB: ["🇹🇭", "Тайский бат", "฿"],
    VND: ["🇻🇳", "Вьетнамский донг", "₫"],
    IDR: ["🇮🇩", "Индонезийская рупия", "Rp"],
    MYR: ["🇲🇾", "Малайзийский ринггит", "RM"],
    PHP: ["🇵🇭", "Филиппинское песо", "₱"],
    MXN: ["🇲🇽", "Мексиканское песо", "$"],
    BRL: ["🇧🇷", "Бразильский реал", "R$"],
    ARS: ["🇦🇷", "Аргентинское песо", "$"],
    CLP: ["🇨🇱", "Чилийское песо", "$"],
    COP: ["🇨🇴", "Колумбийское песо", "$"],
    UAH: ["🇺🇦", "Украинская гривна", "₴"],
    ISK: ["🇮🇸", "Исландская крона", "kr"],
    ZAR: ["🇿🇦", "Южноафриканский рэнд", "R"],
    MAD: ["🇲🇦", "Марокканский дирхам", "د.م."],
    EGP: ["🇪🇬", "Египетский фунт", "£"],
    AED: ["🇦🇪", "Дирхам ОАЭ", "د.إ"],
    SAR: ["🇸🇦", "Саудовский риял", "﷼"],
    ILS: ["🇮🇱", "Новый израильский шекель", "₪"],
    BRL: ["🇧🇷", "Бразильский реал", "R$"],
    USD: ["🇺🇸", "Доллар США", "$"],
    EUR: ["🇪🇺", "Евро", "€"]
};


/*
    Frankfurter поддерживает собственный список валют.
    Получаем его автоматически.
*/

async function loadCurrencies() {

    try {

        const response =
            await fetch(
                "https://api.frankfurter.dev/v2/currencies"
            );

        if (!response.ok) {
            throw new Error("Currency API error");
        }

        const data =
            await response.json();

        const currencies =
            Object.keys(data).sort();

        populateCurrencySelects(currencies);

    } catch (error) {

        console.error(error);

        /*
            Резервный список,
            если внешний API временно недоступен.
        */

        populateCurrencySelects(
            Object.keys(currencyNames)
        );
    }
}


function populateCurrencySelects(currencies) {

    const options =
        currencies.map(code => {

            const info =
                currencyNames[code];

            if (info) {

                return `
                    <option value="${code}">
                        ${info[0]} ${info[1]} (${code})
                    </option>
                `;

            }

            return `
                <option value="${code}">
                    🌐 ${code}
                </option>
            `;

        }).join("");

    currencyFrom.innerHTML = options;
    currencyTo.innerHTML = options;

    currencyFrom.value = "USD";
    currencyTo.value = "EUR";
}


async function convertCurrency() {

    const amount =
        Number(currencyAmount.value);

    const from =
        currencyFrom.value;

    const to =
        currencyTo.value;

    if (!amount || amount < 0) {

        currencyResult.textContent =
            "Введите корректную сумму.";

        return;
    }

    if (from === to) {

        currencyResult.textContent =
            `${amount.toLocaleString()} ${from} = ${amount.toLocaleString()} ${to}`;

        currencyDate.textContent =
            "Одинаковая валюта.";

        return;
    }

    currencyResult.textContent =
        "Получаем актуальный курс...";

    currencyDate.textContent = "";

    try {

        const response =
            await fetch(
                `https://api.frankfurter.dev/v2/rate/${from}/${to}`
            );

        if (!response.ok) {
            throw new Error("Conversion failed");
        }

        const data =
            await response.json();

        const result =
            amount * data.rate;

        currencyResult.textContent =
            `${formatNumber(amount)} ${from} = ${formatNumber(result)} ${to}`;

        currencyDate.textContent =
            `Курс: 1 ${from} = ${formatNumber(data.rate)} ${to} · дата курса: ${data.date}`;

    } catch (error) {

        console.error(error);

        currencyResult.textContent =
            "Не удалось получить курс. Попробуйте ещё раз.";

        currencyDate.textContent =
            "Источник курса временно недоступен.";
    }
}


function formatNumber(number) {

    return Number(number).toLocaleString(
        "ru-RU",
        {
            maximumFractionDigits: 4
        }
    );
}


document
    .getElementById("convertButton")
    .addEventListener(
        "click",
        convertCurrency
    );


loadCurrencies();


/* =========================================================
   INITIAL SETTINGS
========================================================= */

document
    .getElementById("currencyFrom")
    .value = "USD";