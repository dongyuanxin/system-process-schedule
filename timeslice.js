const {
  builtInData
} = require('./datas')

/**
 * 
 * @param {Number} slice 时间片默认为2
 */
function timeslice(slice = 2) {
  const sortedData = builtInData.sort((a, b) => a.arive - b.arive)
  console.table(sortedData)
  const queue = [sortedData[0]]
  let ts = 0,
    index = 0
  while (queue.length) {
    let front = queue.shift()
    if (front.left > 0) {
      if (front.left <= slice) {
        ts = ts + front.left
        front.left = 0
        console.log(JSON.stringify(front), `ts is ${ts}`)
      } else {
        front.left -= slice
        ts += slice
        console.log(JSON.stringify(front), `ts is ${ts}`)

        for(
          let j = index + 1; 
          j < sortedData.length;
          ++j
        ) {
          if (sortedData[j].arive <= ts) {
            // console.log(`j is ${j}, ts is ${ts}`)
            queue.push(sortedData[j])
            index = j
          } else {
            break
          }
        }
        // console.log(`index is ${index}`)
        queue.push(front)
      }
    }
  }
}

timeslice(2)