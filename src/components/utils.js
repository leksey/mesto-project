const popupProfile = document.querySelector('.popup_profile');
const popupAdd = document.querySelector('.popup_add');
const popups = document.querySelectorAll('.popup');


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

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(popup => closePopup(popup));
    window.removeEventListener('keydown', handleEsc);
  }
}

function handleOverlayClick(evt) {
  console.log(evt.target.classList);
  if (evt.target.classList.contains('popup')) {
    popups.forEach(popup => closePopup(popup));
    document.removeEventListener('click', handleOverlayClick);
  }
}

export {openPopup, closePopup, popupProfile, popupAdd};
