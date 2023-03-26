let gridState = {
  rows: 8,
  columns: 8,
  cells: Array(8 * 8).fill("#191a1b"),
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

module.exports = {
  gridState,
  updateGridState
};
