/* =====================================================
   MODAL
===================================================== */

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");


window.openModal = function(content) {

    modalContent.innerHTML = content;

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";
};


function closeModal() {

    modal.classList.add("hidden");

    document.body.style.overflow = "";
}


modalClose.addEventListener("click", closeModal);

document
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =====================================================
   INFO BUTTONS
===================================================== */

document
    .querySelectorAll(".info-button")
    .forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const text = button.dataset.info;

            openModal(`
                <h2 class="modal-title">
                    ℹ️ Что это значит?
                </h2>

                <div class="modal-text">
                    <p>${text}</p>
                </div>
            `);

        });

    });


/* =====================================================
   CALCULATOR
===================================================== */

const calculatorFields = [
    "ticket",
    "housing",
    "deposit",
    "documents",
    "insurance",
    "food",
    "transport",
    "reserve"
];


function getCalculatorSum() {

    return calculatorFields.reduce((sum, id) => {

        const element = document.getElementById(id);

        return sum + (Number(element.value) || 0);

    }, 0);
}


function calculateBudget() {

    const base = getCalculatorSum();

    const minimum = Math.round(base * 0.75);

    const realistic = Math.round(base);

    const comfortable = Math.round(base * 1.35);


    document.getElementById("minimumResult").textContent =
        `$${minimum.toLocaleString("en-US")}`;

    document.getElementById("realisticResult").textContent =
        `$${realistic.toLocaleString("en-US")}`;

    document.getElementById("comfortableResult").textContent =
        `$${comfortable.toLocaleString("en-US")}`;
}


document
    .getElementById("calculateButton")
    .addEventListener("click", calculateBudget);


calculateBudget();


/* =====================================================
   TEST
===================================================== */

const questions = [

    {
        question:
            "Что сильнее всего заставляет тебя думать о переезде?",

        answers: [
            "Хочу новую жизнь и возможности",
            "Не устраивает текущая ситуация",
            "Учёба или работа за границей",
            "Хочу просто попробовать пожить в другой стране"
        ]
    },

    {
        question:
            "Есть ли у тебя финансовая подушка?",

        answers: [
            "Да, минимум на несколько месяцев",
            "Есть немного денег",
            "Пока почти нет",
            "Вообще нет"
        ]
    },

    {
        question:
            "Есть ли у тебя план страны?",

        answers: [
            "Да, я уже выбрал несколько",
            "Есть несколько вариантов",
            "Пока понятия не имею",
            "Мне всё равно, главное уехать"
        ]
    },

    {
        question:
            "Что с документами?",

        answers: [
            "Всё готово",
            "Большая часть есть",
            "Нужно ещё многое собрать",
            "Я вообще не знаю, что нужно"
        ]
    },

    {
        question:
            "Готов ли ты адаптироваться к другой культуре?",

        answers: [
            "Да, спокойно",
            "Скорее да",
            "Не уверен",
            "Хочу, чтобы всё было как дома"
        ]
    },

    {
        question:
            "Что ты будешь делать после приезда?",

        answers: [
            "У меня уже есть работа/учёба",
            "Буду искать работу",
            "Буду разбираться на месте",
            "Пока не знаю"
        ]
    },

    {
        question:
            "Если первый план не сработает, что будешь делать?",

        answers: [
            "У меня есть запасной план",
            "Придумаю другой вариант",
            "Наверное, вернусь домой",
            "Даже не думал об этом"
        ]
    }

];


let currentQuestion = 0;
let testScore = 0;


const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const testProgress =
    document.getElementById("testProgress");

const progressFill =
    document.getElementById("progressFill");

const questionContainer =
    document.getElementById("questionContainer");

const testResult =
    document.getElementById("testResult");


function showQuestion() {

    const question = questions[currentQuestion];

    questionText.textContent =
        question.question;


    testProgress.textContent =
        `Вопрос ${currentQuestion + 1} из ${questions.length}`;


    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersContainer.innerHTML =
        question.answers
            .map((answer, index) => {

                return `
                    <button
                        class="answer-button"
                        data-score="${3 - index}"
                    >
                        ${answer}
                    </button>
                `;

            })
            .join("");


    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                testScore +=
                    Number(button.dataset.score);

                currentQuestion++;

                if (
                    currentQuestion >=
                    questions.length
                ) {

                    showTestResult();

                } else {

                    showQuestion();

                }

            });

        });

}


function showTestResult() {

    questionContainer.style.display = "none";

    testProgress.style.display = "none";

    testResult.classList.remove("hidden");


    const title =
        document.getElementById("testResultTitle");

    const text =
        document.getElementById("testResultText");


    if (testScore >= 15) {

        title.textContent =
            "У тебя уже есть хорошая база.";

        text.textContent =
            "Похоже, переезд для тебя может быть реалистичным сценарием. Теперь главное — выбрать страну, проверить документы и составить финансовый план.";

    } else if (testScore >= 9) {

        title.textContent =
            "Рассматривать переезд можно, но подготовься.";

        text.textContent =
            "У тебя есть основания двигаться дальше, однако стоит закрыть финансовые, документальные или организационные вопросы.";

    } else {

        title.textContent =
            "Сначала подготовь фундамент.";

        text.textContent =
            "Это не значит, что переезд тебе не подходит. Скорее всего, сейчас лучше сначала разобраться с деньгами, документами и планом.";

    }

}


document
    .getElementById("restartTest")
    .addEventListener("click", () => {

        currentQuestion = 0;

        testScore = 0;

        questionContainer.style.display = "";

        testProgress.style.display = "";

        testResult.classList.add("hidden");

        showQuestion();

    });


showQuestion();


/* =====================================================
   KNOWLEDGE BASE
===================================================== */

const knowledge = {

    documents: {

        title: "📄 Документы",

        html: `
            <div class="modal-text">

                <p>
                    Документы — одна из самых важных частей
                    подготовки к переезду.
                </p>

                <h4>⭐ Основные документы</h4>

                <div class="important-document">
                    Заграничный паспорт
                </div>

                <div class="important-document">
                    Виза или другое основание для въезда
                </div>

                <div class="important-document">
                    Документы для ВНЖ, если он нужен
                </div>

                <div class="important-document">
                    Свидетельство о рождении
                </div>

                <div class="important-document">
                    Документы об образовании
                </div>

                <div class="important-document">
                    Медицинские документы и справки
                </div>

                <h4>Что такое апостиль?</h4>

                <p>
                    <strong>Апостиль</strong> — специальное
                    подтверждение подлинности документа для его
                    использования в другой стране, если между
                    странами применяется такой порядок.
                </p>

                <h4>Что такое ВНЖ?</h4>

                <p>
                    <strong>ВНЖ</strong> — вид на жительство.
                    Документ или статус, который позволяет
                    иностранцу законно проживать в стране
                    определённый срок или постоянно, в зависимости
                    от законодательства.
                </p>

                <h4>Важно</h4>

                <p>
                    Набор документов зависит от страны,
                    гражданства и цели переезда.
                </p>

            </div>
        `
    },


    work: {

        title: "💼 Работа",

        html: `
            <div class="modal-text">

                <p>
                    Перед переездом важно понять,
                    на каком основании ты будешь работать.
                </p>

                <h4>⭐ Что проверить</h4>

                <div class="important-document">
                    Нужно ли разрешение на работу
                </div>

                <div class="important-document">
                    Можно ли работать по твоему типу визы
                </div>

                <div class="important-document">
                    Нужно ли официальное трудоустройство
                </div>

                <div class="important-document">
                    Нужно ли платить налоги
                </div>

                <h4>Варианты</h4>

                <ul>
                    <li>Работа у местного работодателя</li>
                    <li>Удалённая работа</li>
                    <li>Работа через международную компанию</li>
                    <li>Собственный бизнес</li>
                    <li>Работа после обучения</li>
                </ul>

            </div>
        `
    },


    study: {

        title: "🎓 Учёба",

        html: `
            <div class="modal-text">

                <p>
                    Учёба может быть отдельным основанием
                    для переезда.
                </p>

                <h4>⭐ Для университета обычно нужно проверить</h4>

                <div class="important-document">
                    Аттестат или диплом
                </div>

                <div class="important-document">
                    Подтверждение образования
                </div>

                <div class="important-document">
                    Перевод документов
                </div>

                <div class="important-document">
                    Языковые требования
                </div>

                <div class="important-document">
                    Финансовые требования
                </div>

                <h4>Как искать университет?</h4>

                <p>
                    Начинай с официального сайта университета.
                    Проверяй требования именно для иностранных
                    студентов и свою образовательную программу.
                </p>

                <h4>Что такое подтверждение образования?</h4>

                <p>
                    Это процедура, с помощью которой страна или
                    учебное заведение проверяет иностранный документ
                    об образовании и определяет, как его признавать
                    в своей системе.
                </p>

            </div>
        `
    },


    housing: {

        title: "🏠 Жильё",

        html: `
            <div class="modal-text">

                <h4>До приезда</h4>

                <p>
                    Желательно заранее найти временное жильё
                    хотя бы на первые дни или недели.
                </p>

                <h4>⭐ Что проверить перед арендой</h4>

                <div class="important-document">
                    Кто сдаёт жильё
                </div>

                <div class="important-document">
                    Есть ли договор
                </div>

                <div class="important-document">
                    Размер депозита
                </div>

                <div class="important-document">
                    Дополнительные комиссии
                </div>

                <div class="important-document">
                    Можно ли зарегистрироваться по адресу
                </div>

                <h4>⚠️ Осторожно</h4>

                <p>
                    Не отправляй крупные суммы неизвестному человеку
                    без проверки жилья и условий аренды.
                </p>

            </div>
        `
    },


    packing: {

        title: "🎒 Что взять",

        html: `
            <div class="modal-text">

                <h4>⭐ Самое важное</h4>

                <div class="important-document">
                    Паспорт и копии документов
                </div>

                <div class="important-document">
                    Телефон и зарядка
                </div>

                <div class="important-document">
                    Банковские карты
                </div>

                <div class="important-document">
                    Документы об образовании
                </div>

                <div class="important-document">
                    Медицинские документы
                </div>

                <h4>Полезно</h4>

                <ul>
                    <li>Переходник для розетки</li>
                    <li>Аптечка</li>
                    <li>Несколько копий документов</li>
                    <li>Цифровые копии документов</li>
                    <li>Контакты экстренных служб</li>
                </ul>

            </div>
        `
    },


    emergency: {

        title: "🚨 Непредвиденные ситуации",

        html: `
            <div class="modal-text">

                <h4>❌ Что нельзя делать</h4>

                <ul>
                    <li>
                        Не передавай паспорт посторонним без необходимости.
                    </li>

                    <li>
                        Не соглашайся на нелегальную работу,
                        если не понимаешь последствия.
                    </li>

                    <li>
                        Не отправляй крупные суммы неизвестным людям
                        за жильё или документы.
                    </li>

                    <li>
                        Не нарушай миграционные сроки пребывания.
                    </li>
                </ul>

                <h4>✅ Что можно и нужно делать</h4>

                <ul>
                    <li>
                        Хранить цифровые копии документов.
                    </li>

                    <li>
                        Иметь резерв денег.
                    </li>

                    <li>
                        Знать адрес своего консульства.
                    </li>

                    <li>
                        Хранить контакты экстренных служб.
                    </li>

                    <li>
                        Проверять информацию через официальные источники.
                    </li>
                </ul>

                <h4>Потерял паспорт</h4>

                <p>
                    В первую очередь нужно обратиться в полицию,
                    если это требуется местными правилами,
                    а затем связаться со своим консульством
                    или дипломатическим представительством.
                </p>

                <h4>Нет денег</h4>

                <p>
                    Не принимай решения в панике. Проверь доступ
                    к резервным средствам, свяжись с близкими
                    и найди официальные организации, которые
                    могут помочь в конкретной стране.
                </p>

            </div>
        `
    }

};


document
    .querySelectorAll(".knowledge-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const key =
                card.dataset.knowledge;

            const item =
                knowledge[key];

            if (!item) return;

            openModal(`
                <h2 class="modal-title">
                    ${item.title}
                </h2>

                ${item.html}
            `);

        });

    });


/* =====================================================
   CURRENCY CONVERTER
===================================================== */

const currencies = {

    USD: {
        name: "🇺🇸 Доллар США",
        symbol: "$"
    },

    EUR: {
        name: "🇪🇺 Евро",
        symbol: "€"
    },

    RUB: {
        name: "🇷🇺 Российский рубль",
        symbol: "₽"
    },

    GBP: {
        name: "🇬🇧 Фунт стерлингов",
        symbol: "£"
    },

    ARS: {
        name: "🇦🇷 Аргентинское песо",
        symbol: "$"
    },

    GEL: {
        name: "🇬🇪 Грузинский лари",
        symbol: "₾"
    },

    RSD: {
        name: "🇷🇸 Сербский динар",
        symbol: "дин."
    },

    THB: {
        name: "🇹🇭 Тайский бат",
        symbol: "฿"
    },

    VND: {
        name: "🇻🇳 Вьетнамский донг",
        symbol: "₫"
    },

    KZT: {
        name: "🇰🇿 Казахстанский тенге",
        symbol: "₸"
    },

    TRY: {
        name: "🇹🇷 Турецкая лира",
        symbol: "₺"
    },

    PLN: {
        name: "🇵🇱 Польский злотый",
        symbol: "zł"
    },

    CZK: {
        name: "🇨🇿 Чешская крона",
        symbol: "Kč"
    }

};


function fillCurrencySelects() {

    const from =
        document.getElementById("currencyFrom");

    const to =
        document.getElementById("currencyTo");


    Object.entries(currencies)
        .forEach(([code, data]) => {

            const optionFrom =
                document.createElement("option");

            optionFrom.value = code;

            optionFrom.textContent =
                `${data.name} (${code})`;

            from.appendChild(optionFrom);


            const optionTo =
                document.createElement("option");

            optionTo.value = code;

            optionTo.textContent =
                `${data.name} (${code})`;

            to.appendChild(optionTo);

        });


    from.value = "RUB";
    to.value = "USD";
}


fillCurrencySelects();


async function convertCurrency() {

    const amount =
        Number(
            document.getElementById("currencyAmount").value
        ) || 0;

    const from =
        document.getElementById("currencyFrom").value;

    const to =
        document.getElementById("currencyTo").value;

    const result =
        document.getElementById("currencyResult");

    const date =
        document.getElementById("currencyDate");


    if (from === to) {

        result.textContent =
            `${amount.toLocaleString("ru-RU")} ${currencies[to].symbol}`;

        date.textContent =
            "Одинаковые валюты.";

        return;
    }


    result.textContent =
        "Загружаем курс...";


    try {

        const url =
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error("Ошибка курса");
        }


        const data =
            await response.json();


        const converted =
            data.rates[to];


        result.textContent =
            `${amount.toLocaleString("ru-RU")} ${currencies[from].symbol} ≈ ${converted.toLocaleString("ru-RU", {
                maximumFractionDigits: 2
            })} ${currencies[to].symbol}`;


        date.textContent =
            `Курс обновлён: ${data.date}`;

    } catch (error) {

        console.error(error);

        result.textContent =
            "Не удалось получить курс.";

        date.textContent =
            "Попробуй обновить страницу.";

    }

}


document
    .getElementById("convertButton")
    .addEventListener(
        "click",
        convertCurrency
    );


convertCurrency();