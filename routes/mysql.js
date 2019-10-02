const express = require('express');
const router = express.Router();
const fs = require('fs')

const Measure = require('../Clases/Measure.js')
const ms = new Measure() 

const data = require('../city_inspections.json')

const mysql = require('../Model/mysql.js')

const MySqlLoad = require('../Model/Schemas/MySqlLoad.js')
const MySqlStore= require('../Model/Schemas/MySqlStore.js')

router.get("/", function(req, res){

  var sql = ""
  var registros = 1

  for (var i = 0; i < 16; i++) {
    
    registros = Math.pow(2, i)
    sql = `SELECT * FROM City JOIN Adress ON City.id = Adress.id LIMIT ${registros}`

    ms.start()
    mysql.query(sql, function(err, result){
      if(err){
        console.log("Error on load information with MySql")
        throw err
      }
    })
    ms.end()

    loadMeasure(ms.data(), registros)
  }
}).post("/", function(req, res){

  for (var j = 0; j < 32768; j++) {

    const registro = data[j] 
    const adress = registro.address

    const sql_adress = `INSERT IGNORE INTO Adress (id, city, zip, street, number) VALUES ("${registro.id}", "${adress.city}", "${adress.zip}", "${adress.street}", "${adress.number}")`
    const sql_city = `INSERT IGNORE INTO City (id, certificate_number, business_name, date, result, sector) VALUES ("${registro.id}", "${registro.certificate_number}", "${registro.business_name}", "${registro.date}", "${registro.result}", "${registro.sector}")`

    ms.start()
    mysql.query(sql_adress, function(err, result){
      //if(err) throw err;
    })

    mysql.query(sql_city, function(err, result){
      if(err) throw err;
    })
    ms.end()

    storeMeasure(ms.data())
  }
  res.send("Información cargada a mysql")
});

const storeMeasure = (data) => {

  const add = new MySqlStore(data)

  add.save()
}

const loadMeasure = (data, registros) => {

  data['nRegistrosDescargados'] = registros

  const add = new MySqlLoad(data)

  add.save()
}

module.exports = router;
