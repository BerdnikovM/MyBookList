<?php
session_start();

// Проверка, был ли отправлен файл
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    // Получение данных о загруженном файле
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileName = basename($_FILES['file']['name']);
    $fileSize = $_FILES['file']['size'];
    $fileType = $_FILES['file']['type'];

    // Проверка формата файла
    $allowedFormats = array('image/jpeg', 'image/png');
    if (!in_array($fileType, $allowedFormats)) {
        echo "Ошибка: Недопустимый формат файла. Используйте JPG или PNG";
        exit;
    }

    // Проверка размера файла
    if ($fileSize > 2 * 1024 * 1024) {
        echo "Ошибка: Максимальный размер файла - 2 МБ";
        exit;
    }

    // Получение id пользователя из сессии
    $userId = $_SESSION['user_id'];

    // Путь для сохранения файла
    $uploadDir = 'images/user-avatar-img/';
    $uploadFile = $uploadDir . $userId . '-' . $fileName;

    // Перемещение файла в указанную директорию
    if (move_uploaded_file($fileTmpName, $uploadFile)) {
        // Подключение к базе данных
        require_once 'db.php';

        // Обновление записи в базе данных
        $sql = "UPDATE users SET avatar_path = ? WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $uploadFile, $userId);
        $stmt->execute();
        $stmt->close();

        echo "success";
    } else {
        echo "Ошибка загрузки файла.";
    }
} else {
    echo "Ошибка при получении файла.";
}
?>
