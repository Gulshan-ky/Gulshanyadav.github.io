const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files (HTML, CSS, JavaScript)
app.use(express.static(__dirname));

// Handle connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast incoming message to all users
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to all users
    });

    // Broadcast typing event
    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name); // Show typing indicator for other users
    });

    // Handle disconnection event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});