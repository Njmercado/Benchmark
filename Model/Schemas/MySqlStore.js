const mongoose = require("../Connections/mongooseCityStatus.js") 
const Schema = mongoose.Schema

const MySqlStoreSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number}
  }
)

const MySqlStore = mongoose.model('MySqlStore', MySqlStoreSchema, 'MySqlStore') 

module.exports = MySqlStore
