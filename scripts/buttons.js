import { generateBoard } from './generateBoard.js';
import { generateRandomBoard } from './randomBoard.js';
import { state } from './init.js';
import { startGame } from './game.js';

const generateBoardBtn = document.querySelector('#generateBoardBtn');
const randomBoardBtn = document.querySelector('#randomBoardBtn');
const mouseBoardBtn = document.querySelector('#mouseBoardBtn');
const startGameBtn = document.querySelector('#startGameBtn');

generateBoardBtn.addEventListener('click', () => {
  state.isGame = false;
  generateBoard();
});

randomBoardBtn.addEventListener('click', () => {
  state.isGame = false;
  generateRandomBoard();
});

mouseBoardBtn.addEventListener('click', () => {
  state.isGame = false;
  state.isMouseMode = true;
});

startGameBtn.addEventListener('click', () => {
  state.isMouseMode = false;
  startGame();
});
