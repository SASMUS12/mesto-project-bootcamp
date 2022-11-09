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