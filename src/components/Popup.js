export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    _handleEscClose() {

    }

    open() {
        this.popupSelector.classList.add('popup_opened');
    }

    close() {
        this.popupSelector.classList.remove('popup_opened');
    }

    setEventListeners() {

    }
}

function openPopup(popupElement) {
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