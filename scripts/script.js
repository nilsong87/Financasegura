document.addEventListener('DOMContentLoaded', function () {
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach((btn, idx) => {
        // Acessibilidade: ids únicos e aria-controls
        const answer = btn.closest('.faq-item').querySelector('.faq-answer');
        if (answer && !answer.id) answer.id = `faq-answer-${idx}`;
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', answer ? answer.id : '');

        btn.addEventListener('click', function () {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');

            // Fecha outros abertos
            document.querySelectorAll('.faq-item').forEach(item => {
                const q = item.querySelector('.faq-question');
                const ans = item.querySelector('.faq-answer');
                if (item !== faqItem) {
                    item.classList.remove('active');
                    if (ans) ans.style.maxHeight = null;
                    if (q) q.setAttribute('aria-expanded', 'false');
                }
            });

            // Alterna o item clicado
            const isActive = faqItem.classList.toggle('active');
            this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            if (isActive && answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else if (answer) {
                answer.style.maxHeight = null;
            }
        });
    });

    // Inicializa todos fechados
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.style.maxHeight = null;
    });

    // FAQ Search
    const faqSearchForm = document.getElementById('faqSearchForm');
    const faqSearchInput = document.getElementById('faqSearchInput');
    if (faqSearchForm && faqSearchInput) {
        faqSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const searchTerm = faqSearchInput.value.trim().toLowerCase();

            if (searchTerm === '') {
                // Reset all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.style.display = '';
                    item.classList.remove('active');
                    const ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                    const q = item.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                return;
            }

            let found = false;
            document.querySelectorAll('.faq-item').forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer') ? item.querySelector('.faq-answer').textContent.toLowerCase() : '';
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = '';
                    item.classList.add('active');
                    const ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
                    const q = item.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'true');
                    found = true;
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                    const ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                    const q = item.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                }
            });
            if (!found) {
                alert('Nenhum resultado encontrado para: ' + searchTerm);
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Newsletter Form (exemplo)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email && email.includes('@')) {
                alert('Obrigado por se inscrever! Em breve você receberá novidades.');
                this.reset();
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
});