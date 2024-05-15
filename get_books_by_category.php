<?php
// Подключаемся к базе данных
require_once 'db.php';

// Начинаем сессию
session_start();

// Проверяем, есть ли пользователь в системе
if (isset($_SESSION['user_id'])) {
    // Получаем user_id из сессии
    $userId = $_SESSION['user_id'];

    // Получаем категорию книги, которую нужно загрузить (переданную через GET-запрос)
    if (isset($_GET['category'])) {
        $category = $_GET['category'];

        // Подготавливаем запрос к базе данных для получения данных книг и их дополнительных данных из userlibrary
        $stmt = $conn->prepare("SELECT books.title, books.genre, books.publication_date, books.book_img_path, books.author, userlibrary.rating, userlibrary.review, userlibrary.category
                                FROM userlibrary
                                INNER JOIN books ON userlibrary.book_id = books.book_id
                                WHERE userlibrary.user_id = ? AND (userlibrary.category = ? OR ? = '')
                                ORDER BY books.title");
        $stmt->bind_param("iss", $userId, $category, $category);

        // Выполняем запрос
        $stmt->execute();

        // Получаем результат запроса
        $result = $stmt->get_result();

        // Создаем массив для хранения данных книг
        $books = array();

        // Проверяем, были ли найдены данные книг
        if ($result->num_rows > 0) {
            // Перебираем результат и добавляем данные книг в массив
            while ($row = $result->fetch_assoc()) {
                $books[] = $row;
            }
        }

        // Возвращаем данные в формате JSON
        header('Content-Type: application/json');
        echo json_encode($books);
    } else {
        // Если категория книги не была передана, возвращаем ошибку
        echo "Ошибка: категория книги не была передана.";
    }
} else {
    // Если пользователь не найден в системе, возвращаем ошибку
    echo "Ошибка: пользователь не найден.";
}
?>
