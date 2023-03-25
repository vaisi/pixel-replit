const cells = document.querySelectorAll(".cell");

const socket = io();

socket.on("connection", () => {
  log("Connected to the server");

  socket.on("paint", (data) => {
    log("A user painted a pixel: " + socket.id + " " + data.index + " " + data.color);
    cells[data.index].style.backgroundColor = data.color;
  });
});
