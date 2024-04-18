function openPopup(target) {
  target.classList.add("popup_is-opened");
  addEscapeClose();
}

function closePopup(target) {
  target.classList.remove("popup_is-opened");
  removeEscapeClose();
}

function escapeClose(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function addEscapeClose() {
  document.addEventListener("keydown", escapeClose);
}

function removeEscapeClose() {
  document.removeEventListener("keydown", escapeClose);
}

function xButtonClose(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest(".popup"));
  }
}

function overlayClose(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, xButtonClose, overlayClose };