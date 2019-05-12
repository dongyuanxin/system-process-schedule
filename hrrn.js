const {
  data2,
} = require('./datas')

function hrrn() {
  const sortedData = data2.sort((a, b) => a.arive - b.arive)
  // console.table(sortedData)
  sortedData.forEach(item => item.wait = 0)
  let ts = 0
  let queue = []
  
  for (let i = 0; i < sortedData.length; ++i) {
    if (ts < sortedData[i].arive) {
      sortedData[i].state = 'DONE'
      ts += sortedData[i].arive + sortedData[i].need
      queue.push(sortedData[i])
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
      queue.push(sortedData[maxPriorityIndex])
    }
  }

  console.log('='.repeat(20))

  ts = 0
  for (let i = 0; i < queue.length; ++i) {
    if (queue[i].arive > ts) {
      ts = queue[i].arive
    }

    ts = ts + queue[i].need
    queue[i].finish = ts
    delete queue[i].priority
    console.log(`进程${queue[i].pid}执行，完成时间为${ts}`)
  }

  console.table(queue.map(item => ({
    ...item,
    state: 'DONE',
    left: 0,
    used: item.need,
    '周转时间': item.finish - item.arive,
    '带权周转时间': (item.finish - item.arive) / item.need
  })))
  console.log('='.repeat(20))
}

hrrn()