import './pages/index.css';
import {handleEditProfilePopup, handleAddPopup, submitProfileForm} from './components/modal.js';
import {closePopup, popupProfile, popupAdd} from './components/utils.js';
import {initialCards, renderCard, addNewCard, addCardOnPage} from './components/cards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const profileForm = popupProfile.querySelector('.form');
const addForm = popupAdd.querySelector('.form');

const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_status_inactive',
  inputErrorClass: 'form__input-text_status_error',
};

initialCards.reverse().forEach(item => addCardOnPage(renderCard(item)));

profileEditButton.addEventListener('click', handleEditProfilePopup);
addButton.addEventListener('click', handleAddPopup);

popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', function() {
    const popup = closeButton.closest('.popup_opened');
    closePopup(popup);
  });
});

profileForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addNewCard);
