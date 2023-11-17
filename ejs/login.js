const loginForm=document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Создаем объект данных для отправки
  const data = {
    email: email,
    password: password
  };

  // Опции запроса
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Другие необходимые заголовки могут быть добавлены здесь
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  };

  // Отправляем запрос на сервер
  fetch('/auth/login', options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    if (data && data.redirect) {
      alert('усе правильно');
      console.log('усе правильно', data.redirect);

      // Установка куки, если сервер возвращает его значение
      const receivedCookie = data.cookie; // Замените на соответствующее поле в ответе сервера
      document.cookie = `yourCookieName=${receivedCookie}; path=/;`;
      // Замените 'yourCookieName' на имя вашей куки и используйте значение, полученное от сервера

      // Дополнительные действия, если нужно
    } else {
      console.error('Unexpected server response:', data);
    }
  })
  .catch(error => {
    // Обработка ошибок
    alert('error');
    console.error('There has been a problem with your fetch operation:', error);
  });
})