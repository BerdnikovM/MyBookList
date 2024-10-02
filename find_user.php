<?php
// Подключаемся к базе данных
require_once 'db.php';

// Получаем email пользователя из GET-параметров
if (isset($_GET['email'])) {
    $email = $_GET['email'];

    // Подготавливаем запрос к базе данных для поиска пользователя по email
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);

    // Выполняем запрос
    $stmt->execute();

    // Получаем результат запроса
    $result = $stmt->get_result();

    // Проверяем, найден ли пользователь
    if ($result->num_rows > 0) {
        // Получаем данные пользователя
        $user = $result->fetch_assoc();

        // Возвращаем данные пользователя в формате JSON
        header('Content-Type: application/json');
        echo json_encode($user);
    } else {
        // Если пользователь не найден, возвращаем ошибку
        echo json_encode(array('error' => 'Пользователь не найден'));
    }
} else {
    // Если email пользователя не был передан, возвращаем ошибку
    echo json_encode(array('error' => 'Email пользователя не был передан'));
}
?>
