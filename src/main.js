import "./assests/styles/style.css";
import { form, game, newGameButton, newRaundButton } from "./scripts/constants";
import { handleFormSubmit } from "./scripts/form";
import { handleGameClick, newGame, newRaund } from "./scripts/game.js";

form.addEventListener("submit", handleFormSubmit);
game.addEventListener("click", handleGameClick);
newRaundButton.addEventListener("click", newRaund);
newGameButton.addEventListener("click", newGame);
