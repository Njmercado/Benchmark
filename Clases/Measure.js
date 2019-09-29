class Measure {

  constructor(){
    this.memory = 0 
    this.time = 0 
  }

  start(){
    this.memory = process.memoryUsage().heapUsed/1024/1024
    this.time = process.hrtime()
  }

  end(){
    this.time = process.hrtime(this.time)[1]/1e6
    this.memory = process.memoryUsage().heapUsed/1024/1024 - this.memory
  }

  data(){
    return {
      time: this.time,
      memory: this.memory
    }
  }
}

module.exports = Measure
