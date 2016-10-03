document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: [
  //  {row: 0, col: 0, isMine: false, hidden: true},//
  //  {row: 0, col: 1, isMine: true, hidden: true},//
  //  {row: 0, col: 2, isMine: true, hidden: true},//
  //  {row: 1, col: 0, isMine: false, hidden: true},//
  //  {row: 1, col: 1, isMine: false, hidden: true},//
  //  {row: 1, col: 2, isMine: false, hidden: true},//
  //  {row: 2, col: 0, isMine: false, hidden: true},//
  //  {row: 2, col: 1, isMine: false, hidden: true},//
  //  {row: 2, col: 2, isMine: true, hidden: true}//
  ]
}



function startGame () {

  var boardWidth = prompt("Set your board size! Enter a number between 3 and 6");

  while (boardWidth < 3 || boardWidth > 6 || boardWidth === null || boardWidth === NaN) {
    boardWidth = prompt("No, a number between 3 and 6!");
  };
  createboard(boardWidth, boardWidth);

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  document.addEventListener("click", checkForBomb)
}

function MineSq(row, col, isMine, isMarked, hidden) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.isMarked = isMarked;
  this.hidden = hidden;
}


function createboard(width, height) {
  var row = 0;
  for (var i = 0; i < height; i++) {
    var col = 0;
    for (var j = 0; j < width; j++) {
      newSq = new MineSq(row, col, randomizeMines(), false, true);
      console.log(newSq);
      board.cells.push(newSq);
      col++;
    }
    row++;
  }
}

function randomizeMines() {
  var randomNo = Math.floor((Math.random() * 100) + 1);
  if (randomNo < 80) {
    return false;
  }
  else {
    return true;
  }
}

function checkForWin () {

  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].isMarked !== true) {
      return;
    }
    if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return;
    }
  }

  lib.displayMessage('You win!');
}

function countSurroundingMines (cell) {
  count = 0;
  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true ) {
      count++;
    }
  }
  return count;
}
