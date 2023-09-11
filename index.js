const game = document.querySelector(".game");
const cells = document.querySelectorAll(".cell");
const winner = document.querySelector(".winner");
const raund = document.querySelector(".raund");
const newGameButton = document.querySelector(".new-game");

let gameRaund = 1;
let move = 1;
const lastAvailableMove = 9;

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const resetField = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    if (cell.classList.contains("cell-winner")) {
      cell.classList.remove("cell-winner");
    }
  })
}

const newGame = () => {
  resetField();
  gameRaund++;
  move = 1;
  raund.textContent = `Раунд ${gameRaund}`;
  winner.textContent = `Победитель:`;
}

const endOfGame = (player) => {
  if (player === "draw") {
    winner.textContent = "Ничья";
    return;
  }
  const win = player === "X" ? "крестики" : "нолики";
  winner.textContent = `Победитель: ${win}`;
}

const checkWinner = (player) => {
  let winnerCombination, gameCombination;
  for (let i = 0; i < winnerCombinations.length; i++) {
    winnerCombination = winnerCombinations[i];
    gameCombination = [ cells[winnerCombination[0]],  cells[winnerCombination[1]], cells[winnerCombination[2]]];
    if (gameCombination.every((cell) => cell.textContent === player)) {
      gameCombination.forEach((cell) => {
        cell.classList.add("cell-winner");
      })
      return true;
    }
  }
  return false;
}

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
}

game.addEventListener("click", handleGameClick);
newGameButton.addEventListener("click", newGame);