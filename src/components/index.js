import "../pages/index.css"
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(card, deleteCard) {
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

function renderCard(cardItem, method = "append") {
  const card = createCard(cardItem, deleteCard);
  placesList[method](card);
}

initialCards.forEach((cardItem) => {
  renderCard(cardItem, "append");
});

function deleteCard(cardItem) {
  cardItem.remove();
}

console.log("Hello, World!");
