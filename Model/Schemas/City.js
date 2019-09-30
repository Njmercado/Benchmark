const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema

const CitySchema = new Schema(
  {
    id: {type: String},
    certificate_number: {type: String},
    bussiness_name: {type: String},
    date: {type: String},
    result: {type: String},
    sector: {type: String},
    address: {
      city: {type: String},
      zip: {type: String},
      street: {type: String},
      number: {type: String}
    }
  }
)

const City = mongoose.model('City', CitySchema, 'City')

module.exports = City
