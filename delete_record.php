<?php
// Подключаемся к базе данных
require_once 'db.php';

// Получаем user_id и book_id из GET-параметров
if (isset($_GET['user_id']) && isset($_GET['book_id'])) {
    $user_id = $_GET['user_id'];
    $book_id = $_GET['book_id'];

    // Подготавливаем запрос к базе данных для удаления записи
    $stmt = $conn->prepare("DELETE FROM userlibrary WHERE user_id = ? AND book_id = ?");
    $stmt->bind_param("ii", $user_id, $book_id);

    // Выполняем запрос
    if ($stmt->execute()) {
        // Возвращаем сообщение об успешном удалении
        echo json_encode(array('success' => true, 'message' => 'Запись успешно удалена'));
    } else {
        // Если произошла ошибка при выполнении запроса, возвращаем сообщение об ошибке
        echo json_encode(array('success' => false, 'message' => 'Ошибка при удалении записи'));
    }
} else {
    // Если user_id или book_id не были переданы, возвращаем сообщение об ошибке
    echo json_encode(array('success' => false, 'message' => 'user_id или book_id не были переданы'));
}
?>
