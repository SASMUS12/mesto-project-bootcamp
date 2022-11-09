import "./pages/index.css";

import { initialCards } from "./components/array";
import { openModal, closeModal } from "./components/utils";
import { enterCard, addNewCards } from "./components/card";

export const usersOnline = document.querySelector(".cards");
export const addCard = document.querySelector(".template").content;
export const bigImage = document.querySelector("#bigImage");
export const popupImage = document.querySelector(".popup__image");
export const popupDecription = document.querySelector(".popup__decription");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const editBtnProfile = document.querySelector("#myBtn");
const modalEdit = document.querySelector("#myModal");
export const newLocation = document.querySelector("#newLocation");
const newLocationBtn = document.querySelector("#newLocationBtn");

const btnClosePopup = document.querySelectorAll(".popup__close-button");

export const popupContainer = document.querySelector('#formMyModal');
export const popupTitle = popupContainer.querySelector('#title');
export const popupDescription = popupContainer.querySelector('#description');

export const newButtonLocation = document.querySelector('#addNewCard');
export const title = document.querySelector('#newTitle');
export const link = document.querySelector('#linkImg');

initialCards.forEach((item) => {
  enterCard(item.name, item.link);
});

//Обработчик внесение информации в профиль(Добавлено)
editBtnProfile.addEventListener("click", function () {
  openModal(modalEdit);
  formDefault();
});

//Обработчик события добавления карточки(Добавлено)
newLocationBtn.addEventListener("click", function () {
  openModal(newLocation);
});

btnClosePopup.forEach(function (element) {
  element.addEventListener("click", () =>
    closeModal(element.closest(".popup_opened"))
  );
});

usersOnline.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('cards__like')) {
    evt.target.classList.toggle('cards__like_active')
   }
  });

//Обработчик для добавления новой карточки(Доработано)
newButtonLocation.addEventListener("submit", addNewCards);

//Обработчик редактирования профиля(Доработано)
popupContainer.addEventListener("submit", editProfile);

//Функция передачи данных из профиля в попап(Добавлено)
function formDefault() {
  popupTitle.value = profileName.textContent;
  popupDescription.value = profileAbout.textContent;
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileAbout.textContent = popupDescription.value;
  closeModal(modalEdit);
}
