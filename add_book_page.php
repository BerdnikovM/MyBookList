<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <title>Добавить книгу | MyBookList</title>
</head>
<body>
<header>
        <div class="header-top">
            <a href="/index.html" class="logo"><img src="images/MyBookListLogo.png" alt="Логотип сайта"></a>
            <div class="right">
                <nav>
                    <ul>
                        <li><a href="/index.html">Главная</a></li>
                        <li><a href="/about.html">О нас</a></li>
                        <li><a href="/myBooks.php" id="my-books-link" style="display: none;">Мои книги</a></li>
                    </ul>
                </nav>
                <div class="user-avatar">
                    <button class="avatar-button" aria-label="User menu" role="button" id="avatarButton">
                        <div class="avatar">
                            <img id="avatar-img" src="images/default-avatar.png" alt="Аватар пользователя">
                        </div>
                    </button>
                    <!-- Контекстное меню -->
                    <div id="userMenu" class="user-menu" style="display: none;">
                        <button id="AdminButton" style="display: none;">Admin</button>
                        <button id="settingsButton">Настройки</button>
                        <button id="logoutButton">Выход</button>
                    </div>
                </div>                
                <div class="wrap">
                    <button class="button">+Книга</button>
                </div>
            </div>
        </div>
    </header>
    <main>
        <div class="container">
            <h1 class="add_book_page_title">Найти книгу</h1>
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Введите название книги">
                <input type="submit" value="Найти" id="searchButton">
            </div>
            <div id="bookList" class="book-list" >
                
            </div>
            <div id="addBookForm" class="add-book-form" style="display: none;">
                <div class="editing-book-details">
                    <div class="editing-book-cover">
                        <img src="#" alt="Обложка книги">
                    </div>
                    <div>
                        <span id="ratingValue">0</span>
                        <h3 class="editing-book-title">Название книги</h3>
                    </div>
                </div>
                <div class="book-actions">
                    <div class="categories">
                        <button class="category-btn" data-category="Finished">Finished</button>
                        <button class="category-btn" data-category="Reading">Reading</button>
                        <button class="category-btn" data-category="Dropped">Dropped</button>
                        <button class="category-btn" data-category="Want">Want</button>
                    </div>
                    <div class="rating-slider">
                        <input type="range" min="0" max="10" value="0" step="1" class="slider" id="ratingSlider">
                    </div>
                    <textarea id="review" placeholder="Напишите рецензию"></textarea>
                    <button id="editing-addToLibraryBtn">Добавить</button>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer-col">
                        <h4>компания</h4>
                        <ul>
                            <li><a href="/about.html">о нас</a></li>
                            <li><a href="/terms.html">условия использования</a></li>
                            <li><a href="/privacy.html">политика конфиденциальности</a></li>
                            <li><a href="/cookies.html">политика Cookie</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>follow us</h4>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
       </footer>
       <script src="avatar-btn-script.js"></script>
       <script src="addbookpage_script.js"></script>
</body>
</html>