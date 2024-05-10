<?php
// Подключаем файл с соединением с базой данных
require_once 'db.php';

// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $title = $_POST['title'];
    $genre = $_POST['genre'];
    $publication_date = $_POST['publication_date'];
    $annotation = $_POST['annotation'];
    $imagePath = $_POST['imagePath']; // Получаем путь к загруженному изображению

    // Проверяем, что все данные были получены
    if (empty($title) || empty($genre) || empty($publication_date) || empty($annotation) || empty($imagePath)) {
        // Ошибка: не все поля были заполнены
        http_response_code(400);
        echo "Не все поля были заполнены.";
        exit;
    }

    // Подготавливаем SQL-запрос для добавления книги в базу данных
    $stmt = $conn->prepare("INSERT INTO books (title, genre, publication_date, annotation, book_img_path) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        // Ошибка при подготовке запроса
        http_response_code(500);
        echo "Ошибка при подготовке запроса: " . $conn->error;
        exit;
    }
    // Привязываем параметры и выполняем запрос
    $stmt->bind_param("sssss", $title, $genre, $publication_date, $annotation, $imagePath);
    $result = $stmt->execute();
    if (!$result) {
        // Ошибка при выполнении запроса
        http_response_code(500);
        echo "Ошибка при выполнении запроса: " . $stmt->error;
        exit;
    }

    // Книга успешно добавлена
    echo "Книга успешно добавлена!";
    exit;
} else {
    // Форма не была отправлена
    http_response_code(405);
    echo "Метод не поддерживается.";
    exit;
}
?>
