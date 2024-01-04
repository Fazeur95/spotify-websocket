// Importation des modules nécessaires
// Importation des modules nécessaires
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');

// Le reste de votre code reste le même

// Création de l'application Express
const app = express();
app.use(cors());

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
  socket.on('playSound', track => {
    const trackId = uuidv4(); // Générer un ID unique pour le morceau
    console.log(
      `Received playSound event with track ${JSON.stringify(track, null, 2)}`,
    );
    socket.broadcast.emit('playSound', {...track, id: trackId}); // Inclure l'ID dans l'objet track
  });

  // Gestion des événements 'pauseSound' et 'resumeSound'
  ['pauseSound', 'resumeSound'].forEach(event => {
    socket.on(event, () => {
      console.log(`Received ${event} event`);
      socket.broadcast.emit(event);
    });
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
