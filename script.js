// Game constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Game variables
let xTurn = true;
let gameover = false;

// HTML elements
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
const cellElements = document.querySelectorAll('[id^="cell-"]');

// Event listeners
resetBtn.addEventListener('click', startGame);
cellElements.forEach(cell => cell.addEventListener('click', handleClick));

// Game functions
function startGame() {
  xTurn = true;
  gameover = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    cell.innerHTML = null; // remove any symbol from previous game
  });
  setMessage("");
  resetBtn.style.display = "none"; // hide reset button until the game is over
}


function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setMessage(`${xTurn ? "X's" : "O's"} turn`);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  if (currentClass === X_CLASS) {
    cell.innerHTML = "X";
  } else {
    cell.innerHTML = "O";
  }
}


function swapTurns() {
  xTurn = !xTurn;
}

function setMessage(msg) {
  message.innerText = msg;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  gameover = true;
  setMessage(draw ? "It's a draw!" : `${xTurn ? "X" : "O"} has won!`);
  cellElements.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
  resetBtn.style.display = "block";
}

