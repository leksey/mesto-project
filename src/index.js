import './pages/index.css';
import {openPopup, closePopup, popupProfile} from './components/modal.js';
import {renderCard, addCardOnPage} from './components/cards.js';
import {enableValidation} from './components/validate.js';
import {disableButton} from './components/utils.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const profileForm = popupProfile.querySelector('.form');

const popupAdd = document.querySelector('.popup_add');
const addForm = popupAdd.querySelector('.form');
const addFormButton = addForm.querySelector('.form__submit-button');

const profileFormName = document.querySelector('.form__input-text_field_name');
const profileFormCaption = document.querySelector('.form__input-text_field_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const pictureFormCaption = popupAdd.querySelector('.form__input-text_field_caption');
const pictureFormLink = popupAdd.querySelector('.form__input-text_field_link');



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
}

function handleAddPopup () {
  openPopup(popupAdd);
}

function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileCaption.textContent = profileFormCaption.value;
  closePopup(popupProfile);
}

function addNewCard (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = pictureFormCaption.value;
  newCard.link = pictureFormLink.value;
  addCardOnPage(renderCard(newCard));
  closePopup(popupAdd);
  addForm.reset();
  disableButton(addFormButton, validationElements.inactiveButtonClass);
}

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

enableValidation(validationElements);
