// Проверка в реальном времени при вводе
document.getElementById('name').addEventListener('input', validateName);
document.getElementById('phone').addEventListener('input', validatePhone);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('category').addEventListener('change', validateCategory);
document.getElementById('message').addEventListener('input', validateMessage);


// Валидация имени
function validateName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    
    // Проверяем: только кириллица и пробелы, минимум 2 символа
    const nameRegex = /^[а-яёА-ЯЁ\s]{2,}$/;
    
    if (!nameRegex.test(name)) {
        showError(nameInput, 'Имя должно содержать только кириллицу и быть не менее 2 символов');
        return false;
    } else {
        clearError(nameInput);
        return true;
    }
}
// валидация телефона с форматированием
function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value.replace(/\D/g, ''); // Удаляем всё кроме цифр
    
    // Форматируем номер если есть цифры
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
        
        // Обновляем значение в поле
        phoneInput.value = formattedPhone;
    }
    
    // Проверяем: ровно 11 цифр
    if (phone.length !== 11) {
        showError(phoneInput, 'Телефон должен содержать 11 цифр');
        return false;
    } else {
        clearError(phoneInput);
        return true;
    }
}
// Запрет на всё кроме цифр
document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});

// Валидация email 
function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    
    // Проверяем стандартный формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Введите корректный email (например: ivanov@mail.ru)');
        return false;
    } else {
        clearError(emailInput);
        return true;
    }
}
// Валидация категорий
function validateCategory() {
    const categoryInput = document.getElementById('category');
    const category = categoryInput.value;
    
    // Проверяем: выбрана ли какая-то категория
    if (!category) {
        showError(categoryInput, 'Выберите категорию обращения');
        return false;
    } else {
        clearError(categoryInput);
        return true;
    }
}
// Валидация обращения
function validateMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    
    // Проверяем: от 10 до 500 символов
    if (message.length < 10) {
        showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
        return false;
    } else {
        clearError(messaeInput);
        return true;
    }
}
// Обработка ошибки
function showError(input, message) {
    // Добавляем красную обводку
    input.style.borderColor = '#dc3545';
    input.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.3)';
    
    // Показываем текст ошибки
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
// Очистка ошибки
function clearError(input) {
    // Убираем обводку
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    // Скрываем текст ошибки
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}
// Очистка ошибок при закрытии модалки
document.getElementById('cancel').addEventListener('click', function() {
    clearAllErrors();
    contactModal.close();
});

// Общая проверка выполнения валидаций
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

// Функция для отправки формы
function submitForm() {
    
    // Простая валидация
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);


    // Собираем данные формы
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };
    // В реальном приложении здесь был бы AJAX-запрос
    console.log('Данные формы:', data);

    // Показываем уведомление об успешной отправке
    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');

    // Закрываем модальное окно
    contactModal.close();

    // Очищаем форму
    form.reset();

    clearAllErrors();

}

// Закрытие модального окна по кнопке "Отмена"
document.getElementById('cancel').addEventListener('click', function () {
    contactModal.close();
});

// Закрытие модального окна по клику на фон
document.getElementById('contactModal').addEventListener('click', function (event) {
    if (event.target === this) {
        this.close();
    }
});

// Обработка отправки формы через Enter (предотвращаем стандартное поведение)
document.getElementById('feedbackForm').addEventListener('keypress',
    function (event) {
        if (event.key === 'Enter' && event.target.type !== 'textarea') {
            event.preventDefault();
        }
    });

    



   