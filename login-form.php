<?php
// Подключаем файл с соединением с базой данных
require_once 'db.php';

session_start();

// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверяем данные
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Проверяем, что все данные были введены
    if (empty($email) || empty($password)) {
        // Сохраняем сообщение об ошибке в сеансе
        
        $_SESSION['login_message'] = "Все поля должны быть заполнены.";
        // Перенаправляем пользователя обратно на страницу входа
        header("Location: login.php");
        exit; // Прекращаем выполнение скрипта
    } else {
        // Проверяем, является ли email валидным
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Сохраняем сообщение об ошибке в сеансе
            
            $_SESSION['login_message'] = "Неверный формат электронной почты.";
            // Перенаправляем пользователя обратно на страницу входа
            header("Location: login.php");
            exit; // Прекращаем выполнение скрипта
        } else {
            // Подготавливаем SQL-запрос для проверки пользователя
            $stmt = $conn->prepare("SELECT user_id, email, password, is_admin FROM users WHERE email = ? LIMIT 1");
            if (!$stmt) {
                die("Ошибка при подготовке запроса: " . $conn->error);
            }
            $stmt->bind_param("s", $email);
            $result = $stmt->execute();
            if (!$result) {
                die("Ошибка при выполнении запроса: " . $stmt->error);
            }
            $stmt->store_result();

            // Если пользователь найден
            if ($stmt->num_rows > 0) {
                // Получаем данные пользователя из базы данных
                $stmt->bind_result($user_id, $emailDb, $passwordHash, $is_admin);
                $stmt->fetch();

                // Сравниваем хеши паролей
                if (password_verify($password, $passwordHash)) {
                    // Пользователь успешно вошел в систему
                    $_SESSION['user_id'] = $user_id; // Сохраняем ID пользователя в сессии
                    if ($is_admin) {
                        $_SESSION['is_admin'] = true; // Устанавливаем флаг администратора в сессии
                    }
                    header("Location: index.html"); // Перенаправляем на главную страницу
                    exit; // Прекращаем выполнение скрипта
                } else {
                    // Сохраняем сообщение об ошибке в сеансе
                    
                    $_SESSION['login_message'] = "Неверный пароль.";
                    // Перенаправляем пользователя обратно на страницу входа
                    header("Location: login.php");
                    exit; // Прекращаем выполнение скрипта
                }
            } else {
                // Сохраняем сообщение об ошибке в сеансе
                
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
