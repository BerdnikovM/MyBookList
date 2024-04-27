<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <title>Вход | MyBookList</title>
</head>
<body>
    <header>
        <div class="header-top">
            <a href="/index.html" class="logo"><img src="images/MyBookListLogo.png" alt="Логотип сайта"></a>
        </div>
    </header>
    <main class="login">
        <div class="login-form">
            <h1>Вход</h1>
            <form id="login-form" action="login-form.php" method="post"> <!-- Указываем путь к файлу обработки и метод передачи данных -->
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required> <!-- Добавляем атрибут name для идентификации поля на сервере -->
                <label for="password">Пароль</label>
                <input type="password" id="password" name="password" required> <!-- Аналогично добавляем атрибут name -->
                <button type="submit">Войти</button> <!-- Указываем тип кнопки -->
            </form>
            <div id="login-message">
                <?php
                // Выводим сообщение из сеанса, если оно существует
                session_start();
                if (isset($_SESSION['login_message'])) {
                    echo $_SESSION['login_message'];
                    unset($_SESSION['login_message']); // Удаляем сообщение из сеанса после вывода
                }
                ?>
            </div>
            <p class="register-link">Нету аккаунта? <a href="/register.html">Зарегистрироваться</a></p>
        </div>
    </main>
</body>
</html>
