<?php
require_once 'db.php'; // Подключаем файл для соединения с базой данных

// Получаем название книги из запроса
$bookTitle = $_POST['title'];

// Запрос к базе данных для получения ID книги по её названию
$sql = "SELECT book_id FROM books WHERE title = '$bookTitle'";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo $row["book_id"]; // Возвращаем ID книги
    } else {
        echo "Книга с таким названием не найдена";
    }
} else {
    echo "Ошибка при выполнении запроса: " . $conn->error; // Выводим сообщение об ошибке, если запрос завершился неудачно
}

$conn->close(); // Закрываем соединение с базой данных
?>
