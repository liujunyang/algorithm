const XLSX = require('xlsx')
const fs = require('fs')

let workbook = XLSX.readFile('test2.xlsx')

console.log('wb', workbook.SheetNames)
let obj = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

console.log('obj.length', obj.length)
const snMap = {}
const result = {}

// 下发命令耗时占比
let opSpanPercentMin = Infinity
let opSpanPercentMax = -Infinity
let opSpanPercentTotal = 0
let opSpanPercentCnt = 0

// 汇总耗时时间占比
let summarySpanPercentMin = Infinity
let summarySpanPercentMax = -Infinity
let summarySpanPercentTotal = 0
let summarySpanPercentCnt = 0

// 除去等待设备应答外，领域模型内部处理耗时占比
let dmCostPercentMin = Infinity
let dmCostPercentMax = -Infinity
let dmCostPercentTotal = 0
let dmCostPercentCnt = 0

// 总时长统计
let spanMin = Infinity
let spanMax = -Infinity
let spanTotal = 0
let spanCnt = 0

let abNormalCnt = 0

obj.forEach((item, index) => {
  if (index > 500) {
    // return
  }

  let { sn, ts, bName } = item

  sn = sn.split(':')[0]

  if (!result[sn]) {
    result[sn] = { sn }
  }

  if (!snMap[sn]) {
    snMap[sn] = { opNum: 0 }
  }

  if (bName === 'batchCmdCallBack') {
    // 防止有多个 batchCmdCallBack 的情况
    if (snMap[sn].tsBack) {
      return
    }

    snMap[sn].tsBack = ts
  }

  if (bName === 'devOpAck') {
    if (snMap[sn].tsAck) {
      return
    }
    snMap[sn].tsAck = ts
  }

  // 以最后一次 op 为准
  if (bName === 'devOp') {
    snMap[sn].opNum++

    if (snMap[sn].tsOp) {
      return
    }
    snMap[sn].tsOp = ts
  }

  if (bName === 'sendBatchCmd') {
    // 防止有多个 sendBatchCmd 的情况
    if (snMap[sn].tsStart) {
      return
    }

    snMap[sn].tsStart = ts

    let { opNum, tsOp, tsAck, tsBack } = snMap[sn]
    let opSpan = tsOp - ts
    let summarySpan = tsBack - tsAck
    let endSpan = tsBack - ts
    let opSpanPercent = opSpan / endSpan
    let summarySpanPercent = summarySpan / endSpan
    let dmCostPercent = opSpanPercent + summarySpanPercent

    if (summarySpan < 0) {
      return
    }

    // 异常的数据不计入
    if (endSpan - (opSpan + summarySpan) > 0.1 * 1000) {
      abNormalCnt++
      console.log('endSpan sn', opNum, opSpan, summarySpan, endSpan, sn)

      return
    }

    // 存在的数据再进入统计
    if (
      !Number.isNaN(opSpan) &&
      !Number.isNaN(endSpan) &&
      !Number.isNaN(summarySpan)
    ) {
      // 统计下发占用时间
      opSpanPercentTotal += opSpanPercent
      opSpanPercentCnt++

      if (opSpanPercentMin > opSpanPercent) {
        opSpanPercentMin = opSpanPercent
      }

      if (opSpanPercentMax < opSpanPercent) {
        opSpanPercentMax = opSpanPercent

        if (opSpanPercentMax > 1) {
          console.log('opSpanPercentMax sn', sn)
        }
      }

      // 统计汇总占用时间
      summarySpanPercentTotal += summarySpanPercent
      summarySpanPercentCnt++

      if (summarySpanPercentMin > summarySpanPercent) {
        summarySpanPercentMin = summarySpanPercent
      }

      if (summarySpanPercentMax < summarySpanPercent) {
        summarySpanPercentMax = summarySpanPercent

        if (summarySpanPercentMax > 1) {
          console.log('summarySpanPercentMax sn', sn)
        }
      }

      // 统计领域模型整体占用时间
      dmCostPercentTotal += dmCostPercent
      dmCostPercentCnt++

      if (dmCostPercentMin > dmCostPercent) {
        dmCostPercentMin = dmCostPercent
      }

      if (dmCostPercentMax < dmCostPercent) {
        dmCostPercentMax = dmCostPercent

        if (dmCostPercentMax > 1) {
          console.log('dmCostPercentMax sn', sn)
        }
      }

      // 统计总时长
      // let spanMin = Infinity
      // let spanMax = -Infinity
      // let spanTotal = 0
      // let spanCnt = 0

      spanTotal += endSpan
      spanCnt++

      if (spanMin > endSpan) {
        spanMin = endSpan
      }

      if (spanMax < endSpan) {
        spanMax = endSpan

        if (spanMax > 10000) {
          console.log('spanMax sn', sn)
        }
      }
    }

    result[sn] = {
      opNum,
      opSpan,
      summarySpan,
      endSpan,
      opSpanPercent,
      summarySpanPercent,
      dmCostPercent,
    }
  }

  // console.log('======itemmmm', item)
})

// console.log('result', result)
result.totalData = {
  spanMin,
  spanMax,
  spanAverage: spanTotal / spanCnt,
  opSpanPercentMin,
  opSpanPercentMax,
  opSpanPercentAverage: opSpanPercentTotal / opSpanPercentCnt,
  summarySpanPercentMin,
  summarySpanPercentMax,
  summarySpanPercentAverage: summarySpanPercentTotal / summarySpanPercentCnt,
  dmCostPercentMin,
  dmCostPercentMax,
  dmCostPercentAverage: dmCostPercentTotal / dmCostPercentCnt,
}

const str = JSON.stringify(result)
// console.log('result', str)
console.log('abNormalCnt', abNormalCnt)

fs.writeFileSync('xlsxJson.json', str)
