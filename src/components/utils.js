import { handleEscape, handleOutside } from './modal';

export function openModal(popup) {
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', handleOutside);
  popup.classList.add('popup_opened');
};

export function closeModal(popup) {
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', handleOutside);
  popup.classList.remove('popup_opened');
};