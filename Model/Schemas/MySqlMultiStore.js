const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MySqlMultiStoreSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number},
    nRegistrosCargados: {type: Number}
  }
)

const MySqlMultiStore = mongoose.model('MySqlMultiStore', MySqlMultiStoreSchema, 'MySqlMultiStore') 

module.exports = MySqlMultiStore
