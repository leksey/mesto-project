function disableButton (button, classToAdd) {
  button.classList.add(classToAdd);
  button.value = 'Сохранить';
}

export {disableButton};
