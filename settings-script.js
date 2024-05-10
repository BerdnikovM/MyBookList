// Функция для получения информации о пользователе и заполнения полей формы
function getUserInfo() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_user_info.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var userInfo = JSON.parse(xhr.responseText);
                document.getElementById('username').value = userInfo.user_name;
                document.getElementById('display-name').value = userInfo.display_name;
                document.getElementById('bio').value = userInfo.bio;
            } else {
                console.error('Ошибка при получении информации о пользователе:', xhr.status);
            }
        }
    };
    xhr.send();
}

// Функция для загрузки пути к аватару пользователя
function loadAvatar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_avatar_path.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var avatarPath = xhr.responseText;
                document.getElementById('avatar-img').src = avatarPath ? avatarPath : 'images/default-avatar.png';
                document.getElementById('avatar-img2').src = avatarPath ? avatarPath : 'images/default-avatar.png';
            } else {
                console.error('Ошибка при загрузке аватара:', xhr.status);
            }
        }
    };
    xhr.send();
}

// Вызываем функции при загрузке страницы
window.addEventListener('load', function() {
    getUserInfo();
    loadAvatar();
});


document.getElementById('save-button').addEventListener('click', function(event) {
    // Отменяем стандартное поведение кнопки, чтобы страница не перезагружалась
    event.preventDefault();

    // Получаем данные из формы
    var username = document.getElementById('username').value.trim();
    var displayName = document.getElementById('display-name').value.trim();
    var bio = document.getElementById('bio').value.trim();

    // Создаем объект FormData для передачи данных формы на сервер
    var formData = new FormData();
    formData.append('username', username);
    formData.append('display-name', displayName);
    formData.append('bio', bio);

    // Создаем AJAX запрос
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'update_user_info.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Обработка успешного ответа от сервера
                updateStatusMessage('Данные успешно обновлены!', false);
            } else {
                // Обработка ошибки
                updateStatusMessage('Ошибка при обновлении данных:', true);
            }
        }
    };
    // Отправляем запрос на сервер
    xhr.send(formData);
});

function updateStatusMessage(message, isError) {
    var statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? 'red' : 'green';
}

// Вызываем функцию при загрузке страницы
// window.addEventListener('load', getUserInfo);






document.addEventListener("DOMContentLoaded", function() {
    var changeImgButton = document.getElementById("change-img");
    var fileInput = document.getElementById("file-input");
    var avatarImg = document.getElementById("avatar-img");

    // Обработчик события для кнопки "Изменить изображение"
    changeImgButton.addEventListener("click", function() {
        fileInput.click();
    });

    // Обработчик события при выборе файла
    fileInput.addEventListener("change", function() {
        var file = fileInput.files[0];
        if (file) {
            // Проверка размера файла
            if (file.size > 2 * 1024 * 1024) {
                console.log("Ошибка: Максимальный размер файла - 2 МБ");
                return;
            }
            // Проверка формата файла
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                console.log("Ошибка: Недопустимый формат файла. Используйте JPG или PNG");
                return;
            }
            // Создание объекта FileReader
            var reader = new FileReader();
            // Обработчик события при завершении чтения файла
            reader.onload = function(event) {
                avatarImg.src = event.target.result;
                // Отправка файла на сервер
                uploadFile(file);
            };
            // Чтение файла как Data URL
            reader.readAsDataURL(file);
        }
    });

    // Функция для загрузки файла на сервер
    function uploadFile(file) {
        var formData = new FormData();
        formData.append('file', file);
        // Создание AJAX запроса
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload_avatar.php', true);
        // Обработчик события при завершении загрузки файла
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("Изображение успешно загружено.");
            } else {
                console.log("Ошибка загрузки изображения.");
            }
        };
        // Отправка запроса на сервер
        xhr.send(formData);
    }
});
