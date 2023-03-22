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
      const prevColor = selectedCell.getAttribute('data-prev-color') || '#191a1b';
      selectedCell.style.backgroundColor = prevColor;
    }

    cell.classList.add("glow");
    cell.setAttribute('data-prev-color', cell.style.backgroundColor);
    cell.style.backgroundColor = selectedColor;
    paintPixelBtn.disabled = false;
    //updatePaintedCellsCount(); // Add this line to update the count
  });
});

// Add click event listener to the "Paint pixel" button
paintPixelBtn.addEventListener("click", () => {
  paintPixelBtn.disabled = true;
  const selectedCell = document.querySelector(".glow");
  if (selectedCell) {
    selectedCell.classList.remove("glow");
    selectedCell.setAttribute('data-prev-color', selectedColor);
  }
  updatePaintedCellsCount();
});

let paintedCells = 0;

function updatePaintedCellsCount() {
  paintedCells++;
  document.getElementById('painted-cells-count').innerText = `Painted cells: ${paintedCells}`;
}