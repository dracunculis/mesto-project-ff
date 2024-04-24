const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteCard, likeCard, openImagePopup) {
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
    openImagePopup(evt);
  })

  return cardItem;
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

function deleteCard(cardItem) {
  cardItem.remove();
}

export { createCard, deleteCard, likeCard}