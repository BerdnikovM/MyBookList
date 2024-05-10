<?php
session_start();

// Подключение к базе данных
require_once 'db.php';

// Получение id пользователя из сессии
$user_id = $_SESSION['user_id'];

// Подготовка запроса для получения пути к аватару пользователя
$sql = "SELECT avatar_path FROM users WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($avatar_path);

// Получение результата запроса
$stmt->fetch();
$stmt->close();

// Возвращаем путь к аватару пользователя
echo $avatar_path;
?>
