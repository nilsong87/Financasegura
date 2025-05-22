// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
        const item = this.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ===== Back to Top Button =====
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile Menu Toggle (se existir) =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

// ===== Simulador de Portabilidade (exemplo simples) =====
const simulatorForm = document.getElementById('portabilitySimulator');
if (simulatorForm) {
    simulatorForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Exemplo de cálculo fictício
        const currentRate = parseFloat(simulatorForm.currentRate.value.replace(',', '.')) || 2.5;
        const newRate = (currentRate * 0.52).toFixed(2);
        const currentPayment = parseFloat(simulatorForm.currentPayment.value.replace(',', '.')) || 850;
        const newPayment = (currentPayment * 0.85).toFixed(2);
        const remainingInstallments = parseInt(simulatorForm.remainingInstallments.value) || 30;
        const currentTotal = (currentPayment * remainingInstallments).toFixed(2);
        const newTotal = (newPayment * remainingInstallments).toFixed(2);
        const savings = (currentTotal - newTotal).toFixed(2);

        // Exibe resultados
        document.querySelector('.results-placeholder').style.display = 'none';
        const resultsContent = document.querySelector('.results-content');
        resultsContent.style.display = 'block';

        document.getElementById('currentRateResult').textContent = `${currentRate.toFixed(2)}% a.m.`;
        document.getElementById('newRateResult').textContent = `${newRate}% a.m.`;
        document.getElementById('currentPaymentResult').textContent = `R$ ${parseFloat(currentPayment).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        document.getElementById('newPaymentResult').textContent = `R$ ${parseFloat(newPayment).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        document.getElementById('currentTotalResult').textContent = `R$ ${parseFloat(currentTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        document.getElementById('newTotalResult').textContent = `R$ ${parseFloat(newTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        document.getElementById('savingsResult').textContent = `R$ ${parseFloat(savings).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    });
}

// ===== Botão "Solicitar portabilidade" (exemplo) =====
const requestBtn = document.getElementById('requestPortability');
if (requestBtn) {
    requestBtn.addEventListener('click', () => {
        alert('Solicitação enviada! Em breve um especialista entrará em contato.');
    });
}

// ===== Floating WhatsApp (abre link em nova aba) =====
const floatingWhatsapp = document.querySelector('.floating-whatsapp a');
if (floatingWhatsapp) {
    floatingWhatsapp.addEventListener('click', function (e) {
        window.open(this.href, '_blank');
    });
}