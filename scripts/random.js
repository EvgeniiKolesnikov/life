export const randomCellLive = (percentLiveCells) => {
  const value = Math.round(Math.random() * 100);
  return value < percentLiveCells;
};
