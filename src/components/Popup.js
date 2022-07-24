export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
          }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('click', this._handleOverlayClick.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        document.removeEventListener('click', this._handleOverlayClick.bind(this));
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        })
    }
}
