const fs = require('fs');
const path = require('path');
const directoryPath = __dirname; // Replace with the actual directory path

const deleteClass = () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      if (
        path.extname(file) === '.class' ||
        path.extname(file) == '.java' ||
        path.extname(file) == '.py' ||
        path.extname(file) == '.c' ||
        path.extname(file) == '.cpp'
      ) {
        const filePath = path.join(directoryPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('Deleted:', filePath);
          }
        });
      }
    });
  });
};
module.exports = deleteClass;
