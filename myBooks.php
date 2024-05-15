<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <title>Мои книги | MyBookList</title>
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
            <div class="user-profile">
                <div class="avatar-and-name">
                    <div class="avatar-div">
                        <img id="avatar-img-myBooks" src="images/default-avatar.png" alt="Аватар пользователя">
                    </div>
                    <div>
                        <div class="display-name">Display Name</div>
                        <div class="user-name">User Name</div>
                    </div> 
                </div>
                <div class="bio"></div>
                <div class="sort-buttons">
                    <div class="left-row">
                        <button id="AllBtn" class="sort-btn">All</button>
                        <button id="FinishedBtn" class="sort-btn">Finished</button>
                        <button id="ReadingBtn" class="sort-btn">Reading</button>
                        <button id="DroppedBtn" class="sort-btn">Dropped</button>
                        <button id="WantBtn" class="sort-btn">Want</button>
                    </div>
                    <div class="right-row">
                        <!-- <button class="sort-btn">Сортировка по рейтингу <i class="fas fa-sort"></i></button> -->
                    </div>
                </div>
            </div>
            <div class="my-book-list">
        
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
       <script src="my-book-list-script.js"></script>
</body>
</html>