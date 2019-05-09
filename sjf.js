const {
  builtInData,
  data1
} = require('./datas')

const Heap = require('heap')

function sjf() {
  const sortedData = builtInData.sort((a,b) => {
    if (a.arive < b.arive) return -1
    if (a.arive > b.arive) return 1
    if (a.need < b.need) return -1
    if (a.need > b.need) return 1
    return 0
  })

  console.table(sortedData)

  let ts = 0
  let heap = new Heap((a, b) => a.need - b.need)
  let queue = []
  for (let i = 0; i < sortedData.length; ++i) {
    if (sortedData[i].arive >= ts) {
      queue.push(sortedData[i])
      ts = ts + sortedData[i].need
    } else {
      let j = i
      for (; j < sortedData.length && sortedData[j].arive < ts; ++j) {
        heap.push(sortedData[j])
        ts = ts + sortedData[j].need
      }
      i = j - 1
    }
  }

  while(!heap.empty()) {
    queue.push(heap.pop())
  }

  console.table(queue)
}

sjf()