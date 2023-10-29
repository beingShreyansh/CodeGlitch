var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeSchema = new Schema({
  fileName: String,
  code: String,
  language:String
  
});

// the schema is useles
const Code = mongoose.model('Code', codeSchema);

module.exports = { Code };
