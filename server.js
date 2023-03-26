const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const PORT = process.env.PORT || 5000;



let { gridState, updateGridState } = require("./serverGridState");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.emit("updateGridState", { cells: gridState.cells, paintedCellsCounter: gridState.paintedCellsCounter });

  socket.on("paint", (data) => {
    // socket.broadcast.emit("paint", data);
    console.log("A user painted a pixel: " + socket.id + " " + data.index + " " + data.color);

    gridState = updateGridState(gridState, data.index, data.color);
    console.log("Broadcasting the paint event");
    io.emit("updatePixel", { index: data.index, color: data.color, paintedCellsCounter: gridState.paintedCellsCounter });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
