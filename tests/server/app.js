console.log("Starting server...");


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const io = new Server(server, {
  cors: {
      origin: "http://127.0.0.1:8080",  // Explicitly allow this origin for client
      methods: ["GET", "POST"]
  }
});

app.use(express.static("src/client"));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
