import { state } from './init.js';
import { setTimeGeneration } from './timeGeneration.js';
import { updateBoard } from './updateBoard.js';

const getIndex = (arrLength, i) => {
  if (i >= arrLength) {
    return 0;
  } else if (i < 0) {
    return arrLength - 1;
  } else {
    return i;
  }
};

const updateCheckList = (list, rLength, cLength, iRow, iCol) => {
  list.add(`${getIndex(rLength, iRow - 1)}_${getIndex(cLength, iCol - 1)}`);
  list.add(`${getIndex(rLength, iRow - 1)}_${getIndex(cLength, iCol)}`);
  list.add(`${getIndex(rLength, iRow - 1)}_${getIndex(cLength, iCol + 1)}`);
  list.add(`${getIndex(rLength, iRow)}_${getIndex(cLength, iCol - 1)}`);
  list.add(`${getIndex(rLength, iRow)}_${getIndex(cLength, iCol)}`);
  list.add(`${getIndex(rLength, iRow)}_${getIndex(cLength, iCol + 1)}`);
  list.add(`${getIndex(rLength, iRow + 1)}_${getIndex(cLength, iCol - 1)}`);
  list.add(`${getIndex(rLength, iRow + 1)}_${getIndex(cLength, iCol)}`);
  list.add(`${getIndex(rLength, iRow + 1)}_${getIndex(cLength, iCol + 1)}`);
};

const getLiveNeighbors = (arr, rLength, cLength, iRow, iCol) => {
  let liveNeighbors = 0;

  if (arr[getIndex(rLength, iRow - 1)][getIndex(cLength, iCol - 1)] === 'live')
    liveNeighbors += 1;
  if (arr[getIndex(rLength, iRow - 1)][getIndex(cLength, iCol)] === 'live')
    liveNeighbors += 1;
  if (arr[getIndex(rLength, iRow - 1)][getIndex(cLength, iCol + 1)] === 'live')
    liveNeighbors += 1;

  if (arr[getIndex(rLength, iRow)][getIndex(cLength, iCol - 1)] === 'live')
    liveNeighbors += 1;
  if (arr[getIndex(rLength, iRow)][getIndex(cLength, iCol + 1)] === 'live')
    liveNeighbors += 1;

  if (arr[getIndex(rLength, iRow + 1)][getIndex(cLength, iCol - 1)] === 'live')
    liveNeighbors += 1;
  if (arr[getIndex(rLength, iRow + 1)][getIndex(cLength, iCol)] === 'live')
    liveNeighbors += 1;
  if (arr[getIndex(rLength, iRow + 1)][getIndex(cLength, iCol + 1)] === 'live')
    liveNeighbors += 1;
  return liveNeighbors;
};

const checkNextState = (arr, rLength, cLength, iRow, iCol, cellState) => {
  let liveNeighbors = getLiveNeighbors(arr, rLength, cLength, iRow, iCol);
  if (cellState === '' && liveNeighbors === 3) {
    updateCheckList(state.nextList, rLength, cLength, iRow, iCol);
    return 'live';
  } else if (cellState === 'live' && (liveNeighbors < 2 || liveNeighbors > 3)) {
    updateCheckList(state.nextList, rLength, cLength, iRow, iCol);
    return '';
  } else {
    return cellState;
  }
};

export const startGame = () => {
  const timeDelay = document.querySelector('#timeDelay');
  if (!state.isBoardFilled || !timeDelay) {
    return;
  }
  state.isGame = true;
  state.isMouseMode = false;

  const rlength = state.arrBoard.length;
  const cLength = state.arrBoard[0].length;

  state.prevPrevList = new Set();
  state.prevList = new Set();
  state.nextList = new Set();

  state.arrBoard.map((arrCols, iRow) =>
    arrCols.map((cellState, iCol) =>
      checkNextState(state.arrBoard, rlength, cLength, iRow, iCol, cellState)
    )
  );

  const timer = setInterval(() => {
    if (!state.isGame) {
      clearInterval(timer);
    }
    const prevPrevJSON = JSON.stringify(Array.from(state.prevPrevList));
    const prevJSON = JSON.stringify(Array.from(state.prevList));
    const nextJSON = JSON.stringify(Array.from(state.nextList));
    // console.log('prevJSON', prevJSON, state.prevList);
    // console.log('nextJSON', nextJSON, state.nextList);
    if (prevJSON === nextJSON && prevPrevJSON === nextJSON) {
      console.log('========= GAME OVER =========');
      clearInterval(timer);
    }
    const startTime = performance.now();
    state.prevPrevList.clear();
    state.prevPrevList = new Set(state.prevList);
    state.prevList.clear();
    state.prevList = new Set(state.nextList);
    state.nextList.clear();

    const addedArr = [];

    state.prevList.forEach((value) => {
      const [iRow, iCol] = value.split('_');
      const cellState = state.arrBoard[iRow][iCol];
      addedArr.push(
        checkNextState(
          state.arrBoard,
          rlength,
          cLength,
          +iRow,
          +iCol,
          cellState
        )
      );
    });

    let index = 0;

    state.prevList.forEach((value) => {
      const [iRow, iCol] = value.split('_');
      const cellState = state.arrBoard[iRow][iCol];
      state.arrBoard[iRow][iCol] = addedArr[index];
      index++;
    });

    updateBoard();
    const endTime = performance.now();
    setTimeGeneration(startTime, endTime);
  }, timeDelay.value);
};
