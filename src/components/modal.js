import {openPopup, closePopup, popupProfile, popupAdd} from './utils.js';
import {enableValidation} from './validate.js'

const profileFormName = document.querySelector('.form__input-text_field_name');
const profileFormCaption = document.querySelector('.form__input-text_field_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_status_inactive',
  inputErrorClass: 'form__input-text_status_error',
};

function handleEditProfilePopup () {
  openPopup(popupProfile);
  profileFormName.value = profileName.textContent;
  profileFormCaption.value = profileCaption.textContent;
  enableValidation(validationElements);
}

function handleAddPopup () {
  openPopup(popupAdd);
  enableValidation(validationElements);
}

function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileCaption.textContent = profileFormCaption.value;
  closePopup(popupProfile);
}

export {handleEditProfilePopup, handleAddPopup, submitProfileForm};
