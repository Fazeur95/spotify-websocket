// Importation des modules nécessaires
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

// Création de l'application Express
const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Création du serveur HTTP
const server = http.createServer(app);

// Configuration de Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Autoriser toutes les origines
    methods: ['GET', 'POST'],
  },
});

const port = 8083;

// Gestion des connexions Socket.IO
io.on('connection', socket => {
  console.log('User connected');

  // Gestion de l'événement 'playSound'
  socket.on('playSound', ({trackId, currentTime}) => {
    console.log(
      `Received playSound event with trackId ${trackId} and currentTime ${currentTime}`,
    );
    socket.broadcast.emit('playSound', {trackId, currentTime});
  });

  // Gestion de l'événement 'pauseSound'
  socket.on('pauseSound', () => {
    console.log('Received pauseSound event');
    socket.broadcast.emit('pauseSound');
  });

  // Gestion de l'événement 'resumeSound'
  socket.on('resumeSound', ({currentTime}) => {
    console.log(`Received resumeSound event with currentTime ${currentTime}`);
    socket.broadcast.emit('resumeSound', {currentTime});
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Démarrage du serveur
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
