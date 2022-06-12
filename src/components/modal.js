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
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

export {openPopup, closePopup};
