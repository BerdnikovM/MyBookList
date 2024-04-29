// Переменная для хранения состояния меню (открыто/закрыто)
var menuOpen = false;

// Обработка нажатия кнопки "Аватар пользователя"
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
    // Действия при нажатии на кнопку "Настройки"
    console.log('Открыть страницу настроек');
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

// Проверка авторизации при загрузке страницы
function checkAuthorizationOnLoad() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'check_auth.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var authenticated = response.authenticated;
                var isAdmin = response.isAdmin;
                var myBookBtn = document.getElementById('my-books-link');
                var adminBtn = document.getElementById('AdminButton');

                if (authenticated) {
                    // Пользователь авторизован, показываем кнопку "Мои книги"
                    myBookBtn.style.display = 'inline';
                    
                    // Если пользователь администратор, показываем кнопку "Admin"
                    if (isAdmin) {
                        adminBtn.style.display = 'inline';
                    } else {
                        adminBtn.style.display = 'none';
                    }
                } else {
                    // Пользователь не авторизован, скрываем обе кнопки
                    myBookBtn.style.display = 'none';
                    adminBtn.style.display = 'none';
                }
            } else {
                console.error('Ошибка при выполнении запроса:', xhr.status);
            }
        }
    };
    xhr.send();
}


// Вызываем функцию при загрузке страницы
window.addEventListener('load', checkAuthorizationOnLoad);

document.getElementById('avatarButton').addEventListener('click', toggleUserMenu);
