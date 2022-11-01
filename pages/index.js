const usersOnline = document.querySelector('.cards');
const addCard = document.querySelector('.template').content;


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
//Эта функция добовляет карточку из иассива
initialCards.forEach(createCards);

function createCards(element) {
  //Клонирование карточки
  const clonElement = addCard.querySelector('.cards__item').cloneNode(true);
  //получение данных с массива и передачу их в данные карточки( img, подпись.)
  clonElement.querySelector('.cards__img').src = element.link;
  clonElement.querySelector('.cards__text').textContent = element.name;
  //Слушатель запуска увеличенного изображения карточки
  clonElement.querySelector('.cards__img').addEventListener('click', () => {
  openBigImage();
  document.querySelector('.popup__image').src = clonElement.querySelector('.cards__img').src;
  document.querySelector('.popup__decription').textContent = clonElement.querySelector('.cards__text').textContent;
  });
 //Слушатель установки LIke
  clonElement.querySelector('.cards__like').addEventListener('click', function(evt) {
  evt.target.classList.toggle('.cards__like_active');
  });
 //Слушатель удаление карточки
  clonElement.querySelector('.cards__delete').addEventListener('click', () => {
  clonElement.closest('.cards__item').remove();
  });
  //Добавление элемента карточки на страницу
  usersOnline.append(clonElement);
};

/****Добовляет карточки из popup */
const title = document.querySelector('.newTitle');
const link = document.querySelector('.linkImg');
const newButtonLocation = document.querySelector('.newButtonLocation');

newButtonLocation.addEventListener('click', (evt) => {
  evt.preventDefault();
  const addCard = document.querySelector('.template').content;
  const usersOnline = document.querySelector('.cards');
  const clonElement = addCard.querySelector('.cards__item').cloneNode(true);

  //получение данных с попапа и передача их в шаблон карточек
  clonElement.querySelector('.cards__text').textContent = title.value;
  clonElement.querySelector('.cards__img').src = link.value;

  //Слушатель запуска увеличенного изображения
  clonElement.querySelector('.cards__img').addEventListener('click', () => {
  openBigImage();
  document.querySelector('.popup__image').src = clonElement.querySelector('.cards__img').src;
  document.querySelector('.popup__decription').textContent = clonElement.querySelector('.cards__text').textContent;
  closeBigImage();
  });
  //Слушатель установки LIke
  clonElement.querySelector('.cards__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('.cards__like_active');
  });
  //Слушатель удаление карточки
  clonElement.querySelector('.cards__delete').addEventListener('click', () => {
    clonElement.closest('.cards__item').remove();
  });
  //Функция удаления попапа "Новое место"
  //Обнуление данных в полях попапа "новое место"
  title.value = ' ';
  link.value = ' ';
  //Добавление элемента карточки на страницу
  usersOnline.prepend(clonElement);
});

/*************Открытие и закрытие модального окна*/

const modal = document.querySelector('#myModal');
const newLocation = document.querySelector('#newLocation');
const bigImage = document.querySelector('#bigImage');

const cardsImg = document.querySelector('.cards__img');
const cardsText = document.querySelector('.cards__text');
const popupImage = document.querySelector('.popup__image');
const popupDecription = document.querySelector('.popup__decription');

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#myBtn').addEventListener('click', openModal);
  document.querySelector('#newLocationBtn').addEventListener('click', openNewLocation);
  document.querySelector('.cards__img').addEventListener('click', openBigImage);
});
  /**
   * Обработчик события клика по кнопке открытия модального окна
   */
function openModal() {
  modal.classList.add('popup_opened');
  attachModalEvents();
  popupTitle.value = profileName.textContent;
  popupDescription.value = profileAbout.textContent;
};
function openNewLocation() {
  newLocation.classList.add('popup_opened');
  attachNewLocationEvents();
};
function openBigImage() {
  bigImage.classList.add('popup_opened');
  attachBigImageEvents();
};
/**
   * Функция назначает обработчики событий к элементам модального окна при открытии
   */
function attachModalEvents() {
  modal.querySelector('.popup__close-button').addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', handleOutside);
};
function attachNewLocationEvents() {
  newLocation.querySelector('.popup__close-button').addEventListener('click', closeNewLocation);
  document.addEventListener('keydown', handleEscape);
  newLocation.addEventListener('click', handleOutside);
};

function attachBigImageEvents() {
  bigImage.querySelector('.popup__close-button').addEventListener('click', closeBigImage);
  document.addEventListener('keydown', handleEscape);
  bigImage.addEventListener('click', handleOutside);
};
/**
   * Обработчик события клика по кнопке закрытия модального окна
   */
function closeModal() {
  modal.classList.remove('popup_opened');
  datachModalEvent();
};

function closeNewLocation() {
  newLocation.classList.remove('popup_opened');
  datachNewLocationEvent();
};

function closeBigImage() {
  bigImage.classList.remove('popup_opened');
  datachBigImageEvent();
};
/**
 *  Функция удаляет обработчики событий к элементам модального окна при закрытии
 */
function datachModalEvent() {
  modal.querySelector('.popup__close-button').removeEventListener('click', closeModal);
  document.removeEventListener('keydown', handleEscape);
  modal.removeEventListener('click', handleOutside);
};

function datachNewLocationEvent() {
  newLocation.querySelector('.popup__close-button').removeEventListener('click', closeNewLocation);
  document.removeEventListener('keydown', handleEscape);
  newLocation.removeEventListener('click', handleOutside);
};
function datachBigImageEvent() {
  bigImage.querySelector('.popup__close-button').removeEventListener('click', closeBigImage);
  document.removeEventListener('keydown', handleEscape);
  bigImage.removeEventListener('click', handleOutside);
};

/**
 * Функция закрывает модальное окно при нажатии клавиши Escape
 */
function handleEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
    closeNewLocation();
    closeBigImage();
  };
};
// Функция закрывает модальное окно при клике вне контента модального окна
function handleOutside(event) {
  const isClickInside = !!event.target.closest('.popup__container');
  if (!isClickInside) {
    closeModal();
    closeNewLocation();
    closeBigImage();
  };
};
//Внесение изменений в модальное окно
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
