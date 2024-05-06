import { state } from './init.js';

export function updateBoard() {
  const field = document.querySelector('.app__field');
  const board = document.querySelector('.board');

  if (!field || !board) {
    return;
  }

  const arrToHTML = state.arrBoard.reduce(
    (accOut, arrIn, iOut) =>
      accOut +
      arrIn.reduce(
        (accIn, value, iIn) =>
          accIn + `<div class="cell ${value}" id="cell_${iOut}_${iIn}"></div>`,
        ''
      ),
    ''
  );

  board.innerHTML = '';
  board.insertAdjacentHTML('beforeend', arrToHTML);
}

// export function slowFastUpdateBoard(list) {
//   const field = document.querySelector('.app__field');
//   const board = document.querySelector('.board');

//   if (!field || !board) {
//     return;
//   }

//   list.forEach((value) => {
//     const [iRow, iCol] = value.split('_');
//     const elem = board.querySelector(`#cell_${iRow}_${iCol}`);
//     console.log('elem.classList', elem.classList, iRow, iCol);

//     elem.className = `cell ${state.arrBoard[iRow][iCol]}`;
//   });
// }
