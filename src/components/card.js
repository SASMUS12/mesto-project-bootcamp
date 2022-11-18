import { openModal, closeModal } from "./utils";
import {
  usersOnline,
  addCard,
  bigImage,
  popupImage,
  popupDecription,
  newLocation,
  title,
  userId,
  renderLoading,
  link,
} from "../index.js";
import { postNewCard, removeApiCard, addLike, deleteLike } from "./api";

export function createCards(newCard) {
  const clonElement = addCard.querySelector(".cards__item").cloneNode(true);
  const buttonDelete = clonElement.querySelector(".cards__delete");
  const cardLike = clonElement.querySelector(".cards__like");
  const allLikes = newCard.likes;
  const likesCounter = clonElement.querySelector(".cards__like-counter");
  const cardImg = clonElement.querySelector(".cards__img");
  clonElement.querySelector(".cards__text").textContent = newCard.name;
  cardImg.alt = newCard.name;
  cardImg.src = newCard.link;

  clonElement.id = newCard._id;
  const clonElementId = clonElement.id;

  if (newCard.owner._id !== userId) {
    buttonDelete.remove();
  }
  if (allLikes.length > 0) {
    likesCounter.textContent = allLikes.length;
  }
  if (checkLikes(allLikes, userId)) {
    cardLike.classList.add("cards__like_active");
  }
  cardLike.addEventListener("click", () => {
    if (cardLike.classList.contains("cards__like_active")) {
      handleDeletelike(cardLike, clonElementId, likesCounter);
      return;
    }
    handleAddLike(cardLike, clonElementId, likesCounter);
  });
  removeCard(clonElement, buttonDelete);

  openBigImg(newCard.name, newCard.link, cardImg);
  return clonElement;
}

export function enterCard(newCard) {
  const elementCard = createCards(newCard);
  usersOnline.prepend(elementCard);
}

function openBigImg(name, link, cover) {
  cover.addEventListener("click", () => {
    popupDecription.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
    openModal(bigImage);
  });
}

export function addNewCards(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);
  postNewCard(title.value, link.value)
    .then((newCard) => {
      enterCard(newCard);
      evt.target.reset();
      closeModal(newLocation);
    })
    .catch((err) => {
      console.error(err); // выводим ошибку в консоль
      evt.submitter.classList.add(validationData.disabledBtnClass);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

function removeCard(clonElement, button) {
  button.addEventListener("click", () => {
    removeApiCard(clonElement.id)
      .then(() => {
        clonElement.closest(".cards__item").remove();
      })
      .catch((err) => {
        console.error(err); // выводим ошибку в консоль
      });
  });
}

function checkLikes(likesList, userId) {
  return likesList.find((userLike) => userLike._id === userId);
}

function handleAddLike(cardLike, clonElementId, likeCounter) {
  return addLike(clonElementId)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      cardLike.classList.add("cards__like_active");
    })
    .catch((err) => {
      console.error(err); // выводим ошибку в консоль
    });
}

function handleDeletelike(cardLike, clonElementId, likeCounter) {
  return deleteLike(clonElementId)
    .then((res) => {
      if (res.likes.length === 0) {
        likeCounter.textContent = "";
      } else {
        likeCounter.textContent = res.likes.length;
      }
      cardLike.classList.remove("cards__like_active");
    })
    .catch((err) => {
      console.error(err); // выводим ошибку в консоль
    });
}
