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
}

function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
}

function handleEditProfilePopup () {
  openPopup(popupProfile);
  profileFormName.value = profileName.textContent;
  profileFormCaption.value = profileCaption.textContent;
}

function handleAddPopup () {
  openPopup(popupAdd);
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
