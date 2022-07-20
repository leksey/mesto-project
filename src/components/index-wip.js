import '../pages/index.css';
import Card from './Card_wip.js';
import Api from './Api.js';
import FormValidator from './FormValidator_wip';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage_wip.js';
import PopupWithForm from './PopupWithForm_wip.js';

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

function createCard(item, ownerId) {
    const card = new Card(
        {
            res: item,
        }
    )
}