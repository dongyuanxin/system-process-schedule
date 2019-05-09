const { builtInData } = require('./datas')

function fcfs() {
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
  }
  console.table(sortedData.map(item => ({
    ...item,
    'ZhouZhuanTime': item.finish - item.arive,
    'DaiquanTime': (item.finish - item.arive) / item.need
  })))
}

fcfs()