document.addEventListener('DOMContentLoaded', function() {
    // Form validation for all forms in the application
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
                    markAsValid(input);
                    
                    // Additional validation for specific fields
                    if (input.type === 'email' && !isValidEmail(input.value)) {
                        isValid = false;
                        markAsInvalid(input, 'Por favor, insira um e-mail válido');
                    }
                    
                    if (input.id === 'applicantCPF' && !isValidCPF(input.value)) {
                        isValid = false;
                        markAsInvalid(input, 'Por favor, insira um CPF válido');
                    }
                    
                    if (input.type === 'tel' && !isValidPhone(input.value)) {
                        isValid = false;
                        markAsInvalid(input, 'Por favor, insira um telefone válido');
                    }
                    
                    if (input.type === 'number' && input.min && parseFloat(input.value) < parseFloat(input.min)) {
                        isValid = false;
                        markAsInvalid(input, `O valor mínimo é ${formatCurrency(parseFloat(input.min))}`);
                    }
                    
                    if (input.type === 'number' && input.max && parseFloat(input.value) > parseFloat(input.max)) {
                        isValid = false;
                        markAsInvalid(input, `O valor máximo é ${formatCurrency(parseFloat(input.max))}`);
                    }
                }
            });
            
            // Check if all required checkboxes are checked
            const checkboxes = this.querySelectorAll('input[type="checkbox"][required]');
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    isValid = false;
                    markAsInvalid(checkbox, 'Este campo é obrigatório');
                } else {
                    markAsValid(checkbox);
                }
            });
            
            // Validate file uploads if present
            const fileInputs = this.querySelectorAll('input[type="file"][required]');
            fileInputs.forEach(fileInput => {
                if (fileInput.files.length === 0) {
                    isValid = false;
                    markAsInvalid(fileInput, 'Por favor, selecione pelo menos um arquivo');
                } else {
                    markAsValid(fileInput);
                    
                    // Validate file types and sizes
                    Array.from(fileInput.files).forEach(file => {
                        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
                        const maxSize = 5 * 1024 * 1024; // 5MB
                        
                        if (!validTypes.includes(file.type)) {
                            isValid = false;
                            markAsInvalid(fileInput, 'Apenas arquivos PDF, JPG ou PNG são permitidos');
                        }
                        
                        if (file.size > maxSize) {
                            isValid = false;
                            markAsInvalid(fileInput, 'O tamanho máximo por arquivo é 5MB');
                        }
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first invalid field
                const firstInvalid = this.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    markAsValid(this);
                    
                    // Additional validation
                    if (this.type === 'email' && !isValidEmail(this.value)) {
                        markAsInvalid(this, 'Por favor, insira um e-mail válido');
                    }
                    
                    if (this.id === 'applicantCPF' && !isValidCPF(this.value)) {
                        markAsInvalid(this, 'Por favor, insira um CPF válido');
                    }
                    
                    if (this.type === 'tel' && !isValidPhone(this.value)) {
                        markAsInvalid(this, 'Por favor, insira um telefone válido');
                    }
                    
                    if (this.type === 'number' && this.min && parseFloat(this.value) < parseFloat(this.min)) {
                        markAsInvalid(this, `O valor mínimo é ${formatCurrency(parseFloat(this.min))}`);
                    }
                    
                    if (this.type === 'number' && this.max && parseFloat(this.value) > parseFloat(this.max)) {
                        markAsInvalid(this, `O valor máximo é ${formatCurrency(parseFloat(this.max))}`);
                    }
                }
            });
            
            // Validate on blur (when leaving the field)
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    markAsInvalid(this);
                }
            });
        });
    });
    
    // Helper functions
    function markAsInvalid(element, message = 'Este campo é obrigatório') {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        
        // Remove existing error message
        let errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // For checkboxes and radios, show message after the label
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
        
        // Add error message for other elements
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
        
        // Remove error message if exists
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
        
        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        
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