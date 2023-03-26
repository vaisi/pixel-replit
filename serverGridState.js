// todo move to a common place
const CELL_DEFAULT_COLOR = 'rgb(25, 26, 27)';

let gridState = {
  rows: 8,
  columns: 8,
  cells: Array(8 * 8).fill(CELL_DEFAULT_COLOR),
  paintedCellsCounter: 0
};

const updateGridState = (gridState, index, color) => {
  if (!gridState || !gridState.cells) {
    console.error("Invalid input: gridState or cells array is missing");
    return gridState;
  }
  gridState.cells[index] = color;
  gridState.paintedCellsCounter++;
  console.log("Updated grid state for pixel at index " + index);

  return gridState;
};

const resetGridState = () => {
  gridState.cells = Array(8 * 8).fill(CELL_DEFAULT_COLOR);
  gridState.paintedCellsCounter = 0;
  return gridState;
}

module.exports = {
  gridState,
  updateGridState,
  resetGridState
};
