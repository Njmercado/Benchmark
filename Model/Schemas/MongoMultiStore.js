const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MongoMultiStoreSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number},
    nRegistrosCargados: {type: Number}
  }
)

const MongoMultiStore = mongoose.model('MongoMultiStore', MongoMultiStoreSchema, 'MongoMultiStore') 

module.exports = MongoMultiStore
