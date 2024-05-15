<?php
// Начинаем сессию
session_start();

// Подключаемся к базе данных
require_once 'db.php';

// Проверяем, был ли установлен user_id в сессии
if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Подготавливаем запрос к базе данных для получения данных пользователя
    $stmt = $conn->prepare("SELECT user_name, display_name, avatar_path, bio FROM users WHERE user_id = ?");
    $stmt->bind_param("s", $userId);

    // Выполняем запрос
    $stmt->execute();

    // Получаем результат запроса
    $result = $stmt->get_result();

    // Проверяем, были ли найдены данные пользователя
    if ($result->num_rows > 0) {
        // Получаем данные пользователя
        $userData = $result->fetch_assoc();

        // Возвращаем данные в формате JSON
        header('Content-Type: application/json');
        echo json_encode($userData);
    } else {
        // Если пользователь не найден, возвращаем пустой JSON
        echo json_encode(array());
    }
} else {
    // Если user_id не был установлен в сессии, возвращаем ошибку
    echo "Ошибка: user_id не был установлен в сессии.";
}
?>
