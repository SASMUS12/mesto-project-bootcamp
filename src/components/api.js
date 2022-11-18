const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-2",
  headers: {
    authorization: "95b55e23-383f-429c-87bc-6d75636a35cd",
    "Content-Type": "application/json",
  },
};

//Обработка базового ответа с сервера
export function handleBasicResponse(res) {
  if (!res.ok) {
    return Promise.reject(res.status);
  }
  return res.json();
}

// //Ошибка обработки
// export function handleError(err) {
//   console.log(`Ошибка: ${err}`)
// }

//POST запрос карточек с сервера
export function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleBasicResponse);
}

//Редактирование профиля
export function updateProfileData(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then(handleBasicResponse);
}

//Получаем карточки с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleBasicResponse);
}

//Получить данные профиля
export function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleBasicResponse);
}
//Обновление профиля аватар
export function updateProfileAvatar(src) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: src,
    }),
  }).then(handleBasicResponse);
}

//Удалить карточки
export function removeApiCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleBasicResponse)
    .catch((err) => {
      console.error(err); // выводим ошибку в консоль
    });
}
//Добавть лайк
export function addLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleBasicResponse);
}
//Удалить лайк
export function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleBasicResponse);
}
