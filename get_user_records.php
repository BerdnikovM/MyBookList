<?php
// Подключаемся к базе данных
require_once 'db.php';

// Получаем user_id пользователя из GET-параметров
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    // Подготавливаем запрос к базе данных для получения записей пользователя
    $stmt = $conn->prepare("SELECT * FROM userlibrary WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);

    // Выполняем запрос
    $stmt->execute();

    // Получаем результат запроса
    $result = $stmt->get_result();

    // Создаем массив для хранения записей пользователя
    $user_records = array();

    // Проверяем, найдены ли записи пользователя
    if ($result->num_rows > 0) {
        // Перебираем результат и добавляем записи в массив
        while ($row = $result->fetch_assoc()) {
            $user_records[] = $row;
        }
    }

    // Возвращаем данные в формате JSON
    header('Content-Type: application/json');
    echo json_encode($user_records);
} else {
    // Если user_id не был передан, возвращаем ошибку
    echo json_encode(array('error' => 'user_id не был передан'));
}
?>
