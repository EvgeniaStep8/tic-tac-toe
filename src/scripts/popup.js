import { popup } from "./constants.js";

const openPopup = () => {
  popup.classList.add("popup-visible");
}

const closePopup = () => {
  popup.classList.remove("popup-visible");
}

export {openPopup, closePopup};