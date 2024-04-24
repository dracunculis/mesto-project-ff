function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addEscapeClose();
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  removeEscapeClose();
}

function handleClosePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function addEscapeClose() {
  document.addEventListener("keydown", handleClosePopupByEsc);
}

function removeEscapeClose() {
  document.removeEventListener("keydown", handleClosePopupByEsc);
}

function setCloseModalByClickListeners(popupList) {

  popupList.forEach(popup => {
    // находим кнопку закрытия попапа
    const closeButton = popup.querySelector(".popup__close")

    // вешаем обработчик закрытия на кнопку
    closeButton.addEventListener('click', (evt) => {
      closePopup(popup);
    });

    // вешаем обработчик закрытия на оверлей
    popup.addEventListener('click', (evt) => {if (evt.target.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
    })
  })
} 

export { openPopup, closePopup, setCloseModalByClickListeners };