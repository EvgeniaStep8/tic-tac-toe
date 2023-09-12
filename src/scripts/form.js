import { form, players, x, o } from "./constants.js";
import { closePopup } from "./popup.js";
import { player1, player2, } from "./game";

const resetInputs = (form) => {
  form.querySelectorAll(".input").forEach((input) => {
    input.value = "";
  });
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  player1.name = form.player1.value;
  player2.name = form.player2.value;

  players.textContent = `${player1.name} vs ${player2.name}`;
  x.textContent = `Крестики: ${player1.name}`;
  o.textContent = `Нолики: ${player2.name}`;

 resetInputs(form);
 closePopup();
};

export { handleFormSubmit };