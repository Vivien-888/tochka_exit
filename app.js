document.addEventListener("DOMContentLoaded", () => {

    const app = {
        currentPage: "home",
        currentCountry: null,
        currentArticle: null,
        continent: "all",
        search: "",

        init() {
            this.cache();
            this.bindNavigation();
            this.renderContinents();
            this.renderCountries();
            this.renderFeatured();
            this.renderKnowledge();
            this.initCalculator();
            this.initConverter();
            this.initTooltip();
            this.hideLoader();
            this.handleInitialPage();
        },

        cache() {
            this.pages = document.querySelectorAll(".page");
            this.nav = document.getElementById("mainNav");
            this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
        },

        hideLoader() {
            setTimeout(() => {
                document.getElementById("pageLoader")?.classList.add("hidden");
            }, 700);
        },

        handleInitialPage() {
            const hash = window.location.hash.replace("#", "");

            if (hash === "countries") {
                this.showPage("countries");
            } else if (hash === "knowledge") {
                this.showPage("knowledge");
            } else if (hash === "calculator") {
                this.showPage("calculator");
            } else if (hash === "converter") {
                this.showPage("converter");
            } else {
                this.showPage("home");
            }
        },

        bindNavigation() {

            document.addEventListener("click", (event) => {

                const button = event.target.closest("[data-page]");

                if (!button) return;

                const page = button.dataset.page;

                if (page) {
                    this.showPage(page);
                }

            });

            this.mobileMenuBtn?.addEventListener("click", () => {
                this.nav.classList.toggle("open");
            });

            document.getElementById("countryBack")?.addEventListener("click", () => {
                this.showPage("countries");
            });

            document.getElementById("articleBack")?.addEventListener("click", () => {
                this.showPage("knowledge");
            });

            window.addEventListener("hashchange", () => {
                this.handleInitialPage();
            });
        },

        showPage(page) {

            if (page === "country-detail" || page === "article") {
                // handled separately
            }

            const target = document.getElementById(`page-${page}`);

            if (!target) return;

            this.pages.forEach(p => {
                p.classList.remove("active-page");
            });

            target.classList.add("active-page");

            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.toggle(
                    "active",
                    link.dataset.page === page
                );
            });

            this.currentPage = page;

            this.nav?.classList.remove("open");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            if (page !== "home") {
                history.replaceState(null, "", `#${page}`);
            } else {
                history.replaceState(null, "", "#");
            }

            setTimeout(() => {
                if (window.initRevealAnimations) {
                    window.initRevealAnimations();
                }
            }, 80);
        },


        /* COUNTRIES */

        renderContinents() {

            const container = document.getElementById("continentTabs");

            if (!container) return;

            container.innerHTML = `
                <button
                    class="continent-tab active"
                    data-continent="all"
                >
                    Все
                </button>
            `;

            continents.forEach(continent => {

                const button = document.createElement("button");

                button.className = "continent-tab";
                button.dataset.continent = continent;
                button.textContent = continent;

                container.appendChild(button);

            });

            container.addEventListener("click", event => {

                const button = event.target.closest(".continent-tab");

                if (!button) return;

                this.continent = button.dataset.continent;

                container.querySelectorAll(".continent-tab")
                    .forEach(item => item.classList.remove("active"));

                button.classList.add("active");

                this.renderCountries();

            });

            const search = document.getElementById("countrySearch");

            search?.addEventListener("input", event => {

                this.search = event.target.value
                    .trim()
                    .toLowerCase();

                this.renderCountries();

            });
        },


        getFilteredCountries() {

            return countries.filter(country => {

                const matchesContinent =
                    this.continent === "all" ||
                    country.continent === this.continent;

                const searchText = `
                    ${country.name}
                    ${country.region}
                    ${country.continent}
                `.toLowerCase();

                const matchesSearch =
                    !this.search ||
                    searchText.includes(this.search);

                return matchesContinent && matchesSearch;
            });

        },


        renderCountries() {

            const container = document.getElementById("countriesGrid");

            if (!container) return;

            const filtered = this.getFilteredCountries();

            if (!filtered.length) {

                container.innerHTML = `
                    <div class="empty-state">
                        <h3>Ничего не найдено</h3>
                        <p>Попробуй изменить запрос или регион.</p>
                    </div>
                `;

                return;
            }

            container.innerHTML = filtered.map(country =>
                this.countryCardHTML(country)
            ).join("");

            container.querySelectorAll(".country-card")
                .forEach(card => {

                    card.addEventListener("click", () => {

                        const country = countries.find(
                            item => item.id === card.dataset.country
                        );

                        if (country) {
                            this.openCountry(country);
                        }

                    });

                });

            if (window.initRevealAnimations) {
                window.initRevealAnimations();
            }
        },


        countryCardHTML(country) {

            return `
                <article
                    class="country-card reveal"
                    data-country="${country.id}"
                >

                    <div class="country-flag">
                        ${country.flag}
                    </div>

                    <div class="country-region">
                        ${country.region}
                    </div>

                    <h3>${country.name}</h3>

                    <p>${country.description}</p>

                    <div class="country-arrow">↗</div>

                </article>
            `;
        },


        renderFeatured() {

            const container =
                document.getElementById("featuredCountries");

            if (!container) return;

            const featured = countries.slice(0, 6);

            container.innerHTML = featured
                .map(country => this.countryCardHTML(country))
                .join("");

            container.querySelectorAll(".country-card")
                .forEach(card => {

                    card.addEventListener("click", () => {

                        const country = countries.find(
                            item => item.id === card.dataset.country
                        );

                        this.openCountry(country);

                    });

                });
        },


        openCountry(country) {

            if (!country) return;

            this.currentCountry = country;

            const page = document.getElementById("page-country-detail");

            this.pages.forEach(p => {
                p.classList.remove("active-page");
            });

            page.classList.add("active-page");

            document.querySelectorAll(".nav-link")
                .forEach(link => link.classList.remove("active"));

            history.replaceState(
                null,
                "",
                `#country/${country.id}`
            );

            const container =
                document.getElementById("countryDetail");

            container.innerHTML = `

                <div class="country-detail-hero">

                    <div class="country-detail-main reveal">

                        <div class="country-detail-flag">
                            ${country.flag}
                        </div>

                        <div class="country-region">
                            ${country.continent} · ${country.region}
                        </div>

                        <h1>${country.name}</h1>

                        <p>
                            ${country.description}
                        </p>

                    </div>

                    <aside class="country-detail-side reveal">

                        <h3>Коротко</h3>

                        <div class="info-row">
                            <span>Валюта</span>
                            <strong>
                                ${country.currency}
                            </strong>
                        </div>

                        <div class="info-row">
                            <span>Язык</span>
                            <strong>
                                ${country.language}
                            </strong>
                        </div>

                        <div class="info-row">
                            <span>Виза</span>
                            <strong>
                                ${country.visa}
                            </strong>
                        </div>

                        <div class="info-row">
                            <span>Ориентир / месяц</span>
                            <strong>
                                ~$${country.monthly}
                            </strong>
                        </div>

                    </aside>

                </div>

                <div class="country-topics">

                    ${this.topicHTML(country, "documents", "Документы", "Подготовка документов")}

                    ${this.topicHTML(country, "visa", "Визы", "Условия въезда и пребывания")}

                    ${this.topicHTML(country, "residence", "ВНЖ", "Долгосрочное проживание")}

                    ${this.topicHTML(country, "work", "Работа", "Трудоустройство")}

                    ${this.topicHTML(country, "study", "Учёба", "Образование")}

                    ${this.topicHTML(country, "housing", "Жильё", "Аренда и районы")}

                    ${this.topicHTML(country, "medicine", "Медицина", "Клиники и страхование")}

                    ${this.topicHTML(country, "transport", "Транспорт", "Перемещение по стране")}

                    ${this.topicHTML(country, "internet", "Интернет", "Связь и SIM-карты")}

                </div>
            `;

            container.querySelectorAll(".topic-card")
                .forEach(card => {

                    card.addEventListener("click", () => {

                        const key = card.dataset.topic;

                        this.showTopicInfo(
                            country,
                            key
                        );

                    });

                });

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(() => {
                window.initRevealAnimations?.();
            }, 50);
        },


        topicHTML(country, key, title, description) {

            return `
                <article
                    class="topic-card reveal"
                    data-topic="${key}"
                >

                    <span>${this.topicIcon(key)}</span>

                    <strong>${title}</strong>

                    <p>${description}</p>

                </article>
            `;
        },


        topicIcon(key) {

            const icons = {
                documents: "▤",
                visa: "◎",
                residence: "⌂",
                work: "▣",
                study: "◇",
                housing: "⌂",
                medicine: "＋",
                transport: "→",
                internet: "⌁"
            };

            return icons[key] || "•";
        },


        showTopicInfo(country, key) {

            const titleMap = {
                documents: "Документы",
                visa: "Визы",
                residence: "ВНЖ",
                work: "Работа",
                study: "Учёба",
                housing: "Жильё",
                medicine: "Медицина",
                transport: "Транспорт",
                internet: "Интернет"
            };

            const text =
                country.topics[key] ||
                "Информация пока готовится.";

            const article = document.getElementById("articleContent");

            this.pages.forEach(p => {
                p.classList.remove("active-page");
            });

            document.getElementById("page-article")
                .classList.add("active-page");

            article.innerHTML = `

                <header class="article-header">

                    <span class="section-kicker">
                        ${country.flag} ${country.name}
                    </span>

                    <h1>${titleMap[key]}</h1>

                    <p>
                        Информация по направлению
                        «${titleMap[key].toLowerCase()}»
                        для ${country.name}.
                    </p>

                </header>

                <div class="article-body">

                    <p>
                        ${text}
                    </p>

                    <h2>Что важно проверить</h2>

                    <p>
                        Требования могут меняться в зависимости
                        от гражданства, цели пребывания,
                        срока поездки и конкретной процедуры.
                    </p>

                    <p>
                        Перед подачей документов всегда
                        сверяй актуальные условия с официальными
                        источниками соответствующей страны.
                    </p>

                </div>
            `;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },


        /* KNOWLEDGE */

        renderKnowledge() {

            const container =
                document.getElementById("knowledgeGrid");

            if (!container) return;

            container.innerHTML =
                knowledgeCategories.map(category => `

                    <article
                        class="knowledge-card reveal"
                        data-knowledge="${category.id}"
                    >

                        <div class="knowledge-icon">
                            ${category.icon}
                        </div>

                        <h3>${category.title}</h3>

                        <p>${category.description}</p>

                    </article>

                `).join("");

            container.querySelectorAll(".knowledge-card")
                .forEach(card => {

                    card.addEventListener("click", () => {

                        const category =
                            knowledgeCategories.find(
                                item =>
                                    item.id === card.dataset.knowledge
                            );

                        if (category) {
                            this.openArticle(category);
                        }

                    });

                });
        },


        openArticle(category) {

            this.currentArticle = category;

            const article =
                document.getElementById("articleContent");

            this.pages.forEach(p => {
                p.classList.remove("active-page");
            });

            document.getElementById("page-article")
                .classList.add("active-page");

            article.innerHTML = `

                <header class="article-header">

                    <span class="section-kicker">
                        БАЗА ЗНАНИЙ
                    </span>

                    <h1>${category.article.title}</h1>

                    <p>
                        ${category.article.intro}
                    </p>

                </header>

                <div class="article-body">

                    ${category.article.sections.map(section => `

                        <h2>${section.title}</h2>

                        <p>${section.text}</p>

                    `).join("")}

                </div>
            `;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },


        /* CALCULATOR */

        initCalculator() {

            const select =
                document.getElementById("calcCountry");

            if (!select) return;

            select.innerHTML += countries.map(country => `
                <option value="${country.id}">
                    ${country.flag} ${country.name}
                </option>
            `).join("");

            document
                .getElementById("calculateBtn")
                ?.addEventListener("click", () => {
                    this.calculateMove();
                });
        },


        calculateMove() {

            const countryId =
                document.getElementById("calcCountry").value;

            const people =
                Number(document.getElementById("calcPeople").value) || 1;

            const months =
                Number(document.getElementById("calcMonths").value) || 3;

            const country =
                countries.find(item => item.id === countryId);

            if (!country) {

                this.renderCalculatorMessage(
                    "Сначала выбери страну."
                );

                return;
            }

            const visa =
                document.getElementById("calcVisa").checked
                    ? 250
                    : 0;

            const flight =
                document.getElementById("calcFlight").checked
                    ? 450 * people
                    : 0;

            const housing =
                document.getElementById("calcHousing").checked
                    ? country.monthly
                    : 0;

            const deposit =
                document.getElementById("calcDeposit").checked
                    ? country.monthly
                    : 0;

            const living =
                country.monthly *
                months *
                people;

            const total =
                visa +
                flight +
                housing +
                deposit +
                living;

            const result =
                document.getElementById("calculatorResult");

            result.innerHTML = `

                <div class="result-top">

                    <small>
                        ОРИЕНТИРОВОЧНЫЙ СТАРТОВЫЙ БЮДЖЕТ
                    </small>

                    <div class="result-price">
                        $${Math.round(total).toLocaleString("ru-RU")}
                        <span class="result-currency">USD</span>
                    </div>

                    <p style="
                        color:var(--text-soft);
                        font-size:11px;
                        margin-top:8px;
                    ">
                        ${country.flag} ${country.name}
                        · ${people} чел.
                        · ${months} мес.
                    </p>

                </div>

                <div class="result-breakdown">

                    <div class="breakdown-row">
                        <span>Проживание</span>
                        <strong>
                            $${Math.round(living).toLocaleString("ru-RU")}
                        </strong>
                    </div>

                    <div class="breakdown-row">
                        <span>Документы / виза</span>
                        <strong>
                            $${visa.toLocaleString("ru-RU")}
                        </strong>
                    </div>

                    <div class="breakdown-row">
                        <span>Перелёт</span>
                        <strong>
                            $${flight.toLocaleString("ru-RU")}
                        </strong>
                    </div>

                    <div class="breakdown-row">
                        <span>Первое жильё</span>
                        <strong>
                            $${housing.toLocaleString("ru-RU")}
                        </strong>
                    </div>

                    <div class="breakdown-row">
                        <span>Депозит</span>
                        <strong>
                            $${deposit.toLocaleString("ru-RU")}
                        </strong>
                    </div>

                </div>

                <div class="converter-note" style="margin-top:20px;">
                    ⓘ Расчёт ориентировочный и нужен для
                    первичной оценки бюджета.
                </div>
            `;
        },


        renderCalculatorMessage(message) {

            const result =
                document.getElementById("calculatorResult");

            result.innerHTML = `

                <div class="result-empty">

                    <span class="result-icon">ⓘ</span>

                    <h3>${message}</h3>

                    <p>
                        Выбери параметры слева,
                        чтобы получить расчёт.
                    </p>

                </div>
            `;
        },


        /* CONVERTER */

        initConverter() {

            const currencies = [
                ["RUB", "🇷🇺 RUB"],
                ["USD", "🇺🇸 USD"],
                ["EUR", "🇪🇺 EUR"],
                ["GBP", "🇬🇧 GBP"],
                ["KZT", "🇰🇿 KZT"],
                ["GEL", "🇬🇪 GEL"],
                ["TRY", "🇹🇷 TRY"],
                ["THB", "🇹🇭 THB"],
                ["VND", "🇻🇳 VND"],
                ["IDR", "🇮🇩 IDR"],
                ["CAD", "🇨🇦 CAD"]
            ];

            const from =
                document.getElementById("currencyFrom");

            const to =
                document.getElementById("currencyTo");

            if (!from || !to) return;

            const options = currencies.map(currency => `
                <option value="${currency[0]}">
                    ${currency[1]}
                </option>
            `).join("");

            from.innerHTML = options;
            to.innerHTML = options;

            from.value = "USD";
            to.value = "EUR";

            const update = () => this.convertCurrency();

            document
                .getElementById("currencyAmount")
                ?.addEventListener("input", update);

            from.addEventListener("change", update);
            to.addEventListener("change", update);

            document
                .getElementById("swapCurrencies")
                ?.addEventListener("click", () => {

                    const temp = from.value;

                    from.value = to.value;
                    to.value = temp;

                    update();
                });

            update();
        },


        convertCurrency() {

            const rates = {

                USD: {
                    USD: 1,
                    EUR: .92,
                    GBP: .79,
                    RUB: 80,
                    KZT: 480,
                    GEL: 2.7,
                    TRY: 40,
                    THB: 32,
                    VND: 25000,
                    IDR: 16000,
                    CAD: 1.37
                },

                EUR: {
                    USD: 1.09,
                    EUR: 1,
                    GBP: .86,
                    RUB: 87,
                    KZT: 520,
                    GEL: 2.95,
                    TRY: 43,
                    THB: 35,
                    VND: 27200,
                    IDR: 17400,
                    CAD: 1.49
                },

                RUB: {
                    RUB: 1,
                    USD: .0125,
                    EUR: .0115,
                    GBP: .0099,
                    KZT: 6,
                    GEL: .034,
                    TRY: .5,
                    THB: .4,
                    VND: 310,
                    IDR: 200,
                    CAD: .017
                }

            };

            const amount =
                Number(
                    document.getElementById("currencyAmount").value
                ) || 0;

            const from =
                document.getElementById("currencyFrom").value;

            const to =
                document.getElementById("currencyTo").value;

            let rate;

            if (rates[from]?.[to]) {
                rate = rates[from][to];
            } else if (rates[to]?.[from]) {
                rate = 1 / rates[to][from];
            } else {
                rate = 1;
            }

            const result = amount * rate;

            document.getElementById("currencyResult").value =
                result.toLocaleString("ru-RU", {
                    maximumFractionDigits: 2
                });

            document.getElementById("exchangeInfo").textContent =
                `1 ${from} ≈ ${rate.toLocaleString("ru-RU", {
                    maximumFractionDigits: 4
                })} ${to}`;
        },


        /* TOOLTIPS */

        initTooltip() {

            const tooltip =
                document.getElementById("tooltip");

            document.addEventListener("click", event => {

                const info =
                    event.target.closest("[data-info]");

                if (!info) {

                    tooltip.classList.remove("visible");

                    return;
                }

                tooltip.textContent =
                    info.dataset.info;

                tooltip.classList.add("visible");

                const rect =
                    info.getBoundingClientRect();

                tooltip.style.left =
                    `${Math.min(
                        window.innerWidth - 300,
                        Math.max(10, rect.left)
                    )}px`;

                tooltip.style.top =
                    `${rect.bottom + 10}px`;
            });
        }

    };

    window.app = app;

    app.init();

});