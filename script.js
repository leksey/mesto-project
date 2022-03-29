//popup triggers
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//popup blocks & elements
const popUpProfile = document.querySelector('.popup_profile');
const popUpAdd = document.querySelector('.popup_add');
const popUpPic = document.querySelector('.popup_pic');
const popUpPicImg = popUpPic.querySelector('.popup__img')
const popUpPicCapture = popUpPic.querySelector('.popup__capture')


//forms & elements
const profileForm = popUpProfile.querySelector('.form');
const addForm = popUpAdd.querySelector('.form');
const profileFormName = document.querySelector('.form__input-text_field_name');
const profileFormCaption = document.querySelector('.form__input-text_field_caption');
const pictureFormCaption = popUpAdd.querySelector('.form__input-text_field_caption');
const pictureFormLink = popUpAdd.querySelector('.form__input-text_field_link');

//cards and where they should be placed
const placesContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

//page data
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

//functions
function openPopUp(popUpElement) {
  if(!popUpElement.classList.contains('popup__fade-transition')) {
    popUpElement.classList.add('popup__fade-transition');
  }
  popUpElement.classList.add('popup_opened');
}

function closePopUp(popUpElement) {
  const popUpCloseButton = popUpElement.querySelector('.popup__close-button');
  popUpCloseButton.addEventListener('click', function () {
    popUpElement.classList.remove('popup_opened');
  });
}

function handleEditProfilePopUp () {
  openPopUp(popUpProfile);
  profileFormName.value = profileName.textContent;
  profileFormCaption.value = profileCaption.textContent;
  closePopUp(popUpProfile);
}

function handleAddPopUp () {
  openPopUp(popUpAdd);
  closePopUp(popUpAdd);
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
    openPopUp(popUpPic);
    popUpPicImg.src = cardData.link;
    popUpPicImg.alt = cardData.name;
    popUpPicCapture.textContent = cardData.name;
    closePopUp(popUpPic);
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
  popUpAdd.classList.remove('popup_opened');
  addForm.reset();
}

function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileCaption.textContent = profileFormCaption.value;
  popUpProfile.classList.remove('popup_opened');
}

//page logic
initialCards.reverse().forEach(item => addCardOnPage(renderCard(item)));

//profile buttons logic
profileEditButton.addEventListener('click', handleEditProfilePopUp);

addButton.addEventListener('click', handleAddPopUp);

//forms logic
profileForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addNewCard);
