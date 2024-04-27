// Получаем элементы формы
const form = document.querySelector('form');
const emailInput = document.getElementById('email');

// Функция для проверки валидности email
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Обработчик события отправки формы
form.addEventListener('submit', function(event) {
    // Проверяем валидность email
    if (!validateEmail(emailInput.value)) {
        // Если email невалиден, отменяем отправку формы
        event.preventDefault();
        // Подсвечиваем поле email красным цветом
        emailInput.style.borderColor = 'red';
        // Добавляем сообщение об ошибке
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Неправильный формат email';
        errorMessage.style.color = 'red';
        form.insertBefore(errorMessage, emailInput.nextSibling);
    }
});
