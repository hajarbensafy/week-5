document.addEventListener('DOMContentLoaded', function() {
  
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const resultDisplay = document.getElementById('result');
    const convertBtn = document.getElementById('convertBtn');
    const switchBtn = document.getElementById('switchBtn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const rateInfoElement = document.getElementById('rateInfo');
    const fromCodeElement = document.getElementById('fromCode');
    const toCodeElement = document.getElementById('toCode');
    const rateElement = document.getElementById('rate');
    
    const API_KEY = 'votre_clé_api_ici';
    let currencies = [];
    
    init();
    
    async function init() {
        try {
            showLoading();
            
            currencies = await fetchSupportedCurrencies();
            
            populateCurrencySelects();
            
            setDefaultCurrencies();
            
            hideLoading();
        } catch (error) {
            console.error('Erreur initialisation:', error);
            showError();
        }
    }
    
    async function fetchSupportedCurrencies() {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des devises');
        }
        
        const data = await response.json();
        return data.supported_codes;
    }
    
    function populateCurrencySelects() {
        currencies.forEach(currency => {
            const [code, name] = currency;
            
            const fromOption = document.createElement('option');
            fromOption.value = code;
            fromOption.textContent = `${code} - ${name}`;
            fromCurrencySelect.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = code;
            toOption.textContent = `${code} - ${name}`;
            toCurrencySelect.appendChild(toOption);
        });
    }
    
    function setDefaultCurrencies() {
        const usdIndex = currencies.findIndex(c => c[0] === 'USD');
        const eurIndex = currencies.findIndex(c => c[0] === 'EUR');
        
        if (usdIndex !== -1) fromCurrencySelect.selectedIndex = usdIndex;
        if (eurIndex !== -1) toCurrencySelect.selectedIndex = eurIndex;
    }
    
    async function convertCurrency() {
        try {
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const amount = amountInput.value;
            
            if (!fromCurrency || !toCurrency || !amount) {
                throw new Error('Veuillez remplir tous les champs');
            }
            
            showLoading();
            
            const conversionRate = await fetchConversionRate(fromCurrency, toCurrency, amount);
            
            const result = (amount * conversionRate).toFixed(2);
            
            resultDisplay.textContent = result;
            
            fromCodeElement.textContent = fromCurrency;
            toCodeElement.textContent = toCurrency;
            rateElement.textContent = conversionRate.toFixed(6);
            rateInfoElement.classList.remove('hidden');
            
            hideLoading();
        } catch (error) {
            console.error('Erreur conversion:', error);
            showError();
        }
    }
    
    async function fetchConversionRate(from, to, amount) {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du taux de change');
        }
        
        const data = await response.json();
        return data.conversion_rate;
    }
    
    function switchCurrencies() {
        const tempCurrency = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = tempCurrency;
        
        if (resultDisplay.textContent !== '-') {
            const tempAmount = amountInput.value;
            amountInput.value = resultDisplay.textContent;
            resultDisplay.textContent = tempAmount;
            
            fromCodeElement.textContent = fromCurrencySelect.value;
            toCodeElement.textContent = toCurrencySelect.value;
        }
        
        if (amountInput.value && amountInput.value !== '0') {
            convertCurrency();
        }
    }
    
    function showLoading() {
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        rateInfoElement.classList.add('hidden');
    }
    
    function hideLoading() {
        loadingElement.classList.add('hidden');
    }
    
    function showError() {
        errorElement.classList.remove('hidden');
        loadingElement.classList.add('hidden');
        rateInfoElement.classList.add('hidden');
    }
    
    convertBtn.addEventListener('click', convertCurrency);
    switchBtn.addEventListener('click', switchCurrencies);
    
    amountInput.addEventListener('input', function() {
        if (this.value && this.value !== '0') {
            convertCurrency();
        } else {
            resultDisplay.textContent = '-';
            rateInfoElement.classList.add('hidden');
        }
    });
    
    fromCurrencySelect.addEventListener('change', function() {
        if (amountInput.value && amountInput.value !== '0') {
            convertCurrency();
        }
    });
    
    toCurrencySelect.addEventListener('change', function() {
        if (amountInput.value && amountInput.value !== '0') {
            convertCurrency();
        }
    });
});