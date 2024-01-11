const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Autoriser toutes les origines
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 8083;

// Gestion des connexions Socket.IO
// Gestion des connexions Socket.IO
io.on('connection', socket => {
  console.log('User connected');

  // Gestion de l'événement 'playSound'
  socket.on('playSound', data => {
    console.log('playSound', data);
    io.emit('playSound', data);
  });

  // Gestion de l'événement 'pauseSound'
  socket.on('pauseSound', () => {
    console.log('pauseSound');
    io.emit('pauseSound');
  });

  // Gestion de l'événement 'resumeSound'
  socket.on('resumeSound', () => {
    console.log('resumeSound');
    io.emit('resumeSound');
  });

  // Gestion de l'événement 'stopSound'
  socket.on('stopSound', () => {
    console.log('stopSound');
    io.emit('stopSound');
  });
});
// Démarrage du serveur
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
