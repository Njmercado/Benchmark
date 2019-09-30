const express = require('express');
const router = express.Router();
const fs = require('fs')

const Measure = require('../Clases/Measure.js')
const ms = new Measure() 

const data = require('../city_inspections.json')
const City = require("../Model/Schemas/City.js")

const MongoStore = require('../Model/Schemas/MongoStore.js')
const MongoLoad= require('../Model/Schemas/MongoLoad.js')

router.get('/', async function(req, res, next) {

  var registros = 1

  for (var i = 0; i < 15; i++) {

    registros = Math.pow(2, i)

    ms.start()
    City.find().limit(registros).exec((err, result) => {
      if(err){
        console.log("Error bajando la data: ", err)
        throw err
      }
    })   

    ms.end()
    loadMeasure(ms.data(), registros)
  }

  res.send("Cargado")
}).post("/", (req, res) => { //Cargar Informacion

  for (var i = 0; i < 32768; i++) {

    ms.start()
    var add = new City(
      data[i]
    )
    add.save((err, result) => {
      if(err){
        console.log("Error: ", err)
        throw err
      }
    })
    ms.end()

    storeMeasure(ms.data())
  }

  res.send("Loaded information.")
})

const storeMeasure = (data) => {

  const add = new MongoStore(data)

  add.save()
}

const loadMeasure = (data, registros) => {

  data['nRegistrosDescargados'] = registros

  const add = new MongoLoad(data)

  add.save()
}

module.exports = router;
