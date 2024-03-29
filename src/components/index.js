import '../pages/index.css';
import {openPopup, closePopup} from './modal.js';
import {renderCard, addCardOnPage} from './cards.js';
import {enableValidation, disableButton} from './validate.js';
import {getInitialCards, getProfileData, editProfile, publishCard, editAvatar} from './api.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePictureButton = document.querySelector('.profile__picture-button');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupAdd = document.querySelector('.popup_add');
const addForm = popupAdd.querySelector('.form');
const addFormButton = addForm.querySelector('.form__submit-button');

const popupProfile = document.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.form');
const profileFormButton = profileForm.querySelector('.form__submit-button');
const profileFormName = profileForm.querySelector('.form__input-text_field_name');
const profileFormCaption = profileForm.querySelector('.form__input-text_field_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const profilePic = document.querySelector('.profile__picture');
const pictureFormCaption = addForm.querySelector('.form__input-text_field_caption');
const pictureFormLink = addForm.querySelector('.form__input-text_field_link');

const popupProfilePic = document.querySelector('.popup_profile-picture');
const profilePictureForm = popupProfilePic.querySelector('.form');
const profilePictureFormButton = profilePictureForm.querySelector('.form__submit-button');
const profilePictureInput = profilePictureForm.querySelector('.form__input-text_field_link');

const profileData = {};


const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_status_inactive',
  inputErrorClass: 'form__input-text_status_error',
};

function handleEditProfilePopup () {
  openPopup(popupProfile);
  profileFormName.value = profileData.name;
  profileFormCaption.value = profileData.about;
}

function handleEditProfilePicturePopup () {
  openPopup(popupProfilePic);
}

function handleAddPopup () {
  openPopup(popupAdd);
}

function submitProfileForm (evt) {
  changeSubmitButtonText(profileFormButton, 'Сохранение...');
  evt.preventDefault();
  editProfile(profileFormName.value, profileFormCaption.value)
  .then((data) => {
    setProfileData(data);
    renderProfile(data);
    closePopup(popupProfile);
    disableButton(profileFormButton, validationElements.inactiveButtonClass);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    changeSubmitButtonText(profileFormButton, 'Сохранить');
  });
}

function addNewCard (evt) {
  changeSubmitButtonText(addFormButton, 'Сохранение...');
  evt.preventDefault();
  publishCard(pictureFormCaption.value, pictureFormLink.value)
  .then((data) => {
    addCardOnPage(renderCard(data, profileData.id))
    closePopup(popupAdd);
    addForm.reset();
    disableButton(addFormButton, validationElements.inactiveButtonClass);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    changeSubmitButtonText(addFormButton, 'Сохранить');
  });
}

function submitProfilePictureForm (evt) {
  changeSubmitButtonText(profilePictureFormButton, 'Сохранение...');
  evt.preventDefault();
  editAvatar(profilePictureInput.value)
  .then((data) => {
    setProfileData(data);
    renderProfile(data);
    closePopup(popupProfilePic);
    disableButton(profilePictureFormButton, validationElements.inactiveButtonClass);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    changeSubmitButtonText(profilePictureFormButton, 'Сохранить');
  });
}

profileEditButton.addEventListener('click', handleEditProfilePopup);
addButton.addEventListener('click', handleAddPopup);
profilePictureButton.addEventListener('click', handleEditProfilePicturePopup);

popupCloseButtons.forEach(closeButton => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click',() => closePopup(popup));
});

profileForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addNewCard);
profilePictureForm.addEventListener('submit', submitProfilePictureForm);

enableValidation(validationElements);

getProfileData()
.then((data) => {
  setProfileData(data);
  renderProfile(profileData);
  getInitialCards()
  .then((data) => {
    data.reverse().forEach(item => addCardOnPage(renderCard(item, profileData.id)));
    })
    .catch((err) => {
      console.log(err);
    });
})
  .catch((err) => {
    console.log(err);
});

function renderProfile (profileData) {
  profileName.textContent = profileData.name;
  profileCaption.textContent = profileData.about;
  profilePic.src = profileData.avatar;
}

function setProfileData (data) {
  profileData.name = data.name;
  profileData.about = data.about;
  profileData.avatar = data.avatar;
  profileData.id = data._id;
}

function changeSubmitButtonText (buttonElement, text) {
  buttonElement.value = text;
}

