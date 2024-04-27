<?php
// Подключаем файл с соединением с базой данных
require_once 'db.php';

// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверяем данные
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Проверяем, что все данные были введены
    if (empty($email) || empty($password)) {
        // Сохраняем сообщение об ошибке в сеансе
        session_start();
        $_SESSION['login_message'] = "Все поля должны быть заполнены.";
        // Перенаправляем пользователя обратно на страницу входа
        header("Location: login.php");
        exit; // Прекращаем выполнение скрипта
    } else {
        // Проверяем, является ли email валидным
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Сохраняем сообщение об ошибке в сеансе
            session_start();
            $_SESSION['login_message'] = "Неверный формат электронной почты.";
            // Перенаправляем пользователя обратно на страницу входа
            header("Location: login.php");
            exit; // Прекращаем выполнение скрипта
        } else {
            // Подготавливаем SQL-запрос для проверки пользователя
            $stmt = $conn->prepare("SELECT email, password FROM users WHERE email = ? LIMIT 1");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            // Если пользователь найден
            if ($stmt->num_rows > 0) {
                // Получаем хеш пароля из базы данных
                $stmt->bind_result($emailDb, $passwordHash);
                $stmt->fetch();

                // Сравниваем хеши
                if (password_verify($password, $passwordHash)) {
                    // Пользователь успешно вошел в систему
                    echo "Пользователь существует в базе данных.";
                } else {
                    // Сохраняем сообщение об ошибке в сеансе
                    session_start();
                    $_SESSION['login_message'] = "Неверный пароль.";
                    // Перенаправляем пользователя обратно на страницу входа
                    header("Location: login.php");
                    exit; // Прекращаем выполнение скрипта
                }
            } else {
                // Сохраняем сообщение об ошибке в сеансе
                session_start();
                $_SESSION['login_message'] = "Пользователь не существует в базе данных.";
                // Перенаправляем пользователя обратно на страницу входа
                header("Location: login.php");
                exit; // Прекращаем выполнение скрипта
            }
        }
    }
} else {
    // Форма не была отправлена
    // Перенаправляем пользователя обратно на страницу входа
    header("Location: login.php");
    exit; // Прекращаем выполнение скрипта
}
?>
