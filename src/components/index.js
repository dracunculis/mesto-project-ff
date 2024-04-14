import "../pages/index.css"
import {openModal, closeModal} from "./modal";
import {createCard, renderCard, deleteCard} from "./card";
import {initialCards} from "./cards.js"

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

initialCards.forEach((cardItem) => {
  renderCard(cardItem, "append");
});