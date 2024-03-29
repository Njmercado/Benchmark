const express = require('express');
const router = express.Router();
const fs = require('fs')

const Measure = require('../Clases/Measure.js')
const ms = new Measure() 

const data = require('../city_inspections.json')
const City = require("../Model/Schemas/City.js")

const MongoStore = require('../Model/Schemas/MongoStore.js')
const MongoLoad= require('../Model/Schemas/MongoLoad.js')
const MongoMultiStore = require('../Model/Schemas/MongoMultiStore.js')
const MongoMultiLoad= require('../Model/Schemas/MongoMultiLoad.js')

var n = Math.pow(2, 15) //# registro a ser cargados/descargados

router.get('/', async function(req, res, next) {

  for (var i = 0; i < n; i++) {

    ms.start(1, null).then(result => {

      return new Promise((resolve, reject) => {

        City.findOne().exec((err, res) => {

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

  res.send("Descargado")
}).get("/multi", async (req, res) => {

  var registros = await 1
  var subData  = []

  var iteraciones = Math.ceil(Math.log2(n))

  for (var i = 0; i <= iteraciones; i++) {
    
    registros = await Math.pow(2, i)
    subData = await data.slice(0, registros)

    ms.start(registros, subData).then(result => {

      return new Promise((resolve, reject) => {

        City.find().limit(registros).exec((err, res) => {
          return resolve({
            time: result.time,
            memory: result.memory,
            registros: result.registros
          })
        })   
      }).then(result => {

        ms.end(result.time, result.memory)

        loadMultiMeasure(ms.data(), result.registros)
      })
    })
  }

  res.send("REGISTROS DESCARGADOS, POR FAVOR VERIFIQUE")
}).post("/", (req, res) => { //Cargar Informacion

  for (var i = 0; i < n; i++) {

    ms.start(1, null).then(result => {

      return new Promise((resolve, reject) => {

        var add = new City(
          data[i]
        )

        add.save((err, r) =>{

          return resolve({

            time: result.time,
            memory: result.memory
          })
        })
      })
    }).then(result => {

      ms.end(result.time, result.memory)

      storeMeasure(ms.data())
    })
  }

  res.send("Loaded information.")
}).post("/multi", async (req,res)=>{

  var iteraciones = await Math.ceil(Math.log2(n))+1
  var registros = await 1
  var subData = await []

  for (var i = 1; i <= iteraciones; i++) {
    
    registros = await Math.pow(2, i)
    subData = await data.slice(0, registros) 

    ms.start(registros, subData).then(result => {

      return new Promise((resolve, reject) => {

        City.insertMany(result.data, function(err, r){

          return resolve({

            time: result.time,
            memory: result.memory,
            registros: result.registros
          })
        })
      })
    }).then(result => {

      ms.end(result.time, result.memory)

      storeMultiMeasure(ms.data(), result.registros)  
    }).catch(err => console.log("ERROR: ", err))
  }

  res.send("Registros multiples cargados")
})

const storeMeasure = (data) => {

  const add = new MongoStore(data)

  add.save()
}

const loadMeasure = (data) => {

  const add = new MongoLoad(data)

  add.save()
}

const storeMultiMeasure = (data, registros) => {

  data['nRegistrosCargados'] = registros

  const add = new MongoMultiStore(data)

  add.save()
}

const loadMultiMeasure = (data, registros) => {

  data['nRegistrosDescargados'] = registros

  const add = new MongoMultiLoad(data)

  add.save()
}

module.exports = router;
