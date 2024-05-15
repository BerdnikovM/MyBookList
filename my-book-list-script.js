window.addEventListener('load', function() {
    // Отправляем запрос на получение данных пользователя
    fetchUserData();
});

function fetchUserData() {
    // Отправляем запрос к файлу на сервере для получения данных пользователя
    fetch('get_user_data.php')
    .then(response => response.json())
    .then(data => {
        // Обновляем данные на странице
        updateUserData(data);
    })
    .catch(error => {
        console.error('Ошибка при получении данных пользователя:', error);
    });
}

function updateUserData(userData) {
    // Обновляем аватар
    const avatarImg = document.getElementById('avatar-img-myBooks');
    avatarImg.src = userData.avatar_path ? userData.avatar_path : 'images/default-avatar.png';

    // Обновляем отображаемое имя пользователя
    const displayName = document.querySelector('.display-name');
    displayName.textContent = userData.display_name ? userData.display_name : 'Display Name';

    // Обновляем имя пользователя
    const userName = document.querySelector('.user-name');
    userName.textContent = userData.user_name ? userData.user_name : 'User Name';

    // Обновляем информацию о пользователе
    const bio = document.querySelector('.bio');
    bio.textContent = userData.bio ? userData.bio : '';
}




// Получаем ссылки на кнопки сортировки
const allBtn = document.getElementById('AllBtn');
const finishedBtn = document.getElementById('FinishedBtn');
const readingBtn = document.getElementById('ReadingBtn');
const droppedBtn = document.getElementById('DroppedBtn');
const wantBtn = document.getElementById('WantBtn');

// Устанавливаем кнопку All активной по умолчанию

// Добавляем обработчики клика для каждой кнопки
allBtn.addEventListener('click', function() {
    setActiveButton(allBtn);
    fetchBooksByCategory(''); // Загружаем все книги
});

finishedBtn.addEventListener('click', function() {
    setActiveButton(finishedBtn);
    fetchBooksByCategory('Finished'); // Загружаем книги категории 'Finished'
});

readingBtn.addEventListener('click', function() {
    setActiveButton(readingBtn);
    fetchBooksByCategory('Reading'); // Загружаем книги категории 'Reading'
});

droppedBtn.addEventListener('click', function() {
    setActiveButton(droppedBtn);
    fetchBooksByCategory('Dropped'); // Загружаем книги категории 'Dropped'
});

wantBtn.addEventListener('click', function() {
    setActiveButton(wantBtn);
    fetchBooksByCategory('Want'); // Загружаем книги категории 'Want'
});

// Функция для установки активной кнопки
function setActiveButton(button) {
    // Удаляем класс 'active' у всех кнопок
    [allBtn, finishedBtn, readingBtn, droppedBtn, wantBtn].forEach(btn => {
        btn.classList.remove('active');
    });

    // Добавляем класс 'active' к выбранной кнопке
    button.classList.add('active');
}

// Функция для отправки запроса на сервер для загрузки книг выбранной категории
function fetchBooksByCategory(category) {
    // Отправляем запрос к файлу на сервере для загрузки книг
    fetch(`get_books_by_category.php?category=${category}`)
    .then(response => response.json())
    .then(data => {
        // Очищаем содержимое контейнера перед добавлением новых книг
        const bookListContainer = document.querySelector('.my-book-list');
        bookListContainer.innerHTML = '';

        // Создаем карточку для каждой книги и добавляем их в контейнер
        data.forEach(book => {
            const bookCard = createBookCard(book);
            bookListContainer.appendChild(bookCard);
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке книг:', error);
    });
}

// Функция для создания карточки книги
function createBookCard(book) {
    // Создаем элементы для карточки книги
    const bookCard = document.createElement('div');
    bookCard.classList.add('my-book-card');

    const mainBookInfo = document.createElement('div');
    mainBookInfo.classList.add('main-book-info');
    bookCard.appendChild(mainBookInfo);

    const bookCover = document.createElement('div');
    bookCover.classList.add('book-cover');
    mainBookInfo.appendChild(bookCover);

    const bookImg = document.createElement('img');
    bookImg.src = book.book_img_path ? book.book_img_path : 'images/default-book-cover.jpg';
    bookImg.alt = 'Обложка книги';
    bookCover.appendChild(bookImg);

    const myBookInformation = document.createElement('div');
    myBookInformation.classList.add('my-book-information');
    mainBookInfo.appendChild(myBookInformation);

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title ? book.title : 'Название книги';
    myBookInformation.appendChild(bookTitle);

    const bookGenre = document.createElement('p');
    bookGenre.classList.add('book-genre');
    bookGenre.textContent = book.genre ? book.genre : 'Жанр книги';
    myBookInformation.appendChild(bookGenre);

    const bookDate = document.createElement('p');
    bookDate.classList.add('book-date');
    bookDate.textContent = book.publication_date ? book.publication_date : 'Дата';
    myBookInformation.appendChild(bookDate);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author ? book.author : 'Автор';
    myBookInformation.appendChild(bookAuthor);

    const myBookRatingDiv = document.createElement('div');
    myBookRatingDiv.classList.add('my-book-rating-div');
    mainBookInfo.appendChild(myBookRatingDiv);

    const myBookRating = document.createElement('div');
    myBookRating.classList.add('my-book-rating');
    myBookRating.textContent = book.rating ? book.rating : '';
    myBookRatingDiv.appendChild(myBookRating);

    const myBookCategory = document.createElement('div');
    myBookCategory.classList.add('my-book-category');
    myBookCategory.textContent = book.category ? book.category : '';
    myBookRatingDiv.appendChild(myBookCategory);

    const myBookReview = document.createElement('div');
    myBookReview.classList.add('my-book-review');
    myBookReview.textContent = book.review ? book.review : '';
    bookCard.appendChild(myBookReview);

    return bookCard;
}
