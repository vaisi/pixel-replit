const socket = io();

const cells = document.querySelectorAll(".cell");


socket.on("paint", ({ index, color }) => {
  if (index < cells.length) {
    cells[index].style.backgroundColor = color;
  }
});