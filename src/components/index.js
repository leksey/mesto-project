//new code
import '../pages/index.css';
import { 
  apiConfig,
  profileSelectors,
  validationElements,
  profileForm,
  cardTemplate,
  cardsContainerSelector,
  profileEditButton
} from './utils/constants.js';

import Api from './Api_class.js'; //TODO: fix path
import UserInfo from './UserInfo.js';
import Card from './Card_class.js';
import FormValidator from './FormValidator';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';



const api = new Api({url: apiConfig.baseUrl,
  header: apiConfig.headers
});

const userInfo = new UserInfo({nameSelector: profileSelectors.name,
  aboutSelector: profileSelectors.caption,
  avatarSelector: profileSelectors.pic

});

api.getProfileData()
.then((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
  api.getInitialCards()
  .then((data) => {
    //data.reverse().forEach(item => addCardOnPage(renderCard(item, profileData.id))); //TODO: replace with Section method
    const cardSection = new Section(
      {
        items: data.reverse(),
        renderer: (item) => {
          const card = new Card (item, cardTemplate, userInfo.id, {
                likeCard: () => {
                  api.likeCard(item._id)
                  .then((data) => {
                    card.setLikes(data.likes);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                },
                unLikeCard: () => {
                  api.unLikeCard(item._id)
                  .then((data) => {
                    card.setLikes(data.likes);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                },
                deleteCard: () => {
                  api.deleteCard(item._id)
                  .then(() => {
                    card.removeCard();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              });
              return card.renderCard();
            }
      },
        cardsContainerSelector
    );
      cardSection.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
})
  .catch((err) => {
    console.log(err);
});

const profilePopupValidator = new FormValidator({
  data: validationElements
},
profileForm);

const profilePopup = new PopupWithForm('.popup_profile', (inputs) => {
  profilePopup.setButtonState('Сохранение...');
  api.editProfile(inputs.name, inputs.about)
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id );
    profilePopup.close();
    profilePopupValidator.disableButton();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    profilePopup.setButtonState('Сохранить');
  })
});
profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () =>{
  profilePopup.setInputValue(userInfo.getUserInfo());
  profilePopup.open();
  profilePopupValidator.enableValidation();

});
// editProfile(profileFormName.value, profileFormCaption.value)
// .then((data) => {
//   setProfileData(data);
//   renderProfile(data);
//   closePopup(popupProfile);
//   disableButton(profileFormButton, validationElements.inactiveButtonClass);
// })
// .catch((err) => {
//   console.log(err);
// })
// .finally(function () {
//   changeSubmitButtonText(profileFormButton, 'Сохранить');
// });


//old code

import {openPopup, closePopup} from './modal.js';
import {renderCard, addCardOnPage} from './cards.js';
//import {enableValidation, disableButton} from './validate.js';
import {getInitialCards, getProfileData, editProfile, publishCard, editAvatar} from './api.js'


const addButton = document.querySelector('.profile__add-button');
const profilePictureButton = document.querySelector('.profile__picture-button');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupAdd = document.querySelector('.popup_add');
const addForm = popupAdd.querySelector('.form');
const addFormButton = addForm.querySelector('.form__submit-button');

const popupProfile = document.querySelector('.popup_profile');
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



// function handleEditProfilePopup () {
//   openPopup(popupProfile);
//   profileFormName.value = profileData.name;
//   profileFormCaption.value = profileData.about;
// }

function handleEditProfilePicturePopup () {
  openPopup(popupProfilePic);
}

function handleAddPopup () {
  openPopup(popupAdd);
}

// function submitProfileForm (evt) {
//   changeSubmitButtonText(profileFormButton, 'Сохранение...');
//   evt.preventDefault();
//   editProfile(profileFormName.value, profileFormCaption.value)
//   .then((data) => {
//     setProfileData(data);
//     renderProfile(data);
//     closePopup(popupProfile);
//     disableButton(profileFormButton, validationElements.inactiveButtonClass);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(function () {
//     changeSubmitButtonText(profileFormButton, 'Сохранить');
//   });
// }

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


addButton.addEventListener('click', handleAddPopup);
profilePictureButton.addEventListener('click', handleEditProfilePicturePopup);

popupCloseButtons.forEach(closeButton => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click',() => closePopup(popup));
});

//profileForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addNewCard);
profilePictureForm.addEventListener('submit', submitProfilePictureForm);

//enableValidation(validationElements);

// getProfileData()
// .then((data) => {
//   //setProfileData(data);
//   //renderProfile(profileData);
//   getInitialCards()
//   .then((data) => {
//     data.reverse().forEach(item => addCardOnPage(renderCard(item, profileData.id)));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })
//   .catch((err) => {
//     console.log(err);
// });

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

