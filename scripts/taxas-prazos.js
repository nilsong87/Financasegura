// main.js - Interações para a página de Taxas e Prazos

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
                // Validação simples de e-mail
                if (validateEmail(emailInput.value)) {
                    // Simulação de envio - em produção, substituir por AJAX ou outra lógica
                    showAlert('success', 'Obrigado por assinar nossa newsletter! Você receberá nossas novidades em breve.');
                    emailInput.value = '';
                } else {
                    showAlert('error', 'Por favor, insira um endereço de e-mail válido.');
                }
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
    document.querySelectorAll('.rates-table, .rates-notes, .rates-cta').forEach(el => {
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

    // ========== Interações com Tabelas de Taxas ==========
    const ratesTables = document.querySelectorAll('.rates-table table');
    if (ratesTables.length > 0) {
        ratesTables.forEach(table => {
            // Destacar linhas ao passar o mouse
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.addEventListener('mouseenter', function() {
                    this.classList.add('highlight');
                });
                
                row.addEventListener('mouseleave', function() {
                    this.classList.remove('highlight');
                });
            });
            
            // Adicionar tooltips para valores de CET
            const cetCells = table.querySelectorAll('td:nth-child(4)');
            cetCells.forEach(cell => {
                cell.setAttribute('data-tippy-content', 'Custo Efetivo Total - Inclui todos os encargos e tarifas');
            });
        });
    }

    // ========== Funções Auxiliares ==========
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} animate__animated animate__fadeInUp`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Remover após 5 segundos
        setTimeout(() => {
            alertDiv.classList.add('animate__fadeOutDown');
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 5000);
    }

    // ========== Inicializar Tooltips (se Tippy.js estiver incluído) ==========
    if (typeof tippy !== 'undefined') {
        tippy('[data-tippy-content]', {
            animation: 'fade',
            arrow: true,
            duration: 200,
            theme: 'light'
        });
    }
});

// Função para calcular CET (exemplo simplificado)
function calculateCET(principal, installments, monthlyRate) {
    // Esta é uma implementação simplificada - cálculos reais de CET são mais complexos
    const total = principal * Math.pow(1 + monthlyRate, installments);
    const annualRate = Math.pow(1 + monthlyRate, 12) - 1;
    return annualRate;
}