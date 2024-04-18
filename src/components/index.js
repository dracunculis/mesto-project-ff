import "../pages/index.css";
import {
  openPopup,
  closePopup,
  escapeClose,
  addEscapeClose,
  removeEscapeClose,
  xButtonClose,
  overlayClose,
} from "./modal";
import { createCard, renderCard, deleteCard, cardLike } from "./card";
import { initialCards } from "./cards.js";

const cards = document.querySelector(".places__list");

// отображение карточки
initialCards.forEach((cardItem) => {
  renderCard(cardItem, "append");
});

// редактирование профиля
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const inputProfileName = formEditProfile.elements["name"];
const inputProfileDescription = formEditProfile.elements["description"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function fillingProfile() {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

buttonEditProfile.addEventListener("click", function () {
  fillingProfile();
  openPopup(popupEditProfile);
});

// закрытие попапа
document.addEventListener("click", xButtonClose);
document.addEventListener("click", overlayClose);

// редактирование имени и информации о себе
function formSubmitProfileEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;

  closePopup(evt.target.closest(".popup"));
}

formEditProfile.addEventListener("submit", formSubmitProfileEdit);

// добавление карточки
const buttonAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const inputPlaceName = formNewPlace.elements["place-name"];
const inputPlaceLink = formNewPlace.elements["link"];

buttonAddCard.addEventListener("click", function () {
  openPopup(popupNewCard);
});

// редактирование карточки
function formSubmitCardEdit(evt) {
  evt.preventDefault();
  const card = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  cards.prepend(createCard(card, deleteCard, cardLike, popupCurrentCard));
  closePopup(evt.target.closest(".popup"));
}

formNewPlace.addEventListener("submit", formSubmitCardEdit);

// открытие картинки
const popupCardWinImage = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardDescription = document.querySelector(".popup__caption");

function openCardImagePopup(target) {
  popupCardImage["src"] = target["src"];
  popupCardImage["alt"] = target["alt"];
  popupCardDescription.textContent = target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

function popupCurrentCard(evt) {
  openCardImagePopup(evt.target);
  openPopup(popupCardWinImage);
}
