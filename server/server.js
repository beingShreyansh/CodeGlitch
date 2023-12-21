const express = require('express');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');
const { Server } = require('socket.io');
const ACTIONS = require('../client/src/Actions');
const http = require('http');

const dbConnection = require('./config/config');
const { Code } = require('./config/model.js');

dbConnection();

const { registerUser, loginUser } = require('./controller/userController');
const { saveCode, compileCode } = require('./controller/codeController');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);

app.post('/save', saveCode);

app.get('/files', async (req, res) => {
  const files = await Code.find({}, { fileName: 1 }).select('fileName');
  const fileNames = files.map((file) => file.fileName);
  res.json(fileNames);
});

app.get('/code/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const code = await Code.findOne({ fileName });
  res.json(code);
});

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

app.post('/compile', compileCode);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`));
