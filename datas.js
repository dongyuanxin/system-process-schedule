const { pcb } = require('./types')

const builtInData = [
  pcb(1000,"A",0,4,4,0,'R'),
  pcb(1001,"B",1,3,3,0,'R'),
  pcb(1002,"C",2,5,5,0,'R'),
  pcb(1003,"D",3,2,2,0,'R'),
  pcb(1004,"E",4,4,4,0,'R')
]

const data1 = [
  pcb(1000,"Job1",1,9,9,0,'R'),
  pcb(1001,"Job2",1,16,16,0,'R'),
  pcb(1002,"Job3",1,3,3,0,'R'),
  pcb(1003,"Job4",1,11,11,0,'R'),
]

module.exports = {
  builtInData,
  data1
}

