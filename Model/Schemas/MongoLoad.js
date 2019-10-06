const mongoose = require('../Connections/mongooseCityStatus.js')
const Schema = mongoose.Schema

const MongoLoadSchema = new Schema(
  {
    time: {type: Number},
    memory: {type: Number}
  }
)

const MongoLoad = mongoose.model('MongoLoad', MongoLoadSchema, 'MongoLoad') 

module.exports = MongoLoad
