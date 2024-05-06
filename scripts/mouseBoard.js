import { state } from './init.js';

const board = document.querySelector('.board');
let isMouseChoose = false;

board.addEventListener('mousedown', (e) => {
  if (state.isMouseMode) {
    isMouseChoose = true;
    if (e.target.classList.contains('cell')) {
      e.target.classList.add('live');
      const [cell, x, y] = e.target.id.split('_');
      state.arrBoard[x][y] = 'live';
      state.isBoardFilled = true;
    }
  }
});

window.addEventListener('mouseup', (e) => {
  if (state.isMouseMode) {
    isMouseChoose = false;
  }
});

board.addEventListener('mousemove', (e) => {
  if (state.isMouseMode) {
    if (isMouseChoose && e.target.classList.contains('cell')) {
      e.target.classList.add('live');
      const [cell, x, y] = e.target.id.split('_');
      state.arrBoard[x][y] = 'live';
      state.isBoardFilled = true;
    }
  }
});
