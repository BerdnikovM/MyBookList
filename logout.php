<?php
// Инициализация сеанса
session_start();

// Уничтожение всех данных сеанса
session_destroy();

// Удаление куков аутентификации и роли администратора
setcookie('authenticated', '', time() - 3600, '/');
setcookie('is_admin', '', time() - 3600, '/');

// Перенаправление пользователя на страницу входа или другую страницу, где он будет перезагружен
header("Location: login.php");
exit; // Прекращение выполнения скрипта
?>
