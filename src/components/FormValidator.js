export default class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._formElemenet = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => { //TODO: check if right
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (hasInvalidInput(inputList)) {
            disableButton(buttonElement, this._inactiveButtonClass);
        } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
        } else {
        hideInputError(inputElement);
        }
   }
}

  
  const checkInputValidity = (formElement, inputElement, validationElements) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationElements);
    } else {
      hideInputError(formElement, inputElement, validationElements);
    }
  };
  
  const setEventListeners = (formElement, validationElements) => {
    const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
    const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationElements);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationElements);
        toggleButtonState(inputList, buttonElement, validationElements);
      });
    });
  };
  
  const enableValidation = (validationElements) => {
    const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationElements);
    });
  };
  
  function disableButton (button, classToAdd) {
    button.classList.add(classToAdd);
    button.disabled = true;
  }
  
  export {enableValidation, disableButton};
  