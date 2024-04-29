<?php
session_start();
header('Content-Type: application/json');

// Проверяем, аутентифицирован ли пользователь
$authenticated = isset($_SESSION['user_id']);

// Проверяем, является ли пользователь администратором
$isAdmin = isset($_SESSION['is_admin']) ? (bool)$_SESSION['is_admin'] : false;

// Возвращаем статус аутентификации и информацию о том, является ли пользователь администратором, в виде JSON
echo json_encode(array('authenticated' => $authenticated, 'isAdmin' => $isAdmin));
?>
