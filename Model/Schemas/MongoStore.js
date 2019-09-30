const mongoose = require("../mongoose.js") 
const Schema = mongoose.Schema

const MongoStoreSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number}
  }
)

const MongoStore = mongoose.model('MongoStore', MongoStoreSchema, 'MongoStore') 

module.exports = MongoStore
