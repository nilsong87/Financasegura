document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            // Fecha outros
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            // Alterna o item clicado
            faqItem.classList.toggle('active');
        });
    });
});
