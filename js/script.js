document.getElementById('name').addEventListener('input', validateName);
document.getElementById('phone').addEventListener('input', validatePhone);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('category').addEventListener('change', validateCategory);
document.getElementById('message').addEventListener('input', validateMessage);


function validateName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    
    const nameRegex = /^[а-яёА-ЯЁ\s]{2,}$/;
    
    if (!nameRegex.test(name)) {
        showError(nameInput, 'Имя должно содержать только кириллицу и быть не менее 2 символов');
        return false;
    } else {
        clearError(nameInput);
        return true;
    }
}

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value.replace(/\D/g, '');
    
    let formattedPhone = '';
    if (phone.length > 0) {
        formattedPhone = '+7 (';
        if (phone.length > 1) {
            formattedPhone += phone.substring(1, 4);
        }
        if (phone.length >= 4) {
            formattedPhone += ') ' + phone.substring(4, 7);
        }
        if (phone.length >= 7) {
            formattedPhone += '-' + phone.substring(7, 9);
        }
        if (phone.length >= 9) {
            formattedPhone += '-' + phone.substring(9, 11);
        }
        
        phoneInput.value = formattedPhone;
    }
    
    if (phone.length !== 11) {
        showError(phoneInput, 'Телефон должен содержать 11 цифр');
        return false;
    } else {
        clearError(phoneInput);
        return true;
    }
}


function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Введите корректный email (например: ivanov@mail.ru)');
        return false;
    } else {
        clearError(emailInput);
        return true;
    }
}

function validateCategory() {
    const categoryInput = document.getElementById('category');
    const category = categoryInput.value;
    
    if (!category) {
        showError(categoryInput, 'Выберите категорию обращения');
        return false;
    } else {
        clearError(categoryInput);
        return true;
    }
}

function validateMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    
    if (message.length < 10) {
        showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
        return false;
    } else {
        clearError(messaeInput);
        return true;
    }
}

function showError(input, message) {
    input.style.borderColor = '#dc3545';
    input.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.3)';
    
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

document.getElementById('cancel').addEventListener('click', function() {
    clearAllErrors();
    contactModal.close();
});


function validateForm() {
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isCategoryValid = validateCategory();
    const isMessageValid = validateMessage();
    
    return isNameValid && isPhoneValid && isEmailValid && isCategoryValid && isMessageValid;
}

function clearAllErrors() {
    const inputs = document.querySelectorAll('#feedbackForm input, #feedbackForm select, #feedbackForm textarea');
    inputs.forEach(input => {
        clearError(input);
    });
}

function submitForm() {
    
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };

    console.log('Данные формы:', data);


    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');


    contactModal.close();


    form.reset();

    clearAllErrors();

}

document.getElementById('cancel').addEventListener('click', function () {
    contactModal.close();
});

document.getElementById('contactModal').addEventListener('click', function (event) {
    if (event.target === this) {
        this.close();
    }
});

document.getElementById('feedbackForm').addEventListener('keypress',
    function (event) {
        if (event.key === 'Enter' && event.target.type !== 'textarea') {
            event.preventDefault();
    }
});

    



   