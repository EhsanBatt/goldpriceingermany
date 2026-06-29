// Base Gold Prices per Gram in EUR
const basePricesEUR = {
    24: 73.45,
    22: 67.33,
    21: 64.27,
    18: 55.09,
    14: 42.85,
    8: 24.48 // 333er
};

// Exchange rates from EUR
const exchangeRates = {
    EUR: 1.0,
    USD: 1.08,
    CHF: 0.95,
    TRY: 35.40,
    SAR: 4.05,
    AED: 3.96
};

let livePrices = { ...basePricesEUR };
let currentCurrency = 'EUR';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCalculator();
    initFAQ();
    initChartTabs();
    initLiveSimulator();
});

/* Theme Management */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '🌙';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeBtn) themeBtn.innerHTML = '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.innerHTML = '☀️';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeBtn.innerHTML = '🌙';
            }
        });
    }
}

/* Chart Tabs Simulator (Outranking GOLD.DE) */
function initChartTabs() {
    const timeBtns = document.querySelectorAll('.time-btn');
    const bars = document.querySelectorAll('.chart-bar');
    const chartTitle = document.getElementById('chart-period-title');

    const chartData = {
        '1d': { title: 'أداء اليوم (مباشر)', heights: [45, 50, 48, 55, 60, 58, 65, 70, 68, 75, 80, 85], vals: [72.8, 72.9, 72.8, 73.0, 73.1, 73.0, 73.2, 73.3, 73.2, 73.4, 73.45, 73.45] },
        '1w': { title: 'أداء آخر أسبوع (+1.4%)', heights: [30, 35, 40, 38, 50, 55, 60, 58, 65, 75, 80, 85], vals: [72.2, 72.3, 72.5, 72.4, 72.7, 72.8, 73.0, 72.9, 73.1, 73.3, 73.4, 73.45] },
        '1m': { title: 'أداء آخر شهر (+3.8%)', heights: [20, 25, 30, 28, 40, 45, 50, 55, 65, 70, 78, 85], vals: [70.5, 70.8, 71.2, 71.0, 71.5, 71.8, 72.1, 72.4, 72.8, 73.0, 73.3, 73.45] },
        '1y': { title: 'أداء آخر سنة (+34.0%)', heights: [15, 18, 25, 30, 35, 45, 50, 60, 68, 72, 80, 85], vals: [54.8, 56.2, 58.5, 60.1, 62.0, 64.5, 66.8, 68.9, 70.5, 71.8, 72.9, 73.45] },
        '5y': { title: 'أداء آخر 5 سنوات (+88.5%)', heights: [10, 15, 20, 28, 38, 42, 50, 58, 65, 72, 80, 85], vals: [38.9, 42.1, 46.5, 50.2, 54.8, 57.5, 60.8, 64.2, 67.5, 70.1, 72.5, 73.45] }
    };

    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.getAttribute('data-period');
            const data = chartData[period] || chartData['1d'];
            
            if (chartTitle) chartTitle.textContent = data.title;

            bars.forEach((bar, idx) => {
                if (data.heights[idx] !== undefined) {
                    bar.style.height = `${data.heights[idx]}%`;
                    const tooltip = bar.querySelector('.bar-tooltip');
                    if (tooltip) tooltip.textContent = `${data.vals[idx]} €`;
                }
            });
        });
    });
}

/* Interactive Calculator */
function initCalculator() {
    const weightInput = document.getElementById('calc-weight');
    const karatSelect = document.getElementById('calc-karat');
    const currencySelect = document.getElementById('calc-currency');
    const totalValElem = document.getElementById('calc-total-val');
    const pricePerGramElem = document.getElementById('calc-gram-val');
    const purityElem = document.getElementById('calc-purity-val');

    if (!weightInput || !karatSelect || !currencySelect) return;

    const calculate = () => {
        const weight = parseFloat(weightInput.value) || 0;
        const karat = parseInt(karatSelect.value);
        const currency = currencySelect.value;
        currentCurrency = currency;

        let pricePerGram = livePrices[karat] || 0;
        const rate = exchangeRates[currency] || 1.0;
        pricePerGram *= rate;

        const totalValue = weight * pricePerGram;
        
        let symbol = '€';
        if (currency === 'USD') symbol = '$';
        if (currency === 'CHF') symbol = 'CHF';
        if (currency === 'TRY') symbol = 'TL';
        if (currency === 'SAR') symbol = 'SAR';
        if (currency === 'AED') symbol = 'AED';

        if (totalValElem) totalValElem.textContent = `${totalValue.toLocaleString('ar-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
        if (pricePerGramElem) pricePerGramElem.textContent = `${pricePerGram.toLocaleString('ar-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
        
        let purityText = '99.9% (ذهب خالص 999)';
        if (karat === 22) purityText = '91.6% (عيار 22 / 916)';
        if (karat === 21) purityText = '87.5% (عيار 21 / 875)';
        if (karat === 18) purityText = '75.0% (عيار 18 / 750)';
        if (karat === 14) purityText = '58.5% (عيار 14 / 585)';
        if (karat === 8)  purityText = '33.3% (عيار 8 / 333)';
        
        if (purityElem) purityElem.textContent = purityText;
    };

    weightInput.addEventListener('input', calculate);
    karatSelect.addEventListener('change', calculate);
    currencySelect.addEventListener('change', calculate);

    calculate();
}

/* FAQ Accordion */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(el => el.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

/* Live Market Price Simulator */
function initLiveSimulator() {
    setInterval(() => {
        const delta = (Math.random() * 0.30 - 0.12);
        
        for (let k in livePrices) {
            livePrices[k] = Math.max(10, parseFloat((livePrices[k] + (delta * (k/24))).toFixed(2)));
        }

        updateUI();
    }, 4000);
}

function updateUI() {
    // Update ticker bar
    const tickerGold = document.getElementById('ticker-gold');
    const tickerSilver = document.getElementById('ticker-silver');
    if (tickerGold && livePrices[24]) {
        const ounceEur = (livePrices[24] * 31.1035).toFixed(2);
        tickerGold.textContent = `${ounceEur} €`;
    }

    // Update featured cards
    const cards = document.querySelectorAll('[data-karat]');
    cards.forEach(card => {
        const k = parseInt(card.getAttribute('data-karat'));
        const priceElem = card.querySelector('.price-main');
        const changeElem = card.querySelector('.change-tag');
        
        if (priceElem && livePrices[k]) {
            const currentVal = parseFloat(priceElem.getAttribute('data-val') || basePricesEUR[k]);
            const newVal = livePrices[k];
            const diff = newVal - currentVal;
            
            priceElem.textContent = `${newVal.toFixed(2)} €`;
            priceElem.setAttribute('data-val', newVal);

            if (changeElem) {
                const percent = ((diff / currentVal) * 100).toFixed(2);
                if (diff >= 0) {
                    changeElem.className = 'change-tag up';
                    changeElem.innerHTML = `▲ +${Math.abs(percent)}%`;
                } else {
                    changeElem.className = 'change-tag down';
                    changeElem.innerHTML = `▼ -${Math.abs(percent)}%`;
                }
            }
        }
    });

    // Update alloys table
    const alloyRows = document.querySelectorAll('.alloy-table tr[data-karat]');
    alloyRows.forEach(row => {
        const k = parseInt(row.getAttribute('data-karat'));
        if (livePrices[k]) {
            const gramCell = row.querySelector('.alloy-gram');
            const scrapCell = row.querySelector('.alloy-scrap');
            if (gramCell) gramCell.textContent = `${livePrices[k].toFixed(2)} €`;
            if (scrapCell) scrapCell.textContent = `${(livePrices[k] * 0.985).toFixed(2)} €`;
        }
    });

    // Update multi-currency table
    const currRows = document.querySelectorAll('.currency-table tr[data-curr]');
    currRows.forEach(row => {
        const curr = row.getAttribute('data-curr');
        const rate = exchangeRates[curr] || 1.0;
        let sym = curr;
        if (curr === 'EUR') sym = '€';
        if (curr === 'USD') sym = '$';
        if (curr === 'CHF') sym = 'CHF';
        if (curr === 'TRY') sym = 'TL';
        if (curr === 'SAR') sym = 'SAR';
        if (curr === 'AED') sym = 'AED';

        const gramCell = row.querySelector('.curr-gram');
        const ounceCell = row.querySelector('.curr-ounce');
        const kiloCell = row.querySelector('.curr-kilo');

        if (gramCell) gramCell.textContent = `${(livePrices[24] * rate).toLocaleString('ar-DE', {maximumFractionDigits: 2})} ${sym}`;
        if (ounceCell) ounceCell.textContent = `${(livePrices[24] * 31.1035 * rate).toLocaleString('ar-DE', {maximumFractionDigits: 2})} ${sym}`;
        if (kiloCell) kiloCell.textContent = `${(livePrices[24] * 1000 * rate).toLocaleString('ar-DE', {maximumFractionDigits: 2})} ${sym}`;
    });

    // Re-trigger calculator
    const weightInput = document.getElementById('calc-weight');
    if (weightInput) weightInput.dispatchEvent(new Event('input'));

    // Update timestamp
    const timeElem = document.getElementById('last-updated-time');
    if (timeElem) {
        const now = new Date();
        timeElem.textContent = `مباشر (${now.toLocaleTimeString('ar-DE')})`;
    }
}
