import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.form__submit-button');
        this._allInputs = Array.from(this._form.querySelectorAll('.form__input-text'));
        this._inputData = {};
    }

    _getInputValue() {
        this._allInputs.forEach((input) => {
            this._inputData[input.name] = input.value;
        })
        return this._inputData;
    }

    setInputValue(data) {
        this._allInputs.forEach((input) => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            this._submitForm(this._getInputValue());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}