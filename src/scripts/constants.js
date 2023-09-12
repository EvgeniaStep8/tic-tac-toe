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

export { game, cells, endOverlay, winner, raund, players, newRaundButton, newGameButton, popup, form, x, o, count, winnerCombinations };