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

var n = 512*32 //# registro a ser cargados/descargados

router.get('/', async function(req, res, next) {

  for (var i = 0; i < n; i++) {

    ms.start()
    City.findOne().exec((err, result) => {
      ms.end()
      loadMeasure(ms.data())
    })   
  }

  res.send("Descargado")
}).get("/multi", (req, res) => {

  var registros = 1

  n = Math.ceil(Math.log2(n))

  for (var i = 0; i < n; i++) {

    registros = Math.pow(2, i)

    ms.start()
    City.find().limit(registros).exec((err, result) => {
      ms.end()
      loadMultiMeasure(ms.data(), registros)
    })   
  }

}).post("/", (req, res) => { //Cargar Informacion

  ms.start()
  for (var i = 0; i < n; i++) {

    var add = new City(
      data[i]
    )
    add.save((err, result) => {
      ms.end()
      storeMeasure(ms.data())
      ms.start()
    })
  }

  res.send("Loaded information.")
}).post("/multi", async (req,res)=>{

  n = await Math.ceil(Math.log2(n))+1
  var registros = await 1

  for (var i = 1; i < n; i++) {

    var subData = await data.slice(0, Math.ceil(Math.log2(registros))) 

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

      storeMultiMeasure({

        time: ms.data().time,
        memory: ms.data().memory
      }, result.registros)  
    }).catch(err => console.log("ERROR: ", err))

    registros = registros + 1
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
