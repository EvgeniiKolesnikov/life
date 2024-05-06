import { state } from './init.js';
import { randomCellLive } from './random.js';
import { setTimeGeneration } from './timeGeneration.js';
import { updateBoard } from './updateBoard.js';

export function generateRandomBoard() {
  const board = document.querySelector('.board') || null;
  const percentLiveCells = document.querySelector('#live_cells');

  if (!board || !percentLiveCells || !state.isBoardCteated) {
    return;
  }

  const startTime = performance.now();
  state.arrBoard = state.arrBoard.map((arrIn) =>
    arrIn.map((i) => (randomCellLive(+percentLiveCells.value) ? 'live' : ''))
  );
  updateBoard();
  const endTime = performance.now();
  setTimeGeneration(startTime, endTime);
  state.isBoardFilled = true;
}
