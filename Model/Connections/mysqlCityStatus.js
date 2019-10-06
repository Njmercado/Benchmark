const mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  database: "CityStatus",
  user: "root",
  password: "",
  port:3100
})

connection.connect(function(err){
  if(err) throw err
  console.log("Connection to MySql has been successful")
})

module.exports = connection
