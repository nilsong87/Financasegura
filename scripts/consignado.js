// main.js - Interações para a página de empréstimo consignado

document.addEventListener('DOMContentLoaded', function() {
    // ========== Menu Mobile ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Alternar ícone entre hamburguer e X
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu ao clicar em um link (para mobile)
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ========== Scroll Suave ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Botão Voltar ao Topo ==========
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== Newsletter Form ==========
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Simulação de envio - em produção, substituir por AJAX ou outra lógica
                alert('Obrigado por assinar nossa newsletter! Você receberá nossas novidades em breve.');
                emailInput.value = '';
            }
        });
    }

    // ========== Animações ao Scroll ==========
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated', 'fadeInUp');
            }
        });
    }
    
    // Adiciona a classe inicial para elementos que devem animar
    document.querySelectorAll('.loan-highlights .highlight-card, .loan-benefits, .loan-requirements').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar para elementos já visíveis

    // ========== WhatsApp Flutuante ==========
    const whatsappButton = document.querySelector('.floating-whatsapp');
    if (whatsappButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                whatsappButton.classList.add('show');
            } else {
                whatsappButton.classList.remove('show');
            }
        });
    }

    // ========== Simulador (seção) ==========
    // Esta parte seria expandida conforme a implementação real do simulador
    const simuladorSection = document.getElementById('simulador');
    if (simuladorSection) {
        // Lógica do simulador seria implementada aqui
    }

    // ========== Tooltips ==========
    tippy('[data-tippy-content]', {
        animation: 'fade',
        arrow: true,
        duration: 200,
        theme: 'light'
    });
});

// Função para formatar valores monetários
function formatMoney(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

// Função para calcular parcelas (exemplo para o simulador)
function calculateInstallment(amount, interestRate, term) {
    const monthlyRate = interestRate / 100;
    const installment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return installment;
}