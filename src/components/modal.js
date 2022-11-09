import { closeModal } from './utils'

export function handleEscape(event) {
  if (event.key === 'Escape') {
    const addModal = document.querySelector('.popup_opened')
    closeModal(addModal);

  };
};

export function handleOutside(event) {
  const isClickInside = !!event.target.closest('.popup__container');
  if (!isClickInside) {
    const addModal = document.querySelector('.popup_opened')
    closeModal(addModal);
   };
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});