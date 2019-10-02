const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MySqlLoadSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number}
  }
)

const MySqlLoad = mongoose.model('MySqlLoad', MySqlLoadSchema, 'MySqlLoad') 

module.exports = MySqlLoad
