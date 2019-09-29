var express = require('express');
var router = express.Router();

const Measure = require('../Clases/Measure.js')
const ms = new Measure() 

const data = require('../city_inspections.json')
const City = require("../Model/Schemas/City.js")

router.get('/', function(req, res, next) {

  res.send("get")
}).post("/", (req, res) => { //Cargar Informacion

  var results = [
    {time: 0, memory: 0}
  ] 

  for (var i = 0; i < 200; i++) {

    ms.start()
    var add = new City(
      data[i]
    )
    add.save()
    ms.end()
   
    results.push(ms.data())
  }

  res.send(results)
});

module.exports = router;
