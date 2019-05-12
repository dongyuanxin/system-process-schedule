const {
  builtInData
} = require('./datas')

/**
 * 
 * @param {Number} slice 时间片默认为2
 */
function timeslice(slice = 2) {
  const sortedData = builtInData.sort((a, b) => a.arive - b.arive)
  // console.table(sortedData)
  const queue = [sortedData[0]]
  let ts = 0,
    index = 0,
    sliceNum = 0
  while (queue.length) {
    ++sliceNum
    console.log(`第${sliceNum}个时间片:`)
    let front = queue.shift()
    if (front.left > 0) {
      if (front.left <= slice) {
        ts = ts + front.left
        front.left = 0
        console.log(`  当前进程id为${front.pid}, 名称为${front.name}, 已经使用时间${front.need}`)
        console.log(`  进程完成，完成时间为${ts}, 带权周转时间为${(ts - front.arive) / front.need}`)
      } else {
        front.left -= slice
        ts += slice
        console.log(`  当前进程id为${front.pid}, 名称为${front.name}, 还需要时间${front.left}, 使用时间${front.need}`)

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