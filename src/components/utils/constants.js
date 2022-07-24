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
const popupProfilePic = document.querySelector('.popup_profile-picture');
const profilePictureForm = popupProfilePic.querySelector('.form');
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePictureButton = document.querySelector('.profile__picture-button');
const popupAdd = document.querySelector('.popup_add');
const addForm = popupAdd.querySelector('.form');
const addFormButton = addForm.querySelector('.form__submit-button');

const cardTemplate = '#card-template';

const cardsContainerSelector = '.places';

export {
  apiConfig,
  profileSelectors,
  validationElements,
  profileForm,
  profilePictureForm,
  addForm,
  addFormButton,
  cardTemplate,
  cardsContainerSelector,
  profileEditButton,
  addButton,
  profilePictureButton
};
