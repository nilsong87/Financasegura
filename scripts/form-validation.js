document.addEventListener('DOMContentLoaded', function() {
    // Validação de todos os formulários da aplicação
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    markAsInvalid(input);
                } else {
                    // Validações específicas
                    if (input.type === 'email' && !isValidEmail(input.value)) {
                        isValid = false;
                        markAsInvalid(input, 'Por favor, insira um e-mail válido');
                    } else if (input.id === 'applicantCPF' && !isValidCPF(input.value)) {
                        isValid = false;
                        markAsInvalid(input, 'Por favor, insira um CPF válido');
                    } else if (input.type === 'tel' && !isValidPhone(input.value)) {
                        isValid = false;
                        markAsInvalid(input, 'Por favor, insira um telefone válido');
                    } else if (input.type === 'number' && input.min && parseFloat(input.value) < parseFloat(input.min)) {
                        isValid = false;
                        markAsInvalid(input, `O valor mínimo é ${formatCurrency(parseFloat(input.min))}`);
                    } else if (input.type === 'number' && input.max && parseFloat(input.value) > parseFloat(input.max)) {
                        isValid = false;
                        markAsInvalid(input, `O valor máximo é ${formatCurrency(parseFloat(input.max))}`);
                    } else {
                        markAsValid(input);
                    }
                }
            });
            
            // Checa se todos os checkboxes obrigatórios estão marcados
            const checkboxes = this.querySelectorAll('input[type="checkbox"][required]');
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    isValid = false;
                    markAsInvalid(checkbox, 'Este campo é obrigatório');
                } else {
                    markAsValid(checkbox);
                }
            });
            
            // Validação de arquivos
            const fileInputs = this.querySelectorAll('input[type="file"][required]');
            fileInputs.forEach(fileInput => {
                if (fileInput.files.length === 0) {
                    isValid = false;
                    markAsInvalid(fileInput, 'Por favor, selecione pelo menos um arquivo');
                } else {
                    let fileValid = true;
                    Array.from(fileInput.files).forEach(file => {
                        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
                        const maxSize = 5 * 1024 * 1024; // 5MB
                        if (!validTypes.includes(file.type)) {
                            isValid = false;
                            fileValid = false;
                            markAsInvalid(fileInput, 'Apenas arquivos PDF, JPG ou PNG são permitidos');
                        } else if (file.size > maxSize) {
                            isValid = false;
                            fileValid = false;
                            markAsInvalid(fileInput, 'O tamanho máximo por arquivo é 5MB');
                        }
                    });
                    if (fileValid) markAsValid(fileInput);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll até o primeiro campo inválido
                const firstInvalid = this.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (!this.value.trim()) {
                    markAsInvalid(this);
                    return;
                }
                // Validações específicas
                if (this.type === 'email' && !isValidEmail(this.value)) {
                    markAsInvalid(this, 'Por favor, insira um e-mail válido');
                } else if (this.id === 'applicantCPF' && !isValidCPF(this.value)) {
                    markAsInvalid(this, 'Por favor, insira um CPF válido');
                } else if (this.type === 'tel' && !isValidPhone(this.value)) {
                    markAsInvalid(this, 'Por favor, insira um telefone válido');
                } else if (this.type === 'number' && this.min && parseFloat(this.value) < parseFloat(this.min)) {
                    markAsInvalid(this, `O valor mínimo é ${formatCurrency(parseFloat(this.min))}`);
                } else if (this.type === 'number' && this.max && parseFloat(this.value) > parseFloat(this.max)) {
                    markAsInvalid(this, `O valor máximo é ${formatCurrency(parseFloat(this.max))}`);
                } else {
                    markAsValid(this);
                }
            });
            // Valida ao sair do campo
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    markAsInvalid(this);
                }
            });
        });
    });
    
    // Funções auxiliares
    function markAsInvalid(element, message = 'Este campo é obrigatório') {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        // Remove mensagem anterior
        let errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        // Para checkbox/radio, mostra após o label
        if (element.type === 'checkbox' || element.type === 'radio') {
            const label = element.closest('label') || element.parentElement.querySelector('label');
            if (label) {
                errorElement = label.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.remove();
                }
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = message;
                label.insertAdjacentElement('afterend', errorElement);
                return;
            }
        }
        // Para outros elementos
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        element.insertAdjacentElement('afterend', errorElement);
    }
    
    function markAsValid(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        // Remove mensagem de erro se existir
        const errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let sum = 0, rest;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }
    
    function isValidPhone(phone) {
        const re = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        return re.test(phone);
    }
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
});