require('dotenv');
const mongoose = require('mongoose');
const URI =
  'mongodb+srv://beingShreyansh:Shreyansh6881@compilerrr.8igkb8t.mongodb.net/codeGlitch?retryWrites=true&w=majority';
// console.log(URI);
const dbConnection = () => {
  mongoose.connect(URI, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => console.log('Connected to MongoDB database'));
};

module.exports = dbConnection;
