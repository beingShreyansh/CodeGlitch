const express = require('express');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');
const { Server } = require('socket.io');
const ACTIONS = require('../client/src/Actions');
const http = require('http');

const dbConnection = require('./config/config');
const { Code } = require('./config/model');

dbConnection();

const compileRun = require('compile-run');
const { c, cpp, node, python, java } = require('compile-run');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.post('/save', async (req, res) => {
  const { fileName, code, selectedLanguage } = req.body;

  if (!fileName || !code || fileName.trim() === '' || code.trim === '') {
    res.status(400).json({ error: 'Invalid filename' });
    return;
  }

  const newCode = new Code({
    fileName,
    code,
    language: selectedLanguage,
  });

  await newCode.save();
  res.json({ success: true });
});

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

app.post('/compile', async (req, res) => {
  const { code, selectedLanguage, inputValue } = req.body;
  let output = '';

  try {
    if (selectedLanguage === 'python') {
      output = await python.runSource(code, inputValue);
    } else if (selectedLanguage === 'java') {
      output = await java.runSource(code, inputValue);
    } else if (selectedLanguage === 'c') {
      output = await c.runSource(code, inputValue);
    } else if (selectedLanguage === 'cpp') {
      output = await cpp.runSource(code, inputValue);
    } else if (selectedLanguage === 'js') {
      output = await node.runSource(code, inputValue);
    }

    if (output.stderr) {
      res.status(200).json({ output: output.stderr });
    } else {
      res.status(200).json({ output: output.stdout });
    }
  } catch (error) {
    output = error.message;
  }
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`));
