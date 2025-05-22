// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

// ===== Back to Top Button =====
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Newsletter Form (simples) =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = this.querySelector('input[type="email"]');
        if (input && input.value) {
            alert('Cadastro realizado com sucesso! Obrigado por se inscrever.');
            input.value = '';
        }
    });
}

// ===== Floating WhatsApp (abre link em nova aba) =====
const floatingWhatsapp = document.querySelector('.floating-whatsapp a');
if (floatingWhatsapp) {
    floatingWhatsapp.addEventListener('click', function (e) {
        window.open(this.href, '_blank');
    });
}