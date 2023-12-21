const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  fileName: String,
  code: String,
  language: String,
});



const Code = mongoose.model('Code', codeSchema);

module.exports = { Code };
