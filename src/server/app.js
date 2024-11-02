// src/server/app.js
const express = require('express');
const http = require('http');       // Import the http module
const { Server } = require('socket.io');

const app = express();
const PORT = 3001;

// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

console.log("Starting server...");

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle incoming messages
    socket.on('message', (data) => {
        console.log('Server received message:', data);
        io.emit('message', data);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
