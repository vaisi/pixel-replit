import { log, CELL_DEFAULT_COLOR } from "./utilities.js";
import { socket, socketConnected } from "./gridHandleServerEvents.js";
import { selectedColor } from "./grid_client.js";

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

// Add click event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const selectedCell = document.querySelector(".glow");
    if (selectedCell) {
      selectedCell.classList.remove("glow");
      selectedCell.style.border = '';
    }

    // Add a glowing border to the selected cell
    cell.classList.add("glow");
    cell.style.border = '2px solid #FFC107';
    // if already painted, disable painting
    if (cell.style.backgroundColor === CELL_DEFAULT_COLOR) {
      paintPixelBtn.disabled = false;
    }
    else {
      paintPixelBtn.disabled = true;
    }
  });
});
