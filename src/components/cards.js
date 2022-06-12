import {openPopup} from './modal.js'
import {deleteCard, likeCard} from './api.js'

const cardTemplate = document.querySelector('#card-template').content;
const popupPic = document.querySelector('.popup_pic');
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

function addCardOnPage (card) {
  placesContainer.prepend(card);
}

function setLikes (likesData, likeCounter) {
    likeCounter.textContent = likesData.length;
}

function getLikeAction (likesData, profileId) {
  let action = 'PUT';
  likesData.forEach(element => {
    if(element._id === profileId) {
      action = 'DELETE';
    }
  });
  return action;
}

function setLikeButtonStatus (likesData, profileId, likeButton) {
  let isLikedByMe = false;
  likesData.some(element => {
    if(element._id === profileId) {
      isLikedByMe = true;
    }
  });
  if(isLikedByMe) {
    likeButton.classList.add('card__like-button_status_active');
  } else {
    likeButton.classList.remove('card__like-button_status_active');
  }
}

export {renderCard, addCardOnPage};
