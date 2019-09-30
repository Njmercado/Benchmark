const mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  database: "benchmark",
  user: "root",
  password: "root"
})

connection.connect(function(err){
  if(err) throw err
  console.log("Connection to MySql has been successful")
})

module.exports = connection
