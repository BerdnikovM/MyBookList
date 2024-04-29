<?php
// Подключение к базе данных
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Хэширование пароля
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Подготовленный запрос для вставки данных
    $stmt = $conn->prepare("INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    // Выполнение запроса
    if ($stmt->execute()) {
        // Если данные успешно добавлены, перенаправляем пользователя на страницу входа
        header("Location: login.php");
        exit();
    } else {
        // Если произошла ошибка, выдаем сообщение об ошибке
        echo "Ошибка: " . $stmt->error;
    }

    // Закрытие подготовленного запроса и соединения с базой данных
    $stmt->close();
    $conn->close();
}
?>
