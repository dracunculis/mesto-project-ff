import "../pages/index.css";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
import { openPopup, closePopup, setCloseModalByClickListeners } from "./modal";
import { createCard, likeCard } from "./card";
import { enableValidation, clearValidation } from "./validation";
import {
  getInitialCards,
  getUserProfile,
  updateProfile,
  updateAvatar,
  uploadCard,
  deleteLike,
  addLike,
  deleteCard,
} from "./api";

enableValidation(validationConfig);

// отображение карточки - updated

const cardsContainer = document.querySelector(".places__list");
const cardConfig = {
  likeCard: likeCard,
  openImagePopup: openImagePopup,
  confirmDeletion: confirmDeletion,
  deleteLike: deleteLike,
  addLike: addLike,
};

function renderCard(res, ownerId, cardConfig, openImagePopup) {
  console.log(res);
  cardsContainer.append(createCard(res, ownerId, cardConfig, openImagePopup));
}

//удаление карточки
const confirmCardDeletionPopup = document.querySelector(
  ".popup_type_confirm_card_deletion"
);
const button = confirmCardDeletionPopup.querySelector(".popup__button");

let cardToDelete;

button.addEventListener("click", (event) => {
  event.preventDefault();
  deleteCardListener();
});

function deleteCardListener() {
  deleteCard(cardToDelete.cardId)
    .then(() => {
      cardToDelete.cardElement.remove();
      closePopup(confirmCardDeletionPopup);
    })
    .catch((error) => console.log(error));
}

function confirmDeletion(cardElement, cardId) {
  openPopup(confirmCardDeletionPopup);
  cardToDelete = {
    cardId: cardId,
    cardElement: cardElement,
  };
}

// редактирование профиля - updated
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const inputProfileName = formEditProfile.elements["name"];
const inputProfileDescription = formEditProfile.elements["description"];
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

function fillEditProfileForm() {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

buttonEditProfile.addEventListener("click", function () {
  console.log(formEditProfile);
  fillEditProfileForm();
  openPopup(popupEditProfile);
  clearValidation(formEditProfile, validationConfig);
});

function submitEditProfile(evt, name, description) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  updateProfile(name, description)
    .then((data) => {
      renderProfile(data);
      closePopup(popupEditProfile);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

formEditProfile.addEventListener("submit", (evt) =>
  submitEditProfile(evt, inputProfileName.value, inputProfileDescription.value)
);

function renderProfile(res) {
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about.replace(
    /[^а-яА-ЯёЁa-zA-Z \-]+/g,
    ""
  );
  profileImage.style.backgroundImage = `url(${res.avatar})`;
}

// закрытие попапа
const popupList = Array.from(document.querySelectorAll(".popup"));
setCloseModalByClickListeners(popupList);

// редактирование имени и информации о себе
//function handleProfileFormSubmit(evt) {
// evt.preventDefault();
//profileTitle.textContent = inputProfileName.value;
//profileDescription.textContent = inputProfileDescription.value;

// closePopup(popupEditProfile);
//}

//formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Смена аватара - добавлено
const profileImage = document.querySelector(".profile__image");
const popupUpdateAvatar = document.querySelector(".popup_type_update_avatar");
const formUpdateAvatar = document.forms["update__avatar"];
const inputUpdateAvatar = formUpdateAvatar.elements["link"];

profileImage.addEventListener("click", () => {
  profileImage.classList.add("clicked");
  inputUpdateAvatar.value = "";
  openPopup(popupUpdateAvatar);
  clearValidation(formUpdateAvatar, validationConfig);
});

profileImage.addEventListener("mouseout", () =>
  profileImage.classList.remove("clicked")
);

function submitUpdateAvatar(evt, avatar) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  updateAvatar(avatar)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupUpdateAvatar);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

formUpdateAvatar.addEventListener("submit", (evt) =>
  submitUpdateAvatar(evt, inputUpdateAvatar.value)
);

// добавление карточки - обновлено
const buttonAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const inputPlaceName = formNewPlace.elements["place-name"];
const inputPlaceLink = formNewPlace.elements["link"];

buttonAddCard.addEventListener("click", function () {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupNewCard);
});

// редактирование карточки
//function handleCardFormSubmit(evt) { //delete?
//evt.preventDefault();
//const card = {
//  name: inputPlaceName.value,
// link: inputPlaceLink.value,
// };
// cardsContainer.prepend(
//   createCard(card, deleteCard, likeCard, openImagePopup)
// );
// formNewPlace.reset();
// closePopup(popupNewCard);
//}

formNewPlace.addEventListener("submit", submitAddNewCard); //formAddNewCard.addEventListener('submit', (event) => submitAddNewCard(event));

function submitAddNewCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  const card = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };

  uploadCard(card)
    .then((data) => {
      cardsContainer.prepend(createCard(data, data.owner._id, cardConfig, openImagePopup));
      closePopup(popupNewCard);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      evt.submitter.textContent = "Создать";
    });
}

// открытие картинки - no chane
const popupCardWithImage = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardDescription = document.querySelector(".popup__caption");

function fillImagePopup(card) {
  console.log(card)
  popupCardImage.src = card.link;
  popupCardImage.alt = card.name;
  popupCardDescription.textContent = card.name;
    
}

function openImagePopup(evt) {
  fillImagePopup(evt.target);
  openPopup(popupCardWithImage);
}

// Загрузка данных с сервера
Promise.all([getUserProfile(), getInitialCards()])
  .then((data) => {
    renderProfile(data[0]);
    data[1].forEach(function (item) {
      renderCard(item, data[0]._id, cardConfig, openImagePopup);
    });
  })
  .catch((error) => console.log(error));
