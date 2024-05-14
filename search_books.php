<?php
// Подключение к базе данных
require_once 'db.php';

// Получение поискового запроса из GET параметра
$searchQuery = $_GET['query'];

// Выполнение поиска книг в базе данных по подстроке в названии
// Здесь необходимо выполнить SQL запрос к базе данных для поиска книг по названию
$sql = "SELECT * FROM books WHERE title LIKE '%$searchQuery%'";
$result = mysqli_query($conn, $sql); // Заменено $connection на $conn

// Проверка наличия результатов
if ($result) {
    // Формирование массива для хранения найденных книг
    $books = [];

    // Обработка результатов запроса
    while ($row = mysqli_fetch_assoc($result)) {
        // Добавление информации о книге в массив
        $books[] = [
            'title' => $row['title'],
            'genre' => $row['genre'],
            'date' => $row['publication_date'],
            'cover' => $row['book_img_path'], // Путь к обложке книги в базе данных
            'Author' => $row['Author']
        ];
    }

    // Вывод результатов в формате JSON
    echo json_encode($books);
} else {
    // В случае ошибки выводим сообщение
    echo json_encode(['error' => 'Ошибка при выполнении запроса']);
}

// Закрытие соединения с базой данных
mysqli_close($conn); // Заменено $connection на $conn
?>
