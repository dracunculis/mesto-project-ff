import { openPopup, closePopup, handleClosePopupByEsc, addEscapeClose, removeEscapeClose} from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteCard, likeCard, openCardPopup) {
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
    likeCard(evt);
  });

  cardImage.addEventListener('click', (evt) => {
    openCardPopup(evt);
  })

  return cardItem;
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

function deleteCard(cardItem) {
  cardItem.remove();
}

//Отображение полноэкранной картинки
const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const popupCardWindow = document.querySelector('.popup_type_image');

function openCardPopup(event) {
  const target = event.target;

  fillCardImagePopup(target);
  openPopup(popupCardWindow);
}

function fillCardImagePopup(target) {
  popupCardImage.src = target.src;
  popupCardImage.alt = target.alt;
  popupCardCaption.textContent = target.closest('.card').querySelector('.card__title').textContent;
}


export { createCard, deleteCard, likeCard, openCardPopup }