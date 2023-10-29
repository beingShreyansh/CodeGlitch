const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose.connect(
    'mongodb+srv://beingShreyansh:Shreyansh6881@compilerrr.8igkb8t.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => console.log('Connected to MongoDB database'));
};

module.exports = dbConnection;
