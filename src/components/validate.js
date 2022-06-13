const showInputError = (formElement, inputElement, errorMessage, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(validationElements.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, validationElements) => {
  inputList.forEach(i => {
  });
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationElements.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationElements.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hideInputError = (formElement, inputElement, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(validationElements.inputErrorClass);
  errorElement.textContent = '';
};

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
