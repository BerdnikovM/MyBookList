<?php
// Подключаемся к базе данных
require_once 'db.php';

// Проверяем, был ли отправлен POST запрос
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из POST запроса
    $username = $_POST['username'];
    $displayName = $_POST['display-name'];
    $bio = $_POST['bio'];

    // Обновляем данные пользователя в базе данных
    $query = "UPDATE users SET display_name = ?, bio = ? WHERE user_name = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sss', $displayName, $bio, $username);
    if ($stmt->execute()) {
        // Отправляем успешный ответ
        http_response_code(200);
        echo json_encode(array('success' => true));
    } else {
        // Отправляем ответ об ошибке
        http_response_code(500);
        echo json_encode(array('success' => false, 'message' => 'Ошибка при обновлении данных пользователя'));
    }

    // Закрываем запрос и соединение с базой данных
    $stmt->close();
    $conn->close();
} else {
    // Если запрос не является POST запросом, отправляем ответ о ошибке
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Неверный метод запроса'));
}
?>
