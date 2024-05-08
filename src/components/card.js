const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, ownerId, cardConfig) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = cardItem.querySelector(".card__like-button");

  const cardImage = cardItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => cardConfig.openImagePopup(card));

  cardItem.querySelector(".card__title").textContent = card.name;
  const cardId = card._id;

  buttonLike.addEventListener("click", (evt) => {
    cardConfig.likeCard(evt, cardId, cardConfig);
  });

  const likesCounter = cardItem.querySelector(".card__like-counter");
  likesCounter.textContent = card.likes.length === 0 ? "" : card.likes.length;
  if (card.likes.some(like => like._id === ownerId)) {
    likeButton.classList.add('card__like-button_is-active');
}

const cardDeleteButton = cardItem.querySelector(".card__delete-button");
if (card.owner._id !== ownerId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () =>
      cardConfig.confirmDeletion(cardItem, cardId)
    );
  }

  cardImage.addEventListener("click", (evt) => {
    openImagePopup(evt);
  });

  return cardItem;
}

function likeCard(evt, cardId, cardConfig) {
  const likeButton = evt.target;
  const card = likeButton.closest(".card");
  const likes = card.querySelector(".card__like-counter");

  if (likeButton.classlist.containes("card__like-button_is-active")) {
    cardConfig
      .deleteLike(cardId)
      .then((data) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likes.textContent = data.likes.length === 0 ? "" : data.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    cardConfig
      .addLike(cardId)
      .then((data) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likes.textContent = data.likes.length === 0 ? "" : data.likes.length;
      })
      .catch((error) => console.log(error));
  }
}


export { createCard, likeCard };
