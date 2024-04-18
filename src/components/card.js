import { openPopup, closePopup, escapeClose, addEscapeClose, removeEscapeClose, xButtonClose, overlayClose } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(card, deleteCard, cardLike) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const buttonLike = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardItem.querySelector(".card__title").textContent = card.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardItem);
  });

  buttonLike.addEventListener("click", (evt) => {
    cardLike(evt);
  });

  cardImage.addEventListener('click', (evt) => {
    popupCard(evt);
  })

  return cardItem;
}

function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

function renderCard(cardItem, method = "append") {
  const card = createCard(cardItem, deleteCard, cardLike);
  placesList[method](card);
}

function deleteCard(cardItem) {
  cardItem.remove();
}

//Отображение полноэкранной картинки
const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const popupCardWindow = document.querySelector('.popup_type_image');

function popupCard(event) {
  const target = event.target;

  fillCardImagePopup(target);
  openPopup(popupCardWindow);
}

function fillCardImagePopup(target) {
  popupCardImage['src'] = target['src'];
  popupCardImage['alt'] = target['alt'];
  popupCardCaption.textContent = target.closest('.card').querySelector('.card__title').textContent;
}


export { createCard, renderCard, deleteCard, cardLike }