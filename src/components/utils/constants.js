const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '9604af3d-5a7c-4d72-b14c-31174b7ac9d5',
    'Content-Type': 'application/json'
  }
}

const profileSelectors = {
  name: '.profile__name',
  caption: '.profile__caption',
  pic: '.profile__picture'
}

const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_status_inactive',
  inputErrorClass: 'form__input-text_status_error',
};

const popupProfile = document.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.form');

export {apiConfig, profileSelectors, validationElements, profileForm};
