// Переменная для хранения состояния меню (открыто/закрыто)
var menuOpen = false;


// // Обработка нажатия кнопки "Аватар пользователя"
function toggleUserMenu() {
    // Если меню открыто, закрываем его и выходим из функции
    if (menuOpen) {
        var userMenu = document.getElementById('userMenu');
        userMenu.style.display = 'none';
        menuOpen = false;
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'check_auth.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var authenticated = JSON.parse(xhr.responseText).authenticated;
                if (authenticated) {
                    // Отображаем контекстное меню
                    var userMenu = document.getElementById('userMenu');
                    userMenu.style.display = 'block';

                    // Устанавливаем состояние меню как открытое
                    menuOpen = true;

                    // Назначаем обработчики нажатия кнопок меню
                    document.getElementById('AdminButton').addEventListener('click', function() {
                        window.location.href = 'adminPanel.php';
                    });
                    document.getElementById('settingsButton').addEventListener('click', goToSettings);
                    document.getElementById('logoutButton').addEventListener('click', logoutUser);
                } else {
                    window.location.href = 'login.php';
                }
            } else {
                console.error('Ошибка при выполнении запроса:', xhr.status);
            }
        }
    };
    xhr.send();
}

function goToSettings() {
    // Перенаправляем пользователя на страницу настроек
    window.location.href = 'user-settings.html';
}


function logoutUser() {
    // Отправляем запрос на сервер для выполнения выхода из аккаунта
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'logout.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Очищаем данные о текущем пользователе на клиентской стороне
                // Например, можно удалить данные из сессии или локального хранилища
                // В данном примере предполагается использование сессий

                // Удаляем сессию
                var xhrLogout = new XMLHttpRequest();
                xhrLogout.open('GET', 'logout.php', true);
                xhrLogout.onreadystatechange = function() {
                    if (xhrLogout.readyState === XMLHttpRequest.DONE) {
                        if (xhrLogout.status === 200) {
                            // Перенаправляем пользователя на страницу входа
                            window.location.href = 'login.php';
                        } else {
                            console.error('Ошибка при выполнении запроса:', xhrLogout.status);
                        }
                    }
                };
                xhrLogout.send();
            } else {
                console.error('Ошибка при выполнении запроса:', xhr.status);
            }
        }
    };
    xhr.send();
}

function checkAuthorizationOnLoad() {
    var isAuthenticated = getCookie('authenticated');
    var isAdmin = getCookie('is_admin');

    if (isAuthenticated) {
        var myBookBtn = document.getElementById('my-books-link');
        myBookBtn.style.display = 'inline';
        
        var adminBtn = document.getElementById('AdminButton');
        if (isAdmin) {
            adminBtn.style.display = 'inline';
        } else {
            adminBtn.style.display = 'none';
        }
    }
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Функция для загрузки пути к аватару пользователя
function loadAvatar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_avatar_path.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var avatarPath = xhr.responseText;
                // Находим элемент img с id 'avatar-img' и меняем его src на путь к аватару пользователя
                var avatarImg = document.getElementById('avatar-img');
                avatarImg.src = avatarPath ? avatarPath : 'images/default-avatar.png';
            } else {
                console.error('Ошибка при загрузке аватара:', xhr.status);
            }
        }
    };
    xhr.send();
}


// Вызываем функции при загрузке страницы
window.addEventListener('load', function() {
    loadAvatar(); // Добавляем вызов функции загрузки аватара при загрузке страницы
});

// Вызываем функцию при загрузке страницы
checkAuthorizationOnLoad();
document.getElementById('avatarButton').addEventListener('click', toggleUserMenu);


