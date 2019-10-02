const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MongoMultiLoadSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number},
    nRegistrosDescargados: {type: Number}
  }
)

const MongoMultiLoad = mongoose.model('MongoMultiLoad', MongoMultiLoadSchema, 'MongoMultiLoad') 

module.exports = MongoMultiLoad
