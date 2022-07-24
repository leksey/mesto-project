export default class Card {
  constructor (data, templateSelector, profileId, { likeCard, unLikeCard } /*, deleteCard }/*, handlePopup*/) {
    this._data = data;
    this._profileId = profileId;
    this._likesData = data.likes;
    this._link = data.link;
    this._name = data.name;
// // from API
    this._likeCard = likeCard;
    this._unLikeCard = unLikeCard;
    //this._deleteCard = deleteCard;

// // from popup
//     this._handlePopup = handlePopup;

    this._template = document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
    this._likeCounter = this._template.querySelector('.card__like-counter');
    this._likeButton = this._template.querySelector('.card__like-button');
    this._pic = this._template.querySelector('.card__picture');
    this._cardCapture = this._template.querySelector('.card__capture');
    this._deleteButton = this._template.querySelector('.card__delete-button');
  }

  setLikes (data) {
    this._likeCounter.textContent = data.length;
  }

  setLikeButtonStatus (data) {
    data.some((element) => {
      if(element._id === this._profileId) {

        this._likeButton.classList.add('card__like-button_status_active');
      } else {
        this._likeButton.classList.remove('card__like-button_status_active');
      }
    })
  }

  _likedByMe() {
    return this._likesData.some((element) => element._id === this._profileId)
  }

  _handleLike() {
      if(this._likedByMe()) {
        this._unLikeCard();
      } else {
        this._likeCard();
      }
  }

  _checkIfMine() {
    if (this._profileId != this._data.owner._id) {
      this._deleteButton.classList.add('card__delete-button_status_hidden');
    } else {
      this._deleteButton.classList.remove('card__delete-button_status_hidden');
    }
  }

  _setEventListeners () {
    this._likeButton.addEventListener('click',() => {
      this._handleLike();
    });
    this._deleteButton.addEventListener('click', this._deleteCard);
    // this._pic.addEventListener('click', this._handlePopup);
  }

  renderCard () {

    this._pic.src = this._link;
    this._pic.alt = this._name;
    this._cardCapture.textContent = this._name;

    this._checkIfMine();
    this.setLikes(this._likesData);
    this.setLikeButtonStatus(this._likesData);
    this._setEventListeners();
    return this._template;
  }
}
