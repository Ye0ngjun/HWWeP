const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("search:room", (roomName, callback) => {
    console.log(`Searching for room: ${roomName}`);
    callback({ exists: !!rooms[roomName] });
  });

  socket.on("create:room", (roomName, callback) => {
    console.log(`Creating room: ${roomName}`);
    if (!rooms[roomName]) {
      rooms[roomName] = [];
      callback({ success: true });
    } else {
      callback({ success: false });
    }
  });

  socket.on("join:room", (roomName) => {
    console.log(`Joining room: ${roomName}`);
    socket.join(roomName);
    const name = `안녕 ${rooms[roomName].length + 1}`;
    rooms[roomName].push(name);

    socket.emit("init", {
      name: name,
      users: rooms[roomName],
    });

    socket.broadcast.to(roomName).emit("user:join", { name: name });

    socket.on("send:message", (data) => {
      socket.broadcast.to(roomName).emit("send:message", {
        user: name,
        text: data.text,
      });
    });
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
