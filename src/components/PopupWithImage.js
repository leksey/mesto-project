import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPic = this._popup.querySelector('.popup__img');
        this._popupCaption = this._popup.querySelector('.popup__capture');
    }

    open(name, link) {
        super.open();
        this._popupPic.src = link;
        this._popupPic.alt = name;
        this._popupCaption = name;
    }
}