import '../pages/index.css';
import {
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
} from './utils/constants.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import FormValidator from './FormValidator';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage';



const api = new Api({url: apiConfig.baseUrl,
  header: apiConfig.headers
});

const userInfo = new UserInfo({nameSelector: profileSelectors.name,
  aboutSelector: profileSelectors.caption,
  avatarSelector: profileSelectors.pic

});

const popupWithImage = new PopupWithImage('.popup_pic');
popupWithImage.setEventListeners();


api.getProfileData()
.then((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
  api.getInitialCards()
  .then((data) => {
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
                },
                handlePopup: () => {
                  popupWithImage.open(item.name, item.link);
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
}, profileForm);

const profilePopup = new PopupWithForm('.popup_profile', (inputs) => {
  profilePopup.setButtonState('Сохранение...');
  api.editProfile(inputs.name, inputs.about)
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    profilePopup.close();
    profilePopupValidator.disableButton();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    profilePopup.setButtonState('Сохранить');
  });
});

profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () =>{
  profilePopup.setInputValue(userInfo.getUserInfo());
  profilePopup.open();
  profilePopupValidator.enableValidation();
  profilePopupValidator.disableButton();
});


const avatarPopupValidator = new FormValidator({
  data: validationElements
}, profilePictureForm);

const avatarPopup = new PopupWithForm('.popup_profile-picture', (inputs) => {
  avatarPopup.setButtonState('Сохранение...');
  api.editAvatar(inputs.avatar)
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    avatarPopup.close();
    avatarPopupValidator.disableButton();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    changeSubmitButtonText(profilePictureFormButton, 'Сохранить');
  });
});

avatarPopup.setEventListeners();

profilePictureButton.addEventListener('click', () =>{
  avatarPopup.open();
  avatarPopupValidator.enableValidation();
  avatarPopupValidator.disableButton();
});


const cardPopupValidator = new FormValidator({
  data: validationElements
}, addForm);

const cardPopup = new PopupWithForm('.popup_add', (inputs) => {
  cardPopup.setButtonState('Сохранение...');
  api.publishCard(inputs.name, inputs.link)
  .then((data) => {
    console.log(data);
    const addedCardSection = new Section(
      {
        items: data,
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
                },
                handlePopup: () => {
                  popupWithImage.open(item.name, item.link);
                }
              });
              return card.renderCard();
            }
      },
        cardsContainerSelector
    );
    addedCardSection.addItem(data);
    cardPopup.close();
    cardPopupValidator.disableButton();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    cardPopup.setButtonState('Сохранить');
  });
});

cardPopup.setEventListeners();

addButton.addEventListener('click', () =>{
  cardPopup.open();
  cardPopupValidator.enableValidation();
  cardPopupValidator.disableButton();
});
