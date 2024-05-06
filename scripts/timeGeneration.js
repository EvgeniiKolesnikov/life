export const setTimeGeneration = (startTime, endTime) => {
  const timePlace = document.querySelector('#timePlace');
  timePlace.value = (endTime - startTime).toFixed(2);
};
