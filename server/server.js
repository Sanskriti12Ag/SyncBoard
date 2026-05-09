const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("draw", (data) => {
    socket.to(data.roomId).emit("draw", data);
  });

  socket.on("clear-canvas", (roomId) => {
    socket.to(roomId).emit("clear-canvas");
  });

  // Chat event
  socket.on("send-message", (data) => {
    socket.to(data.roomId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});