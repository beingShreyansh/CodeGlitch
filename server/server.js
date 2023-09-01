const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const deleteClass = require('./deleteClass');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Routes
app.use(express.json()); // Automatically parses JSON in the request body
app.post('/compile', (req, res) => {
  const { code, selectedLanguage } = req.body;
  console.log('langugae: ' + selectedLanguage);

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
  });
  deleteClass();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: localhost:${PORT}`);
});
