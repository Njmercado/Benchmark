const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MySqlMultiLoadSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number},
    nRegistrosDescargados: {type: Number}
  }
)

const MySqlMultiLoad = mongoose.model('MySqlMultiLoad', MySqlMultiLoadSchema, 'MySqlMultiLoad') 

module.exports = MySqlMultiLoad
