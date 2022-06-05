//popup triggers
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//popup blocks & elements
const popupProfile = document.querySelector('.popup_profile');
const popupAdd = document.querySelector('.popup_add');
const popupPic = document.querySelector('.popup_pic');
const popupPicImg = popupPic.querySelector('.popup__img')
const popupPicCapture = popupPic.querySelector('.popup__capture')
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');


//forms & elements
const profileForm = popupProfile.querySelector('.form');
const addForm = popupAdd.querySelector('.form');
const profileFormName = document.querySelector('.form__input-text_field_name');
const profileFormCaption = document.querySelector('.form__input-text_field_caption');
const pictureFormCaption = popupAdd.querySelector('.form__input-text_field_caption');
const pictureFormLink = popupAdd.querySelector('.form__input-text_field_link');

//cards and where they should be placed
const placesContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

//page data
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

//functions
function openPopup(popupElement) {
  if(!popupElement.classList.contains('popup__fade-transition')) {
    popupElement.classList.add('popup__fade-transition');
  }
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', handleEsc);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
}

function handleEditProfilePopup () {
  openPopup(popupProfile);
  profileFormName.value = profileName.textContent;
  profileFormCaption.value = profileCaption.textContent;
  enableValidation();
}

function handleAddPopup () {
  openPopup(popupAdd);
  enableValidation();
}

function renderCard (cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const pic = cardElement.querySelector('.card__picture');
  pic.src = cardData.link;
  pic.alt = cardData.name;
  cardElement.querySelector('.card__capture').textContent = cardData.name;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-button_status_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });

  pic.addEventListener('click', function() {
    openPopup(popupPic);
    popupPicImg.src = cardData.link;
    popupPicImg.alt = cardData.name;
    popupPicCapture.textContent = cardData.name;
  });
  return cardElement;
}

function addCardOnPage (card) {
  placesContainer.prepend(card);
}

function addNewCard (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = pictureFormCaption.value;
  newCard.link = pictureFormLink.value;
  addCardOnPage(renderCard(newCard));
  closePopup(popupAdd);
  addForm.reset();
}

function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileCaption.textContent = profileFormCaption.value;
  closePopup(popupProfile);
}

//page logic
initialCards.reverse().forEach(item => addCardOnPage(renderCard(item)));

//buttons logic
profileEditButton.addEventListener('click', handleEditProfilePopup);
addButton.addEventListener('click', handleAddPopup);

popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', function() {
    const popup = closeButton.closest('.popup_opened');
    closePopup(popup);
  });
});

//forms submit logic
profileForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addNewCard);

//closing popup by Esc
function handleEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(popup => closePopup(popup));
    window.removeEventListener('keydown', handleEsc);
  }
}

//closing popup by overlay
function handleOverlayClick(evt) {
  console.log(evt.target.classList);
  if (evt.target.classList.contains('popup')) {
    popups.forEach(popup => closePopup(popup));
    document.removeEventListener('click', handleOverlayClick);
  }
}

//VALIDATION
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add('form__input-text_status_error');
  errorElement.textContent = errorMessage;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  inputList.forEach(i => {
  });
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit-button_status_inactive');
  } else {
    buttonElement.classList.remove('form__submit-button_status_inactive');
  }
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove('form__input-text_status_error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));
  const buttonElement = formElement.querySelector('.form__submit-button');
  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement);
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};



