import "../pages/index.css";
import {
  openPopup,
  closePopup,
  handleClosePopupByEsc,
  addEscapeClose,
  removeEscapeClose,
  setCloseModalByClickListeners
} from "./modal";
import { createCard, deleteCard, likeCard, openCardPopup } from "./card";
import { initialCards } from "./cards.js";

// отображение карточки

const cardsContainer = document.querySelector(".places__list");

function renderCard(cardItem, method = "append") {
  const card = createCard(cardItem, deleteCard, likeCard, openCardPopup);
  cardsContainer[method](card);
}

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

function fillEditProfileForm() {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

buttonEditProfile.addEventListener("click", function () {
  fillEditProfileForm();
  openPopup(popupEditProfile);
});

// закрытие попапа
const popupList = Array.from(document.querySelectorAll(".popup"));
setCloseModalByClickListeners(popupList);

// редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

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
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  cardsContainer.prepend(createCard(card, deleteCard, likeCard, openCardPopup));
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
  closePopup(popupEditProfile);
}

formNewPlace.addEventListener("submit", handleCardFormSubmit);

// открытие картинки
const popupCardWithImage = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardDescription = document.querySelector(".popup__caption");

function fillImagePopup(target) {
  popupCardImage.src = target.src;
  popupCardImage.alt = target.alt;
  popupCardDescription.textContent = target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

function openImagePopup(evt) {
  fillImagePopup(evt.target);
  openPopup(popupCardWithImage);
}
