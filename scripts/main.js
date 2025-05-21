document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ?
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');

            // Fecha outros abertos (opcional: remova se quiser múltiplos abertos)
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                }
            });

            // Alterna o item clicado
            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Inicializa todos fechados
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.style.maxHeight = null;
    });

    // Modal functionality
    const loanModal = document.getElementById('loanModal');
    const loginModal = document.getElementById('loginModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    // Open loan modal
    const requestLoanBtn = document.getElementById('requestLoan');
    if (requestLoanBtn && loanModal) {
        requestLoanBtn.addEventListener('click', function() {
            loanModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Open login modal
    const loginButtons = document.querySelectorAll('[href="#login"]');
    if (loginModal) {
        loginButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Close modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList && e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Multi-step form
    const nextButtons = document.querySelectorAll('[data-next]');
    const prevButtons = document.querySelectorAll('[data-prev]');

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepId = this.getAttribute('data-next');
            const nextStep = document.querySelector(`.form-step[data-step="${nextStepId}"]`);
            if (currentStep && nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStepId = this.getAttribute('data-prev');
            const prevStep = document.querySelector(`.form-step[data-step="${prevStepId}"]`);
            if (currentStep && prevStep) {
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                prevStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Show/hide password
    const showPasswordBtns = document.querySelectorAll('.show-password');
    showPasswordBtns.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            if (!passwordInput) return;
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            this.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
        });
    });

    // File upload preview
    const fileInput = document.getElementById('documents');
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');

    if (fileInput && uploadArea && uploadPreview) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            fileInput.files = e.dataTransfer.files;
            updateFilePreview();
        });

        fileInput.addEventListener('change', updateFilePreview);

        function updateFilePreview() {
            uploadPreview.innerHTML = '';
            if (fileInput.files.length > 0) {
                Array.from(fileInput.files).forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    fileItem.innerHTML = `
                        <span>${file.name}</span>
                        <i class="fas fa-times"></i>
                    `;
                    const removeBtn = fileItem.querySelector('i');
                    removeBtn.addEventListener('click', function() {
                        fileItem.remove();
                        // Atualiza FileList removendo o arquivo
                        const dataTransfer = new DataTransfer();
                        Array.from(fileInput.files)
                            .filter(f => f.name !== file.name)
                            .forEach(f => dataTransfer.items.add(f));
                        fileInput.files = dataTransfer.files;
                        updateFilePreview();
                    });
                    uploadPreview.appendChild(fileItem);
                });
            }
        }
    }

    // Initialize form masks
    if (typeof $ !== 'undefined' && typeof $.fn.mask === 'function') {
        $('#applicantCPF').mask('000.000.000-00', {reverse: true});
        $('#applicantPhone').mask('(00) 00000-0000');
        $('#applicantCEP').mask('00000-000');
        $('#contactPhone').mask('(00) 00000-0000');
        $('#loginCPF').mask('000.000.000-00', {reverse: true});
    }

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

    const loanApplicationForm = document.getElementById('loanApplicationForm');
    if (loanApplicationForm && loanModal) {
        loanApplicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Solicitação de empréstimo enviada com sucesso! Nossa equipe entrará em contato para finalizar o processo.');
            this.reset();
            loanModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm && loginModal) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login realizado com sucesso! Redirecionando para a área do cliente...');
            this.reset();
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado por assinar nossa newsletter!');
            this.reset();
        });
    }
});