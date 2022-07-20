export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        window.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        window.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        if (evt.key === 'Escape') {
//      const openedPopup = document.querySelector('.popup_opened');
//      надо ли его оставлять? думаю нет, мы будем вызывать класс
//      по необходимости, а тут жесткая привязанность
            this._close(openedPopup);
        }
    }

    setEventListener() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup__close-button')) {
                this._close();
            }
        });
    }

    // в задаче ничего не говориться про clickOnOverlay
}