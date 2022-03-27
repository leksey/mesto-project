//popup triggers
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//popup blocks
const popUpProfile = document.querySelector('.popup_profile');
const popUpAdd = document.querySelector('.popup_add');
const popUpPic = document.querySelector('.popup_pic');

//forms
const profileForm = popUpProfile.querySelector('.form');
const addForm = popUpAdd.querySelector('.form');
const profileFormName = document.querySelector('.form__input-text_field_name');
const profileFormCaption = document.querySelector('.form__input-text_field_caption');

//cards and where they should be placed
const placesContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

//page data
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//page logic
initialCards.reverse().forEach(item => renderCard(item));

//profile buttons logic
profileEditButton.addEventListener('click', function () {
  popUpHandle(popUpProfile);
  profileFormName.value = profileName.textContent;
  profileFormCaption.value = profileCaption.textContent;
});

addButton.addEventListener('click', function () {
  popUpHandle(popUpAdd);
});

//forms logic
profileForm.addEventListener('submit', formSubmitHandle);
addForm.addEventListener('submit', newCardAdd);

//functions
function popUpHandle(popUpElement) {
  const popUpCloseButton = popUpElement.querySelector('.popup__close-button');
  if(!popUpElement.classList.contains('popup__fade-transition')) {
    popUpElement.classList.add('popup__fade-transition');
  }
  popUpElement.classList.add('popup_opened');
  popUpCloseButton.addEventListener('click', function () {
    popUpElement.classList.remove('popup_opened');
  });
}

function renderCard (cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__picture').src = cardData.link;
  cardElement.querySelector('.card__capture').textContent = cardData.name;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-button_status_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(evt) {
    evt.target.parentNode.remove();
  });

  const pic = cardElement.querySelector('.card__picture');
  pic.addEventListener('click', function(evt) {
    popUpHandle(popUpPic);
    popUpPic.querySelector('.popup__img').src = evt.target.src;
    popUpPic.querySelector('.popup__capture').textContent = evt.target.parentNode.querySelector('.card__capture').textContent;
  });
  placesContainer.prepend(cardElement);
}

function newCardAdd (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popUpAdd.querySelector('.form__input-text_field_caption').value;
  newCard.link = popUpAdd.querySelector('.form__input-text_field_link').value;
  renderCard(newCard);
  popUpAdd.classList.remove('popup_opened');
}

function formSubmitHandle (evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileCaption.textContent = profileFormCaption.value;
  popUpProfile.classList.remove('popup_opened');
}
