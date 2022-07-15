export default class Card {
  constructor({data, profileId}, cardTemplate, likeCard, deleteCard, openPopup) {
    this._data = data;
    this._profileId = profileId;
    this._cardTemplate = cardTemplate;
    this._likeCard = likeCard;
    this._deleteCard = deleteCard;
    this._openPopup = openPopup;
  }

  _setLikes (likesData, likeCounter) {
    likeCounter.textContent = likesData.length;
  }

  _setLikeButtonStatus (likesData, likeButton) {
    let isLikedByMe = false;
    likesData.some(element => {
      if(element._id === this._profileId) {
        isLikedByMe = true;
      }
    });
    if(isLikedByMe) {
      likeButton.classList.add('card__like-button_status_active');
    } else {
      likeButton.classList.remove('card__like-button_status_active');
    }
  }

  _getLikeAction (likesData) {
    let action = 'PUT';
    likesData.forEach(element => {
      if(element._id === this._profileId) {
        action = 'DELETE';
      }
    });
    return action;
  }

  _renderCard() {
    const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    const pic = cardElement.querySelector('.card__picture');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const cardCapture = cardElement.querySelector('.card__capture')
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const popupPic = document.querySelector('.popup_pic');

    let likesArr = this._data.likes;

    pic.src = this._data.link;
    pic.alt = this._data.name;
    cardCapture.textContent = this._data.name;

    this._setLikes(likesArr, likeCounter);
    this._setLikeButtonStatus(likesArr, likeButton);


    likeButton.addEventListener('click', function() {
      const action = this._getLikeAction(likesArr);
      this._likeCard(action, this._data) //TODO: check if 'this.data' works correctly
        .then((data) => {
          likesArr = data.likes;
          this._setLikes(likesArr, likeCounter);
          this._setLikeButtonStatus(likesArr, likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    if (this._profileId === this._data.owner._id) {
      deleteButton.addEventListener('click', function(evt) {
        this._deleteCard(this._data._id)
        .then(() => {
          evt.target.closest('.card').remove();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      deleteButton.classList.add('card__delete-button_status_hidden');
    }

    pic.addEventListener('click', function() {
      this._openPopup(popupPic);
      popupPicImg.src = this._data.link;
      popupPicImg.alt = this._data.name;
      popupPicCapture.textContent = this._data.name;
    });
    return cardElement;
  }

  addCardOnPage (card, cardContainer) {
    cardContainer.prepend(card);
  }
}


import {openPopup} from './modal.js'
import {deleteCard, likeCard} from './api.js'

const cardTemplate = document.querySelector('#card-template').content;
const popupPicImg = popupPic.querySelector('.popup__img');
const popupPicCapture = popupPic.querySelector('.popup__capture');
const placesContainer = document.querySelector('.places');

function renderCard (cardData, profileId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const pic = cardElement.querySelector('.card__picture');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardCapture = cardElement.querySelector('.card__capture')
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  let likesArr = cardData.likes;

  pic.src = cardData.link;
  pic.alt = cardData.name;
  cardCapture.textContent = cardData.name;

  setLikes(likesArr, likeCounter);
  setLikeButtonStatus(likesArr, profileId, likeButton);


  likeButton.addEventListener('click', function(evt) {
    const action = getLikeAction(likesArr, profileId);
    likeCard(action, cardData._id)
      .then((data) => {
        likesArr = data.likes;
        setLikes(likesArr, likeCounter);
        setLikeButtonStatus(likesArr, profileId, likeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  });


  if (profileId === cardData.owner._id) {
    deleteButton.addEventListener('click', function(evt) {
      deleteCard(cardData._id)
      .then(() => {
        evt.target.closest('.card').remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    deleteButton.classList.add('card__delete-button_status_hidden');
  }

  pic.addEventListener('click', function() {
    openPopup(popupPic);
    popupPicImg.src = cardData.link;
    popupPicImg.alt = cardData.name;
    popupPicCapture.textContent = cardData.name;
  });
  return cardElement;
}

// function addCardOnPage (card) {
//   placesContainer.prepend(card);
// }

//export {renderCard, addCardOnPage};

// приинимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card. Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта функция должна открывать попап с картинкой.
