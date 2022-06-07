import {openPopup} from './modal.js'

const cardTemplate = document.querySelector('#card-template').content;
const popupPic = document.querySelector('.popup_pic');
const popupPicImg = popupPic.querySelector('.popup__img');
const popupPicCapture = popupPic.querySelector('.popup__capture');
const placesContainer = document.querySelector('.places');

function renderCard (cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const pic = cardElement.querySelector('.card__picture');
  pic.src = cardData.link;
  pic.alt = cardData.name;
  cardElement.querySelector('.card__capture').textContent = cardData.name;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-button_status_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });

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

export {renderCard, addCardOnPage};
