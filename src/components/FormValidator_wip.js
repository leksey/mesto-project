export default class FormValidator {
  constructor({validationElements}, formElement) {
    this._formSelector = validationElements.formSelector;
    this._inputSelector = validationElements.inputSelector;
    this._submitButtonSelector = validationElements.submitButtonSelector;
    this._inactiveButtonClass = validationElements.inactiveButtonClass;
    this._inputErrorClass = validationElements.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`${inputElement.id}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return inputElement.validity.valid;
    })
  }

  _checkInputValidty(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton(this._buttonElement, this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  enableValidation() {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
  }
}
