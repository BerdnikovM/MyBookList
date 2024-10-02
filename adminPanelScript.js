document.addEventListener("DOMContentLoaded", function() {
    // Получаем ссылки на необходимые элементы
    var userEmailInput = document.getElementById("userEmail");
    var makeAdminBtn = document.getElementById("makeAdminBtn");
    var makeUserBtn = document.getElementById("makeUserBtn");
    var statusMessage = document.getElementById("statusMessage");

    // Функция для отправки AJAX запроса на сервер
    function updateUserRole(isAdmin) {
        // Создаем новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Устанавливаем метод запроса и URL
        xhr.open("POST", "update_user_role.php", true);

        // Устанавливаем заголовок Content-Type
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Создаем строку запроса для отправки
        var params = "userEmail=" + encodeURIComponent(userEmailInput.value) + "&" + isAdmin;

        // Устанавливаем обработчик события onload
        xhr.onload = function() {
            // Проверяем статус ответа
            if (xhr.status === 200) {
                // Обновляем содержимое statusMessage в зависимости от ответа сервера
                statusMessage.textContent = xhr.responseText;
            } else {
                // Если произошла ошибка, выводим сообщение об ошибке
                statusMessage.textContent = "Произошла ошибка при обновлении роли пользователя.";
            }
        };

        // Отправляем запрос на сервер
        xhr.send(params);
    }

    // Обработчик события для кнопки "Сделать администратором"
    makeAdminBtn.addEventListener("click", function() {
        // Вызываем функцию updateUserRole с параметром "makeAdmin=1"
        updateUserRole("makeAdmin=1");
    });

    // Обработчик события для кнопки "Сделать пользователем"
    makeUserBtn.addEventListener("click", function() {
        // Вызываем функцию updateUserRole с параметром "makeUser=1"
        updateUserRole("makeUser=1");
    });
});


document.getElementById('addBookBtn').addEventListener('click', function() {
    // Получаем значения из полей формы
    var title = document.getElementById('bookTitle').value.trim();
    var genre = document.getElementById('bookGenre').value.trim();
    var author = document.getElementById('bookAuthor').value.trim(); // Получаем автора книги
    var publicationDate = document.getElementById('publicationDate').value.trim();
    var annotation = document.getElementById('bookAnnotation').value.trim();
    var image = document.getElementById('bookImage').files[0];

    // Создаем объект FormData для передачи данных на сервер
    var formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('author', author); // Добавляем автора книги
    formData.append('publication_date', publicationDate);
    formData.append('annotation', annotation);
    formData.append('image', image);

    // Создаем AJAX запрос для загрузки изображения на сервер
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload_book_image.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Получаем путь к загруженному изображению
                var imagePath = xhr.responseText;
                
                // Добавляем путь к изображению в объект formData
                formData.append('imagePath', imagePath);

                // Делаем запрос на сервер для добавления книги в базу данных
                var addBookRequest = new XMLHttpRequest();
                addBookRequest.open('POST', 'add_book.php', true);
                addBookRequest.onreadystatechange = function() {
                    if (addBookRequest.readyState === XMLHttpRequest.DONE) {
                        if (addBookRequest.status === 200) {
                            // Получаем ответ от сервера
                            var response = addBookRequest.responseText;
                            // Обработка успешного добавления книги
                            console.log(response);
                            // Очищаем поля формы
                            document.getElementById('bookTitle').value = '';
                            document.getElementById('bookGenre').value = '';
                            document.getElementById('bookAuthor').value = ''; // Очищаем поле для автора книги
                            document.getElementById('publicationDate').value = '';
                            document.getElementById('bookAnnotation').value = '';
                            document.getElementById('bookImage').value = '';
                            // Отображаем сообщение об успешном добавлении книги
                            document.getElementById('bookStatusMessage').textContent = 'Книга успешно добавлена!';
                            document.getElementById('bookStatusMessage').style.color = 'green';
                        } else {
                            // Обработка ошибки при добавлении книги
                            document.getElementById('bookStatusMessage').textContent = 'Ошибка при добавлении книги!';
                            document.getElementById('bookStatusMessage').style.color = 'red';
                        }
                    }
                };
                // Отправляем запрос на сервер для добавления книги
                addBookRequest.send(formData);
            } else {
                // Обработка ошибки при загрузке изображения
                document.getElementById('bookStatusMessage').textContent = 'Ошибка при загрузке изображения!';
                document.getElementById('bookStatusMessage').style.color = 'red';
            }
        }
    };
    // Отправляем запрос на сервер для загрузки изображения
    xhr.send(formData);
});











document.addEventListener('DOMContentLoaded', function() {
    const searchUserBtn = document.getElementById('search-user-btn');
    const userEmailInput = document.getElementById('user-email');
    const adminSection = document.querySelector('.admin-section.record-control');

    searchUserBtn.addEventListener('click', function() {
        const userEmail = userEmailInput.value.trim();

        // Отправляем запрос на сервер для поиска пользователя по email
        fetchUserData(userEmail);
    });

    function fetchUserData(email) {
        // Отправляем запрос на сервер для поиска пользователя по email
        fetch(`find_user.php?email=${email}`)
        .then(response => response.json())
        .then(userData => {
            // Если пользователь найден, получаем его ID
            const userId = userData.user_id;

            // Отправляем запрос на сервер для получения записей пользователя из userlibrary
            fetchUserRecords(userId);
        })
        .catch(error => {
            console.error('Ошибка при поиске пользователя:', error);
        });
    }

    function fetchUserRecords(userId) {
        // Отправляем запрос на сервер для получения записей пользователя из userlibrary
        fetch(`get_user_records.php?user_id=${userId}`)
        .then(response => response.json())
        .then(userRecords => {
            // Создаем и отображаем структуры для каждой записи
            displayUserRecords(userRecords);
        })
        .catch(error => {
            console.error('Ошибка при получении записей пользователя:', error);
        });
    }

    function displayUserRecords(records) {
        // Очищаем предыдущие записи перед отображением новых
        adminSection.innerHTML = '';

        // Создаем и добавляем структуру для каждой записи
        records.forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.classList.add('user-record');

            const recordInfoDiv = document.createElement('div');
            recordInfoDiv.classList.add('record-info');

            // Заполняем информацию о записи из базы данных
            recordInfoDiv.innerHTML = `
                <p><strong>Пользователь ID:</strong> <span>${record.user_id}</span></p>
                <p><strong>Книга ID:</strong> <span>${record.book_id}</span></p>
                <p><strong>Рейтинг:</strong> <span>${record.rating}</span></p>
                <p><strong>Отзыв:</strong> <span>${record.review}</span></p>
                <p><strong>Категория:</strong> <span>${record.category}</span></p>
                <p><strong>Дата добавления:</strong> <span>${record.date_added}</span></p>
            `;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Удалить запись';
            deleteBtn.addEventListener('click', function() {
                // Отправляем запрос на сервер для удаления записи
                deleteRecord(record.user_id, record.book_id);
            });

            recordDiv.appendChild(recordInfoDiv);
            recordDiv.appendChild(deleteBtn);
            adminSection.appendChild(recordDiv);
        });
    }

    function deleteRecord(userId, bookId) {
        // Отправляем запрос на сервер для удаления записи
        fetch(`delete_record.php?user_id=${userId}&book_id=${bookId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Если запись успешно удалена, обновляем данные пользователя
                fetchUserRecords(userId);
            } else {
                console.error('Ошибка при удалении записи');
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении записи:', error);
        });
    }
});
