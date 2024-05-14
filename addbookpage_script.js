document.getElementById('searchButton').addEventListener('click', function() {
    var searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery !== '') {
        // Очищаем текущие результаты поиска перед выполнением нового
        document.getElementById('bookList').innerHTML = '';

        // Выполняем AJAX запрос к серверу для поиска книг
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'search_books.php?query=' + encodeURIComponent(searchQuery), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Получаем результаты поиска из ответа сервера
                    var books = JSON.parse(xhr.responseText);

                    // Добавляем найденные книги на страницу
                    var bookList = document.getElementById('bookList');
                    books.forEach(function(book) {
                        var bookCard = createBookCard(book);
                        bookList.appendChild(bookCard);
                    });
                } else {
                    console.error('Ошибка при выполнении запроса:', xhr.status);
                }
            }
        };
        xhr.send();
    }
});

// Функция для создания карточки книги
function createBookCard(book) {
    var bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    var bookCover = document.createElement('div');
    bookCover.classList.add('book-cover');
    var coverImg = document.createElement('img');
    coverImg.src = book.cover;
    coverImg.alt = 'Обложка книги';
    bookCover.appendChild(coverImg);
    bookCard.appendChild(bookCover);

    var bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');
    var title = document.createElement('h3');
    title.classList.add('book-title');
    title.textContent = book.title;
    var genre = document.createElement('p');
    genre.classList.add('book-genre');
    genre.textContent = book.genre;
    var date = document.createElement('p');
    date.classList.add('book-date');
    date.textContent = book.date;
    var author = document.createElement('p'); // Создаем элемент для автора
    author.classList.add('book-author'); // Добавляем класс для стилизации
    author.textContent = book.Author; // Устанавливаем текст с именем автора
    var addToLibrary = document.createElement('button');
    addToLibrary.classList.add('add-to-library');
    addToLibrary.textContent = 'Добавить';
    bookDetails.appendChild(title);
    bookDetails.appendChild(genre);
    bookDetails.appendChild(date);
    bookDetails.appendChild(author); // Добавляем информацию об авторе
    bookDetails.appendChild(addToLibrary);
    bookCard.appendChild(bookDetails);

    return bookCard;
}

// Обработчик события для кнопки "Добавить"
document.getElementById('bookList').addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-library')) {
        // Получаем данные о выбранной книге
        var selectedBook = {
            title: event.target.parentNode.querySelector('.book-title').textContent,
            cover: event.target.parentNode.parentNode.querySelector('.book-cover img').src,
            // Другие данные книги, если необходимо
        };

        // Скрываем блок с книгами и отображаем блок для добавления книги
        document.getElementById('bookList').style.display = 'none';
        document.getElementById('addBookForm').style.display = 'block';

        // Отображаем данные выбранной книги в блоке добавления книги
        document.querySelector('.editing-book-cover img').src = selectedBook.cover;
        document.querySelector('.editing-book-title').textContent = selectedBook.title;
    }
});




// Получаем все кнопки категорий
var categoryButtons = document.querySelectorAll('.category-btn');

// Добавляем обработчик события клика на каждую кнопку
categoryButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Снимаем активный класс у всех кнопок
        categoryButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });

        // Добавляем активный класс только на нажатую кнопку
        this.classList.add('active');
    });
});



// Находим ползунок слайдера и элемент для отображения значения рейтинга
var slider = document.getElementById("ratingSlider");
var ratingValue = document.getElementById("ratingValue");

// Обновляем значение рейтинга при изменении положения ползунка
slider.addEventListener("input", function() {
    ratingValue.textContent = slider.value;
});



document.getElementById('editing-addToLibraryBtn').addEventListener('click', function() {
    // Получаем данные о книге из элементов на странице
    var bookTitle = document.querySelector('.editing-book-title').textContent;
    var category = document.querySelector('.category-btn.active').getAttribute('data-category');
    var rating = document.getElementById("ratingSlider").value;
    var review = document.getElementById("review").value;

    // Создаем объект FormData для передачи данных на сервер
    var formData = new FormData();
    formData.append('title', bookTitle);
    formData.append('category', category);
    formData.append('rating', rating);
    formData.append('review', review);

    // Получаем ID книги
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'get_book_id.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var bookId = xhr.responseText;
            formData.append('book_id', bookId);

            // Отправляем данные в файл add_book_to_library.php
            var xhrAddBook = new XMLHttpRequest();
            xhrAddBook.open('POST', 'add_book_to_library.php', true);
            xhrAddBook.onload = function() {
                if (xhrAddBook.status === 200) {
                    // Выводим сообщение об успешном добавлении книги
                    console.log(xhrAddBook.responseText);
                    // Перезагружаем страницу
                    location.reload();
                } else {
                    // Выводим сообщение об ошибке в консоль
                    console.error('Ошибка добавления книги: ' + xhrAddBook.statusText);
                }
            };
            xhrAddBook.send(formData);
        }
    };
    xhr.send('title=' + encodeURIComponent(bookTitle));
});
