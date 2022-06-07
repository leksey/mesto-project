const popupProfile = document.querySelector('.popup_profile');
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
  window.removeEventListener('keydown', handleEsc);
  document.removeEventListener('click', handleOverlayClick);
}

function handleEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && openedPopup != null) {
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

export {openPopup, closePopup, popupProfile};
