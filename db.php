<?php
// Параметры подключения к базе данных
$servername = "localhost";
$username = "root";
$password = "3355example33";
$dbname = "booklistbd";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

echo "Подключение успешно";
?>
