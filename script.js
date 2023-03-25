"use strict";

const cells = document.querySelectorAll(".cell");
const winner = document.querySelector(".winner");
const btnClear = document.querySelector(".btn");
const box = document.querySelector(".box");
const next = document.querySelector(".next");
const goToStart = document.querySelector(".goToStart");
let board = new Array(9).fill(NaN);
let currentPlayer = "X";
let winnerExists = false;
let num = 1;
let mainArray = [];
const positions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function checkWinner(board) {
  for (let [x, y, z] of positions) {
    if (board[x] === board[y] && board[y] === board[z]) return true;
  }
}

function handleCellClick(cell, idx) {
  const value = cell.innerText;
  if (!value && !winnerExists) {
    board[idx] = currentPlayer;
    mainArray.push(board);
    console.log(mainArray);
    cell.innerText = currentPlayer;
    cell.style.pointerEvents = "none";
    winnerExists = checkWinner(board);
    if (winnerExists) winner.innerText = `Winner -- ${currentPlayer}`;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    next.innerText = `Next player: ${currentPlayer}`;
  }
}

function init() {
  cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => {
      handleCellClick(cell, idx);
      num++;
      if (!winnerExists) {
        box.innerHTML += `<p>${num}. <button class="clickBtn">Go to game #${num}</button></p>`;
      }
      let clickBtn = document.querySelectorAll(".clickBtn");
      console.log(clickBtn);

      clickBtn.forEach((item, idx) => {
        item.addEventListener("click", () => {
          console.log(mainArray[idx]);
        });
      });
    });
  });
}

btnClear.addEventListener("click", () => {
  cells.forEach((item) => {
    num = 1;
    item.textContent = "";
    board = new Array(9).fill(NaN);
    currentPlayer = "X";
    winnerExists = false;
    item.style.pointerEvents = "all";
    winner.innerText = "Winner --";
    box.innerHTML = `<p>1. <button>Go to game start</button></p>`;
    mainArray = [];
  });
});

goToStart.addEventListener("click", () => {
  // shu erda cell larga qiymat kiritgandan kiyini shlamadi
  cells.forEach((item, idx) => {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
    console.log(board[idx]);
    item.textContent = board[idx];
  });
});

init();
