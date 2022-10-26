const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
/***Эта функция добовляет карточку из иассива Она работает*********************/
initialCards.forEach(addCardsMas);

function addCardsMas(element) {
  const usersOnline = document.querySelector('.cards__item');
  const addCard = document.querySelector('.template').content;
  const clonElement = addCard.querySelector('.cards').cloneNode(true);
  clonElement.querySelector('.cards__img').src = element.link;
  clonElement.querySelector('.cards__text').textContent = element.name;
  clonElement.querySelector('.cards__like').addEventListener('click', function(evt) {
  evt.target.classList.toggle('cards__like_active');
  });
  usersOnline.append(clonElement);
};

/****Добовляет картоски из popup */
const title = document.querySelector('.newTitle');
const link = document.querySelector('.linkImg');
const newButtonLocation = document.querySelector('.newButtonLocation');

newButtonLocation.addEventListener('click', (evt) => {
  evt.preventDefault();
  const addCard = document.querySelector('.template').content;
  const usersOnline = document.querySelector('.cards__item');
  const clonElement = addCard.querySelector('.cards').cloneNode(true);
  clonElement.querySelector('.cards__text').textContent = title.value;
  clonElement.querySelector('.cards__img').src = link.value;
  clonElement.querySelector('.cards__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__like_active');
    });
  closeNewLocation();
  title.value = ' ';
  link.value = ' ';
  usersOnline.prepend(clonElement);
});

/*************Открытие и закрытие модального окна*/

const modal = document.querySelector('#myModal');
const newLocation = document.querySelector('#newLocation');
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#myBtn').addEventListener('click', openModal);
  document.querySelector('#newLocationBtn').addEventListener('click', openNewLocation);
});
  /**
   * Обработчик события клика по кнопке открытия модального окна
   */
function openModal() {
  modal.classList.add('popup_opened');
  attachModalEvents();
  popupTitle.value = profileName.textContent;
  popupDescription.value = profileAbout.textContent;
}

function openNewLocation() {
  newLocation.classList.add('popup_opened');
  attachModalEventsNewLocation();
};
/**
   * Функция назначает обработчики событий к элементам модального окна при открытии
   */
function attachModalEvents() {
  modal.querySelector('.popup__close-button').addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', handleOutside);
}

function attachModalEventsNewLocation() {
  newLocation.querySelector('.popup__close-button').addEventListener('click', closeNewLocation);
  document.addEventListener('keydown', handleEscape);
  newLocation.addEventListener('click', handleOutside);
}
/**
   * Обработчик события клика по кнопке закрытия модального окна
   */
function closeModal() {
  modal.classList.remove('popup_opened');
  datachModalEvent();
};

function closeNewLocation() {
  newLocation.classList.remove('popup_opened');
  datachModalEventNewLocation();
};
/**
 *  Функция удаляет обработчики событий к элементам модального окна при закрытии
 */
function datachModalEvent() {
  modal.querySelector('.popup__close-button').removeEventListener('click', closeModal);
  document.removeEventListener('keydown', handleEscape);
  modal.removeEventListener('click', handleOutside);
};

function datachModalEventNewLocation() {
  newLocation.querySelector('.popup__close-button').removeEventListener('click', closeNewLocation);
  document.removeEventListener('keydown', handleEscape);
  newLocation.removeEventListener('click', handleOutside);
}
/**
 * Функция закрывает модальное окно при нажатии клавиши Escape
 */
function handleEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
    closeNewLocation();
  }
}
/**
 * Функция закрывает модальное окно при клике вне контента модального окна
 */
function handleOutside(event) {
  const isClickInside = !!event.target.closest('.popup__container');
  if (!isClickInside) {
    closeModal();
    closeNewLocation();
  }
}
/*********Внесение изменений в модальное окно */
const popupContainer = document.querySelector('.popup__container');
const popupTitle = document.querySelector('#title');
const popupDescription = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileAbout.textContent = popupDescription.value;
  popupContainer.classList.add('popup__opened');
  closeModal();
};
popupContainer.addEventListener('submit', formSubmitHandler);

