const express = require('express');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');
const { Server } = require('socket.io');
const ACTIONS = require('../client/src/Actions');
const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
const userSocketMap = {};
function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      socket.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    socket.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

ExpressPeerServer(server, { path: '/' });

app.use(express.json());

app.post('/compile', (req, res) => {
  const { code, selectedLanguage } = req.body;
  console.log('langugae: ' + selectedLanguage);
  console.log('Code: ' + code);
  const fileName = 'Main';
  let command;
  switch (selectedLanguage) {
    case 'python':
      fs.writeFileSync('./Main.py', code);
      command = `python ${fileName}.py`;
      break;
    case 'c':
      fs.writeFileSync('./Main.c', code);
      command = `gcc ${fileName}.c & a.exe`;
      break;
    case 'cpp':
      fs.writeFileSync('./Main.cpp', code);
      command = `g++ ${fileName}.cpp & a.exe`;
      break;
    case 'java':
      fs.writeFileSync('./Main.java', code);
      command = `javac ${fileName}.java & java ${fileName}`;
      break;
    case 'js':
      fs.writeFileSync('./index.js', code);
      command = `node index`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid language' });
  }
  exec(command, (error, stdout, stderr) => {
    if (stderr) {
      res.status(200).json({ output: stderr });
    } else {
      res.status(200).json({ output: stdout });
    }
    console.log(stdout);
  });
  // deleteClass();
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`));
