<?php
require_once 'db.php'; // Подключаем файл для соединения с базой данных
session_start(); // Запускаем сессию

// Получаем данные о книге из POST запроса
$bookId = $_POST['book_id'];
$category = $_POST['category'];
$rating = $_POST['rating'];
$review = $_POST['review'];

// Получаем ID пользователя из сессии
$userId = $_SESSION['user_id'];

// Запрос к базе данных для добавления книги в библиотеку пользователя
$dateAdded = date("Y-m-d"); // Получаем сегодняшнюю дату
$sql = "INSERT INTO userlibrary (user_id, book_id, category, rating, review, date_added) VALUES ('$userId', '$bookId', '$category', '$rating', '$review', '$dateAdded')";

if ($conn->query($sql) === TRUE) {
    echo "Книга успешно добавлена в вашу библиотеку!";
} else {
    echo "Ошибка при добавлении книги: " . $conn->error;
}

$conn->close(); // Закрываем соединение с базой данных
?>
