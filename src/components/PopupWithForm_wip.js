import Popup from './Popup_wip.js';

export default class PopupWithForm extends Popup {
    constructor(selector, callback) {
        super(selector);
        this._callback = callback;
        this._inputs = Array.from(this._popupElement.querySelectorAll('.form__input-text'));
        this._inputValues = {};
        this._popupForm = this._popupElement.querySelector('.form');
        
    }

    _getInputValue() {
        this._inputs.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    setEventListener() {
        super.setEventListener();
        this._popupElement.addEventListener('submit', () => {
            this._callback(this._getInputValue());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}

