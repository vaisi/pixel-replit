import { CELL_DEFAULT_COLOR } from "./utilities.js";

const grid = document.getElementById("grid");

const ROWS = 8;
const COLS = 8;
const CELL_SIZE = 50;
const CELL_GAP = 1;

// Generate the grid
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${CELL_SIZE}px`;
    cell.style.height = `${CELL_SIZE}px`;
    cell.style.margin = `${CELL_GAP}px`;
    cell.style.backgroundColor = CELL_DEFAULT_COLOR;
    grid.appendChild(cell);
  }
}
