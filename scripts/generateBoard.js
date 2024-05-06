import { state } from './init.js';
import { updateBoard } from './updateBoard.js';

export function generateBoard() {
  const field = document.querySelector('.app__field');
  const board = document.querySelector('.board');
  const boardRows = document.querySelector('#board_rows');
  let boardRowsValue = +boardRows.value;
  const boardColumns = document.querySelector('#board_columns');
  let boardColumnsValue = +boardColumns.value;

  if (!field || !board || !boardColumnsValue || !boardRowsValue) {
    return;
  }

  if (boardColumnsValue < 3) {
    boardColumnsValue = 3;
    boardColumns.value = 3;
  }

  if (boardRowsValue < 3) {
    boardRowsValue = 3;
    boardRows.value = 3;
  }

  let cellWidth = (field.offsetWidth - boardColumnsValue) / boardColumnsValue;
  let cellHeight = field.offsetHeight / boardRowsValue;
  let cellSize = cellHeight > cellWidth ? cellWidth : cellHeight;
  let cellCSize = boardColumnsValue > boardRowsValue ? cellHeight : '1fr';

  state.arrBoard = new Array(boardRowsValue)
    .fill('')
    .map(() => new Array(boardColumnsValue).fill('').map(() => ''));
  updateBoard();
  state.isBoardCteated = true;
  state.isBoardFilled = false;
  // const gridTemplateRows = `repeat(${board_rows}, ${cellSize}px)`;
  // const gridTemplateColumns = `repeat(${board_columns}, ${cellSize}px)`;

  const gridTemplateRows = `repeat(${boardRowsValue}, 1fr`;
  const gridTemplateColumns = `repeat(${boardColumnsValue}, 1fr`;

  board.style.setProperty('grid-template-rows', gridTemplateRows);
  board.style.setProperty('grid-template-columns', gridTemplateColumns);

  if (boardColumnsValue > 300) {
    board.style.setProperty('max-width', 'none');
    board.style.setProperty('gap', '0px');
  } else if (boardColumnsValue <= 50) {
    board.style.setProperty('max-width', '500px');
    board.style.setProperty('gap', '1px');
  } else {
    board.style.setProperty('gap', '1px');
  }
}
