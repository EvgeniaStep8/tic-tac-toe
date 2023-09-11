const game = document.querySelector(".game");
const cells = document.querySelectorAll(".cell");
const endOverlay = document.querySelector(".end-overlay");
const winner = document.querySelector(".winner");
const raund = document.querySelector(".raund");
const players = document.querySelector(".players");
const newRaundButton = document.querySelector(".new-raund");
const popup = document.querySelector(".popup");
const form = document.forms.players;
const x = document.querySelector("#x");
const o = document.querySelector("#o");

let gameRaund = 1;
let move = 1;
const lastAvailableMove = 9;
let player1, player2;

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  player1 = form.player1.value;
  player2 = form.player2.value;

  players.textContent = `${player1} vs ${player2}`;
  x.textContent = `Крестики: ${player1}`;
  o.textContent = `Нолики: ${player2}`;

  popup.classList.add("popup-close");
};

const resetField = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    if (cell.classList.contains("cell-winner")) {
      cell.classList.remove("cell-winner");
    }
  });
};

const newGame = () => {
  resetField();
  gameRaund++;
  move = 1;
  raund.textContent = `Раунд ${gameRaund}`;
  endOverlay.classList.remove("end-overlay-visible");
};

const endOfGame = (player) => {
  if (player === "draw") {
    winner.textContent = "Ничья";
    return;
  }
  const win = player === "X" ? player1 : player2;
  winner.textContent = `Победитель: ${win}`;
  endOverlay.classList.add("end-overlay-visible");
};

const checkWinner = (player) => {
  let winnerCombination, gameCombination;
  for (let i = 0; i < winnerCombinations.length; i++) {
    winnerCombination = winnerCombinations[i];
    gameCombination = [
      cells[winnerCombination[0]],
      cells[winnerCombination[1]],
      cells[winnerCombination[2]],
    ];
    if (gameCombination.every((cell) => cell.textContent === player)) {
      gameCombination.forEach((cell) => {
        cell.classList.add("cell-winner");
      });
      return true;
    }
  }
  return false;
};

const handleGameClick = (evt) => {
  if (evt.target !== evt.currentTarget && evt.target.textContent === "") {
    let player = move % 2 ? "X" : "O";
    evt.target.textContent = player;
    if (move > 4) {
      if (checkWinner(player)) {
        endOfGame(player);
      } else if (move === 9) {
        endOfGame("draw");
      }
    }
    move++;
  }
};

form.addEventListener("submit", handleFormSubmit);
game.addEventListener("click", handleGameClick);
newRaundButton.addEventListener("click", newGame);
