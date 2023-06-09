import { log, CELL_DEFAULT_COLOR } from "./utilities.js";
import { socket, socketConnected } from "./gridHandleServerEvents.js";
import { selectedColor } from "./colorPalette.js";

const cells = document.querySelectorAll(".cell");
const paintPixelBtn = document.getElementById('paint-pixel-btn');


function handlePaintPixelClick() {
  const selectedCell = document.querySelector(".glow");
  if (selectedCell) {
    selectedCell.style.backgroundColor = selectedColor;
    paintPixelBtn.disabled = true;

    const index = Array.from(cells).indexOf(selectedCell);
    if (socketConnected) {
      socket.emit("paint", { index, color: selectedColor });
    }
  }
}

// Add click event listener to the "Paint pixel" button
paintPixelBtn.addEventListener("click", handlePaintPixelClick);


function removeSelectionView(cell) {
  if (cell) {
    cell.classList.remove("glow");
    cell.style.border = '';
  }
}

function addSelectionView(cell) {
  if (cell) {
    cell.classList.add("glow");
    cell.style.border = '2px solid #FFC107';
    // if already painted, disable painting
    if (cell.style.backgroundColor === CELL_DEFAULT_COLOR) {
      paintPixelBtn.disabled = false;
    }
    else {
      paintPixelBtn.disabled = true;
    }
  }
}

// Add click event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const previousCell = document.querySelector(".glow");
    removeSelectionView(previousCell);
    addSelectionView(cell);
  });
});

// event listener that sends request to server to reset board
const resetBoardBtn = document.getElementById("reset-board-btn");
resetBoardBtn.addEventListener("click", () => {
  socket.emit("resetBoard");
});
