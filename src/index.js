import "./pages/index.css";
import { openModal, closeModal } from "./components/utils";
import { enterCard, addNewCards } from "./components/card";
import { enableValidation, resetErrors} from "./components/validate";
import { validationData } from "./components/modal";
import { getInitialCards,updateProfileData, getProfileData, updateProfileAvatar, handleError } from './components/api.js';


//Карточка клонирования
export const usersOnline = document.querySelector(".cards");
export const addCard = document.querySelector(".template").content;
export const popupImage = document.querySelector(".popup__image");
export const popupDecription = document.querySelector(".popup__decription");

export const bigImage = document.querySelector("#bigImage");

//popup редактирования профиля
const modalEdit = document.querySelector("#myModal");
const editBtnProfile = document.querySelector("#myBtn");
export const popupContainerForm = document.forms['editProfile'];
export const popupTitle = document.querySelector("#profileTextTitle");
export const popupDescription = document.querySelector("#profileTextDescription");

//popup новое место
export const newLocation = document.querySelector("#newLocation");
const newLocationBtn = document.querySelector("#newLocationBtn");
export const formNewLocation = document.forms['addNewCard'];
export const title = document.querySelector("#cardTextTitle");
export const link = document.querySelector("#cardImptLink");

//popup обновления аватара
const updateAvatar = document.querySelector('#updateAvatar')
const editAvatarBtn = document.querySelector('.profile__avatar-edit');
export const formUpdateAvatar = document.forms['formUpdateAvatar'];
const editAvatarInput = document.querySelector('#updateAvatarInput');

//Данные профиля, аголовок, подзаголовок и картинка
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector(".profile__avatar");

const btnClosePopup = document.querySelectorAll(".popup__close-button");

export let userId;

btnClosePopup.forEach(element => {
  element.addEventListener("click", () => {
    const buttonPopup = element.closest('.popup')
    closeModal(buttonPopup)
  });
});

//Слушатель внесение информации в профиль(Добавлено)
editBtnProfile.addEventListener("click", function () {
  resetErrors(popupContainerForm, validationData)
  openModal(modalEdit);
  setformDefault();
});

//Слушатель события добавления карточки(Добавлено)
newLocationBtn.addEventListener("click", function () {
  resetErrors( formNewLocation, validationData);
  openModal(newLocation);
});

//Слушатель смены аватара
editAvatarBtn.addEventListener('click', () => {
    resetErrors(formUpdateAvatar, validationData);
    openModal(updateAvatar);
  })

// Like для всей страницы без сервера
// usersOnline.addEventListener("click", function (evt) {
//   if (evt.target.classList.contains("cards__like")) {
//     evt.target.classList.toggle("cards__like_active");
//   }
// });

//Обработчик для добавления новой карточки
formNewLocation.addEventListener("submit", addNewCards);
//Обработчик редактирования профиля
popupContainerForm.addEventListener("submit", editProfile);
//Обработчик смена Аватара
formUpdateAvatar.addEventListener("submit", editAvatar);

//Функция отредактировать профиль
function editProfile(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button)
  updateProfileData(popupTitle.value, popupDescription.value)
  .then(newData => {
    profileName.textContent = newData.name;
    profileAbout.textContent = newData.about;
    evt.target.reset();
    closeModal(modalEdit);
  })
  .catch((err) => {
    console.error(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderLoading(false, button)
  })
};

//Функция передачи данных из профиля в попап
function setformDefault() {
  popupTitle.value = profileName.textContent;
  popupDescription.value = profileAbout.textContent;
}

//Функция Редактировать аватар
function editAvatar(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button)
  updateProfileAvatar(editAvatarInput.value)
  .then(newData => {
    profileAvatar.src = newData.avatar;
    evt.target.reset();
    closeModal(updateAvatar);
  })
  .catch((err) => {
    console.error(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderLoading(false, button)
  })
}

//Вставляет данные профиля
function insertDataProfile(obj) {
  profileName.textContent = obj.name;
  profileAbout.textContent = obj.about;
  profileAvatar.src = obj.avatar;
}

Promise.all([getInitialCards(), getProfileData()])
.then(([cards, profileData]) => {
  insertDataProfile(profileData);
  userId = profileData._id;
  const cardList = Array.from(cards).reverse();
  cardList.forEach(enterCard)
})
.catch((err) => {
  console.error(err); // выводим ошибку в консоль
})
//Загрузка рендеринга
export function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
    button.setAttribute('disabled', '');
    return;
  }
    button.textContent = 'Сохранить';
    button.classList.add(validationData.disabledBtnClass);
    button.removeAttribute('disabled', '');
}

//Запуск валидации
enableValidation(validationData);