<?php
require_once 'db.php';

session_start();

$user_id = $_SESSION['user_id']; // Получаем ID текущего пользователя из сессии

// Запрос к базе данных
$query = "SELECT user_name, display_name, bio FROM users WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('i', $user_id);
$stmt->execute();
$stmt->store_result();

// Проверяем, есть ли результат
if ($stmt->num_rows > 0) {
    // Получаем результаты запроса
    $stmt->bind_result($user_name, $display_name, $bio);
    $stmt->fetch();

    // Формируем массив с данными
    $user_info = array(
        'user_name' => $user_name,
        'display_name' => $display_name,
        'bio' => $bio
    );

    // Отправляем данные в формате JSON
    echo json_encode($user_info);
} else {
    // Если пользователь не найден, возвращаем пустой JSON
    echo json_encode(array());
}

// Закрываем запрос и соединение с базой данных
$stmt->close();
$conn->close();
?>
