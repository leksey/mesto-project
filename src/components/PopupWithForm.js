import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValue() {

    }

    setEventListeners() {
        super.setEventListeners();
        this._submitForm();
    }

    close() {
        super.close();
        
    }
}