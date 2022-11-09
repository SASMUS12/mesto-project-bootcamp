import { openModal, closeModal } from "./utils";
import {
  usersOnline,
  addCard,
  bigImage,
  popupImage,
  popupDecription,
  newLocation,
  title,
  link,
} from "../index.js";

export function createCards(name, link) {
  const clonElement = addCard.querySelector(".cards__item").cloneNode(true);
  clonElement.querySelector(".cards__text").textContent = name;
  clonElement.querySelector(".cards__img").alt = name;
  clonElement.querySelector(".cards__img").src = link;
  openBigImg(name, link, clonElement);
  deleteCard(clonElement);
  return clonElement;
}

export function enterCard(name, link) {
  const elementCard = createCards(name, link);
  usersOnline.prepend(elementCard);
}

export function addNewCards(evt) {
  evt.preventDefault();
  enterCard(title.value, link.value);
  closeModal(newLocation);
  evt.target.reset();
}

function deleteCard(clonElement) {
  clonElement.querySelector(".cards__delete").addEventListener("click", () => {
    clonElement.closest(".cards__item").remove();
  });
}

function openBigImg(name, link, clonElement) {
  clonElement.querySelector(".cards__img").addEventListener("click", () => {
    popupDecription.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
    openModal(bigImage);
  });
}
