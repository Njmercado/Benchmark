const express = require('express');
const router = express.Router();
const fs = require('fs')

const Measure = require('../Clases/Measure.js')
const ms = new Measure() 

const data = require('../city_inspections.json')

const mysql = require('../Model/Connections/mysqlCityStatus.js')

const MySqlLoad = require('../Model/Schemas/MySqlLoad.js')
const MySqlStore= require('../Model/Schemas/MySqlStore.js')
const MySqlMultiStore= require('../Model/Schemas/MySqlMultiStore.js')
const MySqlMultiLoad= require('../Model/Schemas/MySqlMultiLoad.js')

var n = Math.pow(2, 15) 

router.get("/", function(req, res){

  var sql = ""
  var registros = 1

  for (var i = 0; i < n; i++) {

    registros = Math.pow(2, i)
    sql = `SELECT * FROM City JOIN Adress ON City.id = Adress.id LIMIT 1`

    ms.start(1, null).then(result => {

      return new Promise((resolve, reject) => {

        mysql.query(sql, function(err, res){

          return resolve({

            time: result.time,
            memory: result.memory
          })
        })
      }).then(result => {

        ms.end(result.time, result.memory)

        loadMeasure(ms.data())
      })
    })
  }

  res.send("LA INFORMACION HA SIDO DESCARGADA, POR FAVOR MIRE LOS REGISTROS")
}).get("/multi", async (req, res) => {

  var sql = await ""
  var iteraciones = await Math.ceil(Math.log2(n))
  var registros = await 1

  for (var i = 0; i <= iteraciones; i++) {

    registros = await Math.pow(2, i)
    sql = await `SELECT * FROM City JOIN Adress ON City.id = Adress.id LIMIT ${registros}`

    ms.start(registros, null).then(result => {

      return new Promise((resolve, reject) => {

        mysql.query(sql, function(err, res){

          return resolve({

            time: result.time,
            memory: result.memory,
            registros: result.registros
          })
        })
      })
    }).then(result => {

      ms.end(result.time, result.memory)

      multiLoadMeasure(ms.data(), result.registros)
    })
  }

  res.send("REGISTROS DESCARGADOS, POR FAVOR VERIFIQUE EN LOS REGISTROS")

}).post("/", function(req, res){

  for (var j = 0; j < n; j++) {

    const registro = data[j] 
    const adress = registro.address

    const sql_adress = `INSERT IGNORE INTO Adress (id, city, zip, street, number) VALUES ("${registro.id}", "${adress.city}", "${adress.zip}", "${adress.street}", "${adress.number}")`
    const sql_city = `INSERT IGNORE INTO City (id, certificate_number, business_name, date, result, sector) VALUES ("${registro.id}", "${registro.certificate_number}", "${registro.business_name}", "${registro.date}", "${registro.result}", "${registro.sector}")`

    ms.start(1, null).then(result => {

      return new Promise((resolve, reject) => {

        mysql.query(sql_adress, function(err, res){

          mysql.query(sql_city, function(err, res){

            return resolve({

              time: result.time,
              memory: result.memory
            })
          })

        })

      })
    }).then(result => {

      console.log("RESULT --> ", result)

      ms.end(result.time, result.memory)

      storeMeasure(ms.data())
    }).catch(err => console.log("SOME ERROR HAS HAPPEND ----> ",err))
  }

  res.send("Información cargada a mysql")
}).post("/multi", async (req, res) => {

  var registros = await 1  
  var iteraciones = await Math.ceil(Math.log2(n)) 
  var sql_adress = ""
  var sql_city = ""
  registro = 0
  adress = 0

  //Es <=, porque se deben contar todos los registros dentro de la DB.
  //Si fuera <, entonces solo usaria 2^(n-1) registros.
  for (var j = 0; j <= iteraciones; j++) {

    registros = await Math.pow(2, j)

    sql_adress = await 'INSERT IGNORE INTO Adress (id, city, zip, street, number) VALUES ?;' 
    sql_city = await 'INSERT IGNORE INTO City (id, certificate_number, business_name, date, result, sector) VALUES ?;'
    var valuesAdress= []
    var valuesCity= []

    for(var t = 0; t < registros; t++){

      registro = data[t] 
      adress = registro.address

      valuesAdress.push([
        registro.id,
        adress.city,
        String(adress.zip),
        adress.street,
        String(adress.number)
      ])


      valuesCity.push([
        registro.id,
        String(registro.certificate_number),
        registro.business_name,
        registro.date,
        registro.result,
        registro.sector
      ])

      ms.start(registros, null).then(result => {

        return new Promise((resolve, reject) => {

          mysql.query(sql_adress, [valuesAdress], function(err, res){

            mysql.query(sql_city, [valuesCity], function(err2, res2){

              return resolve({

                time: result.time,
                memory: result.memory,
                registros: result.registros
              })
            })

          })

        })
      }).then(result => {

        ms.end(result.time, result.memory)

        multiStoreMeasure(ms.data(), result.registros)

      }).catch(err => console.log("SOME ERROR HAS HAPPEND ----> ",err))
    }
  }

  res.send("TODA LA INFORMACION MULTIPLE HA SIDO ENVIADA CON EXITO")
});

const storeMeasure = (data) => {

  const add = new MySqlStore(data)
  add.save()
}

const loadMeasure = (data) => {

  const add = new MySqlLoad(data)
  add.save()
}

const multiStoreMeasure = (data, registros) => {

  data['nRegistrosCargados'] = registros

  const add = new MySqlMultiStore(data)
  add.save()
}

const multiLoadMeasure = (data, registros) => {

  data['nRegistrosDescargados'] = registros

  const add = new MySqlMultiLoad(data)
  add.save()
}

module.exports = router;
