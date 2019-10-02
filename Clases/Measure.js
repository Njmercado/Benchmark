class Measure {

  constructor(){
    this.memory = 0 
    this.time = 0 
  }

  start(registros, data){

    this.memory = process.memoryUsage().heapUsed/1024/1024
    this.time = process.hrtime()

    return new Promise((resolve, reject) => {
      resolve({
        time: this.time,
        memory: this.memory,
        registros: registros,
        data: data
      })
    })
  }

  end(time, memory){
    this.time = process.hrtime(time)[1]/1e6
    this.memory = process.memoryUsage().heapUsed/1024/1024 - memory
  }

  data(){
    return {
      time: this.time,
      memory: this.memory
    }
  }
}

module.exports = Measure
