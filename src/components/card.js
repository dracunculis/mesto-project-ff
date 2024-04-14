export function createCard(card, deleteCard) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const cardImage = cardItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardItem.querySelector(".card__title").textContent = card.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardItem);
  });

  return cardItem;
}

export function renderCard(cardItem, method = "append") {
  const card = createCard(cardItem, deleteCard);
  placesList[method](card);
}

export function deleteCard(cardItem) {
  cardItem.remove();
}