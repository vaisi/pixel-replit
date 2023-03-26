import { log } from "./utilities.js";
// todo move to a common place
const CELL_DEFAULT_COLOR = "#191a1b";


const grid = document.getElementById("grid");
const output = document.getElementById("output");

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
    grid.appendChild(cell);
  }
}

const cells = document.querySelectorAll(".cell");

// Function to generate a random neon color
function randomNeonColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 100;
  const l = 50;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Create a color palette
const colorPalette = document.createElement('div');
colorPalette.className = 'color-palette';
let selectedColor;

// Generate a random neon color palette
for (let i = 0; i < 6; i++) {
  const color = randomNeonColor();
  if (i === 0) selectedColor = color;

  const colorElement = document.createElement('div');
  colorElement.className = 'color';
  colorElement.style.backgroundColor = color;
  colorPalette.appendChild(colorElement);

  // Add click event listener to select color
  colorElement.addEventListener('click', () => {
    const previousSelectedColor = document.querySelector('.selected-color');
    if (previousSelectedColor) {
      previousSelectedColor.classList.remove('selected-color');
    }

    colorElement.classList.add('selected-color');
    selectedColor = color;
  });
}

const colorPaletteContainer = document.querySelector('.color-palette-container');
colorPaletteContainer.appendChild(colorPalette);

const paintPixelBtn = document.getElementById('paint-pixel-btn');

// Add click event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const selectedCell = document.querySelector(".glow");
    if (selectedCell) {
      selectedCell.classList.remove("glow");
      selectedCell.style.border = ''; // Remove the glowing border from the previous selected cell
    }

    cell.classList.add("glow");
    cell.style.border = '2px solid #FFC107'; // Add a glowing border to the selected cell
    paintPixelBtn.disabled = false;
  });
});


let socketConnected = false;
const socket = io();

socket.on("connect", () => {
  socketConnected = true;
});

// Add click event listener to the "Paint pixel" button
paintPixelBtn.addEventListener("click", () => {
  const selectedCell = document.querySelector(".glow");
  if (selectedCell) {
    selectedCell.classList.remove("glow");
    selectedCell.style.backgroundColor = selectedColor;
    selectedCell.style.border = ''; // Remove the glowing border after painting the cell
    paintPixelBtn.disabled = true;

    const index = Array.from(cells).indexOf(selectedCell);
    if (socketConnected) {
      socket.emit("paint", { index, color: selectedColor });
    }
  }
});


socket.on("updateGridState", (serverGridState) => {
  log("Server updated the grid state");
  if (!serverGridState) {
    log("Invalid input: serverGridState");
  }

  updateGrid(serverGridState.cells);
  updatePaintedCellsCount(serverGridState.paintedCellsCounter);
});



function updateGrid(updatedCells) {
  if (!updatedCells) {
    log("Invalid input: cells array is missing");
    return;
  }

  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < updatedCells.length; i++) {
    if (updatedCells[i]) {
      cells[i].style.backgroundColor = updatedCells[i];
    }
  }
};

function updatePaintedCellsCount(counter) {
  document.getElementById('painted-cells-count').innerText = `Painted cells: ${counter}`;
};

socket.on("paint", (data) => {
  log("A user painted a pixel: " + socket.id + " " + data.index + " " + data.color);
  cells[data.index].style.backgroundColor = data.color;
  updatePaintedCellsCount(data.paintedCellsCounter);
});
