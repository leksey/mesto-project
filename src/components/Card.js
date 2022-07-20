export default class Card {
    constructor({res, cardPopupHandler, cardDeleteHandler, likeCard, dislikeCard}, profileId, template) {
        this._name = res.name;
        this._link = res.link;
        this._likes = res.likes;
        this._ownerId = res.owner._id;
        this._profileId = profileId;
        this._template = template;
        //from api
        this._cardPopupHandler = cardPopupHandler;
        this._cardDeleteHandler = cardDeleteHandler;
        this._likeCard = likeCard;
        this._dislikeCard = dislikeCard;
    }

    _getTemplate() {
        return document.querySelector(#${this._template}).content.querySelector('.card').cloneNode(true);
    }

    generate() {
        this._element = this._getTemplate();
        this._cardPic = this._element.querySelector('.card__picture');
        this._cardDeleteButton = this._element.querySelector('.card__delete-button');
        this._cardCapture = this._element.querySelector('.card__capture');
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;
        this._cardCapture.textContent = this._name;

        this._setEventListeners();
        this._handleCardDeleteIcon();
        this.handleLikeStatus();
        this.handleLikeCounter();

        return this._element;
    }

    _likedByMe() {
        return this._likes.some((like) => {
            like._id === this._profileId;
        })
    }

    _handleCardDeleteIcon() {
        if (this._profileId !== this._ownerId) {
            this._cardDeleteButton.remove();
        }
    }

    setLikes(likes) {
        this._likes = likes;
    }

    handleLikeStatus() {
        if (this._likedByMe()) {
            this._cardLikeButton.classList.add('.card__like-button_status_active');
        } else {
            this._cardLikeButton.classList.remove('.card__like-button_status_active');
        }
    }

    handleLikeCounter() {
        this._likeCounter.textContent = this._likes.length;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            if (!this._likedByMe) {
                this._likeCard;
            } else {
                this._dislikeCard;
            }
        });
        this._cardDeleteButton.addEventListener('click', () => {
            this._cardDeleteHandler();
        });
        this._cardPic.addEventListener('click', () => {
            this._cardPopupHandler();
        })
    }
}