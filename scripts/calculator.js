document.addEventListener('DOMContentLoaded', function() {
    // Loan calculator functionality
    const loanCalculator = document.getElementById('loanCalculator');
    const loanType = document.getElementById('loanType');
    const loanAmount = document.getElementById('loanAmount');
    const amountSlider = document.getElementById('amountSlider');
    const installments = document.getElementById('installments');
    const installmentsSlider = document.getElementById('installmentsSlider');
    const income = document.getElementById('income');
    
    const resultAmount = document.getElementById('resultAmount');
    const resultInstallments = document.getElementById('resultInstallments');
    const resultRate = document.getElementById('resultRate');
    const resultMonthly = document.getElementById('resultMonthly');
    const resultTotal = document.getElementById('resultTotal');
    const resultCET = document.getElementById('resultCET');
    
    const resultsPlaceholder = document.querySelector('.results-placeholder');
    const resultsContent = document.querySelector('.results-content');
    
    // Interest rates by loan type (monthly)
    const interestRates = {
        personal: 1.29,
        consigned: 0.89,
        refinancing: 1.49
    };
    
    // CET rates by loan type (annual)
    const cetRates = {
        personal: 18.42,
        consigned: 12.15,
        refinancing: 20.75
    };
    
    // Initialize sliders if jQuery UI is available
    if (typeof $.fn.slider === 'function') {
        $(amountSlider).slider({
            range: "min",
            min: 1000,
            max: 100000,
            step: 500,
            value: 10000,
            slide: function(event, ui) {
                loanAmount.value = ui.value;
                calculateLoan();
            }
        });
        
        $(installmentsSlider).slider({
            range: "min",
            min: 12,
            max: 60,
            step: 12,
            value: 24,
            slide: function(event, ui) {
                installments.value = ui.value;
                calculateLoan();
            }
        });
        
        // Sync input fields with sliders
        loanAmount.addEventListener('input', function() {
            $(amountSlider).slider('value', this.value);
            calculateLoan();
        });
        
        installments.addEventListener('change', function() {
            $(installmentsSlider).slider('value', this.value);
            calculateLoan();
        });
    }
    
    // Calculate loan when any input changes
    loanType.addEventListener('change', calculateLoan);
    loanAmount.addEventListener('input', calculateLoan);
    installments.addEventListener('change', calculateLoan);
    income.addEventListener('input', calculateLoan);
    
    // Calculate loan when form is submitted
    if (loanCalculator) {
        loanCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateLoan();
        });
    }
    
    function calculateLoan() {
        const type = loanType.value;
        const amount = parseFloat(loanAmount.value) || 0;
        const months = parseInt(installments.value) || 12;
        const monthlyIncome = parseFloat(income.value) || 0;
        
        // Validate inputs
        if (!type || amount < 1000 || amount > 100000 || months < 12 || months > 60) {
            return;
        }
        
        // Get rates based on loan type
        const monthlyRate = interestRates[type] / 100;
        const annualCET = cetRates[type];
        
        // Calculate monthly payment using compound interest formula
        const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                              (Math.pow(1 + monthlyRate, months) - 1);
        
        // Calculate total payment
        const totalPayment = monthlyPayment * months;
        
        // Update results
        resultAmount.textContent = formatCurrency(amount);
        resultInstallments.textContent = `${months}x`;
        resultRate.textContent = `${interestRates[type]}% a.m.`;
        resultMonthly.textContent = formatCurrency(monthlyPayment);
        resultTotal.textContent = formatCurrency(totalPayment);
        resultCET.textContent = `${annualCET}% a.a.`;
        
        // Show results
        resultsPlaceholder.style.display = 'none';
        resultsContent.style.display = 'block';
        
        // Validate income (minimum 3x the monthly payment)
        if (monthlyIncome > 0 && monthlyIncome < monthlyPayment * 3) {
            alert('Atenção: Sua renda mensal é inferior a 3 vezes o valor da parcela. Isso pode dificultar a aprovação do empréstimo.');
        }
    }
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    // Save simulation button
    const saveSimulation = document.getElementById('saveSimulation');
    if (saveSimulation) {
        saveSimulation.addEventListener('click', function() {
            if (resultsContent.style.display !== 'none') {
                alert('Simulação salva com sucesso! Você pode acessá-la novamente na Área do Cliente.');
                // Here you would typically save to localStorage or send to server
            } else {
                alert('Por favor, realize uma simulação antes de salvar.');
            }
        });
    }
    
    // Request loan button - handled in main.js
});