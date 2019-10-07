const mongoose = require('../Connections/mongooseEmployeeStatus.js')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema(
  {
    id: {type: String},
    birth_date: {type String},
    name: {type: String},
    gender: {type: String},
    hire_date: {type: String},
    titles:[
      title: {type: String},
      begin_date: {type: String},
      end_date: {type: String},
    ],
    salaries:[
      salary: {type: String},
      begin_date: {type: String},
      end_date: {type: String},
    ]
  },
  {
    _id: false
  }
)

const Employee = mongoose.model('Employee', EmployeeSchema, 'Employee')

module.exports = Employee
