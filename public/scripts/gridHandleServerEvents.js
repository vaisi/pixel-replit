import { log } from "./utilities.js";

const cells = document.querySelectorAll(".cell");

export const socket = io();
export let socketConnected = false;

socket.on("connect", () => {
  socketConnected = true;
});

socket.on("updateGridState", (serverGridState) => {
  log("Server updated the grid state");
  if (!serverGridState) {
    log("Invalid input: serverGridState");
  }

  updateGrid(serverGridState.cells);
  updatePaintedCellsCount(serverGridState.paintedCellsCounter);
});

socket.on("updatePixel", (data) => {
  log("A user painted pixel: " + data.index);
  cells[data.index].style.backgroundColor = data.color;
  updatePaintedCellsCount(data.paintedCellsCounter);
});


function updateGrid(updatedCells) {
  if (!updatedCells) {
    log("Invalid input: cells array is missing");
    return;
  }
  if (!cells) {
    log("Invalid state: client grid cells not initialized");
  }

  for (let i = 0; i < updatedCells.length; i++) {
    if (updatedCells[i]) {
      cells[i].style.backgroundColor = updatedCells[i];
    }
  }
};

function updatePaintedCellsCount(counter) {
  document.getElementById('painted-cells-count').innerText = `Painted cells: ${counter}`;
};