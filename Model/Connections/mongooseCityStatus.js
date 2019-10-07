const mongoose = require("mongoose")

const dbUrl = "mongodb://localhost/benchmark"

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',  console.log.bind("Connection with DB hasn't been successful, please be sure to keep DB host active: "))
db.once('open', function(){
  console.log("Successful connection to Benchmark DataBase")
})

module.exports = mongoose

