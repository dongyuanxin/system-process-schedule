const {
  data2,
} = require('./datas')

function hrrn() {
  const sortedData = data2.sort((a, b) => a.arive - b.arive)
  console.table(sortedData)
  sortedData.forEach(item => item.wait = 0)
  let ts = 0
  
  for (let i = 0; i < sortedData.length; ++i) {
    if (ts < sortedData[i].arive) {
      sortedData[i].state = 'DONE'
      ts += sortedData[i].arive + sortedData[i].need
      console.table(sortedData[i])
    } else {
      let j = 0,
        maxPriority = -1,
        maxPriorityIndex = -1
      for(; j < sortedData.length && sortedData[j].arive < ts; ++j) {
        if (sortedData[j].state === 'DONE') {
          continue
        }
        sortedData[j].wait = ts - sortedData[j].arive
        sortedData[j].priority = sortedData[j].wait / sortedData[j].need
        if (sortedData[j].priority > maxPriority) {
          maxPriority = sortedData[j].priority
          maxPriorityIndex = j
        }
      }
      sortedData[maxPriorityIndex].state = 'DONE'
      ts += sortedData[maxPriorityIndex].need
      console.table(sortedData[maxPriorityIndex])
    }
  }
}

hrrn()