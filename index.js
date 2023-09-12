const game = document.querySelector(".game");
const cells = document.querySelectorAll(".cell");
const endOverlay = document.querySelector(".end-overlay");
const winner = document.querySelector(".winner");
const raund = document.querySelector(".raund");
const players = document.querySelector(".players");
const newRaundButton = document.querySelector(".new-raund");
const newGameButton = document.querySelector(".new-game");
const popup = document.querySelector(".popup");
const form = document.forms.players;
const x = document.querySelector("#x");
const o = document.querySelector("#o");
const count = document.querySelector(".count");

let gameRaund = 1;
let move = 1;
const lastAvailableMove = 9;
let player1 = { count: 0, symbol: "X" };
let player2 = { count: 0, symbol: "O"};

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

const openPopup = () => {
  popup.classList.add("popup-visible");
}

const closePopup = () => {
  popup.classList.remove("popup-visible");
}

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
  gameRaund = 1;
  move = 1;

  player1 = { count: 0, symbol: "X" };
  player2 = { count: 0, symbol: "O"};

  x.textContent = "";
  o.textContent = "";
  count.textContent = `Счёт: ${player1.count} : ${player2.count}`;
  raund.textContent = `Раунд ${gameRaund}`;
  endOverlay.classList.remove("end-overlay-visible");

  openPopup();
}

const newRaund = () => {
  resetField();
  gameRaund++;
  move = 1;
  raund.textContent = `Раунд ${gameRaund}`;
  endOverlay.classList.remove("end-overlay-visible");
  
  if (gameRaund % 2 === 0) {
    player1.symbol = "O";
    player2.symbol = "X";
    x.textContent = `Крестики: ${player2.name}`;
    o.textContent = `Нолики: ${player1.name}`;
  } else {
    player1.symbol = "X";
    player2.symbol = "O";
    x.textContent = `Крестики: ${player1.name}`;
    o.textContent = `Нолики: ${player2.name}`;
  }
  
};

const endOfGame = (player) => {
  if (player === "draw") {
    winner.textContent = "Ничья";
    player1.count++;
    player2.count++;
  } else {
    const win = player1.symbol === player ? player1 : player2;
    win.count++;

    winner.textContent = `Победитель: ${win.name}`;
  }

  endOverlay.classList.add("end-overlay-visible");
  count.textContent = `Счёт: ${player1.count} : ${player2.count}`;
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
newRaundButton.addEventListener("click", newRaund);
newGameButton.addEventListener("click", newGame);
