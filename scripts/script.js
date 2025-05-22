document.querySelectorAll('.faq-modern-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.faq-modern-card');
    // Fecha outros
    document.querySelectorAll('.faq-modern-card').forEach(item => {
      if (item !== card) item.classList.remove('active');
    });
    // Alterna o card clicado
    card.classList.toggle('active');
  });
});