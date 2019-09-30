const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MongoLoadSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number},
    nRegistrosDescargados: {type: Number}
  }
)

const MongoLoad = mongoose.model('MongoLoad', MongoLoadSchema, 'MongoLoad') 

module.exports = MongoLoad
