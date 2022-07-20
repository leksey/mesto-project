import Popup from './Popup_wip.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImg = this._popupElement.querySelector('.popup__image');
        this._popupCaption = this._popupElement.querySelector('.popup__capture');
    }
    
    open({name, link}) {
        super.open();
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupCaption.textContent = name;
    }
}