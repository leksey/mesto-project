export default class Card {
  constructor (data, templateSelector, profileId) {
    this._data = data;
    this._profileId = profileId;
    this._likesData = data.likes;
    this._link = data.link;
    this._name = data.name;

    this._template = document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
    this._likeCounter = this._template.querySelector('.card__like-counter');
    this._likeButton = this._template.querySelector('.card__like-button');
    this._pic = this._template.querySelector('.card__picture');
    this._cardCapture = this._template.querySelector('.card__capture');
    this._deleteButton = this._template.querySelector('.card__delete-button');
  }

  _setLikes () {
    this._likeCounter.textContent = this._likesData.length;
  }

  _setLikeButtonStatus () {
    let isLikedByMe = false;
    this._likesData.some(element => {
      if(element._id === this._profileId) {
        isLikedByMe = true;
      }
    });
    if(isLikedByMe) {
      this._likeButton.classList.add('card__like-button_status_active');
    } else {
      this._likeButton.classList.remove('card__like-button_status_active');
    }
    return this._likeButton.classList;
  }

  _setEventListeners () {
    this._likeButton.addEventListener('click', this._);
  }

  renderCard (cardData, profileId) {
    let likesArr = cardData.likes;

    this._pic.src = this._link;
    this._pic.alt = this._name;
    this._cardCapture.textContent = this._name;

    this._setLikes();
    this._setLikeButtonStatus();





    if (profileId === this._likesData.owner._id) {
      this._deleteButton.addEventListener('click', function(evt) {
        deleteCard(cardData._id)
        .then(() => {
          evt.target.closest('.card').remove();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      this._deleteButton.classList.add('card__delete-button_status_hidden');
    }

    this._pic.addEventListener('click', function() {
      openPopup(popupPic);
      popupPicImg.src = cardData.link;
      popupPicImg.alt = cardData.name;
      popupPicCapture.textContent = cardData.name;
    });
    return cardElement;
  }

}
