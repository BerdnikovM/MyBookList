<?php
// Путь для сохранения изображений книг
$targetDir = "images/book-img/";

// Получаем имя файла
$fileName = basename($_FILES["image"]["name"]);
$targetFilePath = $targetDir . $fileName;
$fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

// Проверяем, является ли файл изображением
$allowTypes = array('jpg', 'jpeg', 'png');
if (in_array($fileType, $allowTypes)) {
    // Перемещаем загруженное изображение в папку назначения
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        echo $targetFilePath;
    } else {
        echo "Ошибка при загрузке изображения.";
    }
} else {
    echo "Допустимые форматы: JPG, JPEG, PNG.";
}
?>
