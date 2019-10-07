const mongoose = require('../Connections/mongooseDepartmentStatus.js')
const Schema = mongoose.Schema

const DepartmentSchema = new Schema(
  {
    id: {type: String},
    employees:[
      {
        employee: {type: String, ref: "Employee"}
      }
    ],
    deparment_manager:[
      idEmployee: {type: String},
      begin_date: {type: String},
      end_date: {type: String},
    ] 
  },
  {
    _id: false
  }


const Department = mongoose.model('Department', DepartmentSchema, 'Department')

module.exports = Department
