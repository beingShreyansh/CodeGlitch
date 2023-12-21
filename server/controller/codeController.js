const { Code } = require('../config/model');

const { c, cpp, node, python, java } = require('compile-run');

const saveCode = async (req, res) => {
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
};

const compileCode = async (req, res) => {
  const { code, selectedLanguage, inputValue } = req.body;
  let output = '';
  console.log(code, selectedLanguage);

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
};

module.exports = { saveCode, compileCode };
