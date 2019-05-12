const { builtInData } = require('./datas')

function fcfs() {
  console.log('='.repeat(20))

  const sortedData = builtInData.sort((a, b) => a.arive - b.arive)
  let ts = 0
  for (let item of sortedData) {
    if (item.arive < ts) {
      ts = ts
    } else {
      ts = item.arive
    }
    ts = ts + item.need
    item.finish = ts
    console.log(`进程${item.pid}执行，完成时间为${ts}`)
  }
  console.table(sortedData.map(item => ({
    ...item,
    state: 'DONE',
    left: 0,
    used: item.need,
    '周转时间': item.finish - item.arive,
    '带权周转时间': (item.finish - item.arive) / item.need
  })))

  console.log('='.repeat(20))
}

fcfs()