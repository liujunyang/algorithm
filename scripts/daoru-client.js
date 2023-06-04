'use strict'

/**
 * @file 导入客户列表
 * 直接在根目录执行 node ./scripts/daoru-client.js
 *
 * 如果是客户发来的Excel表，就用 this.getListFromXslx()
 * 如果是手动加一堆字符串人名，就用 this.getListFromList()
 *
 * 注意！注意！注意！
 * 一定要临时把服务器上的 1client.json 1product.json 1salesman.json 删掉并替换为刚从网页上下回来的。
 *
 * 用字符串数组的话:
 *  直接把人名单放到 getListFromList 函数内的数组 list 中即可
 *  从网页上查看客户列表，在 network 中把接口 /api/client/list 的返回值复制出来美化后存到根目录的 1client.json
 *  运行确认无误后，再打开 this.create()
 *
 * 用Excel的话:
 *  将用户发来的客户Excel表另存为本项目根目录下的 1client.xlsx
 *  不用转csv，直接用xlsx即可，转存csv了反而报bug。
 *  在终端里用head看的时候，显示乱码，但是用xlsx去读是没问题的。
 *  修改表头为 name bankname phone_number id_number banknumber gender
 *  从网页上查看客户列表，在 network 中把接口 /api/client/list 的返回值复制出来美化后存到根目录的 1client.json
 *  运行确认无误后，再打开 this.create()
 *
 *
 * @author liujunyang@xuetangx.com
 * @date 2020-05-09
 *
 *
 * ！！！！注意环境变量！！！！
 */
const XLSX = require('xlsx')
const moment = require('moment')
const ClientModel = require('../server/models').ClientModel

// 去掉已经手动录入的
let clientOld = require('./1client.json')
let namesExist = []

clientOld.data.forEach(item => {
  namesExist.push(item.name)
})

class Daoru {
  constructor() {
    this.filename = `1client.xlsx`
    this.bulkbody = []

    this.init()
  }

  init() {
    // 用Excel表导入就打开这个
    // this.getListFromXslx()

    // 用人名单数组就打开这个
    // this.getListFromList()

    //没错误了再打开这个
    // this.create()
  }

  /**
   * 从字符串列表直接生成用户
   */
  getListFromList() {
    let list = []
    let result = []
    list.forEach(item => {
      item = item.trim()
      if (!namesExist.includes(item)) {
        let time = moment().unix()
        result.push({
          name: item,
          bankname: 'adtf',
          phone_number: 'adtf',
          id_number: 'adtf',
          banknumber: 'adtf',
          // 0'未知', 1'男', 2'女'
          gender: 1,
          create_time: time,
          modify_time: time,
          desc: 'isimported',
        })
      }
    })

    console.log('原人名单长度', list.length)
    console.log('result 长度', result.length)
    console.log('去重掉的数量', list.length - result.length)
    // console.log('bulkbody', result)
    this.bulkbody = result
  }

  /**
   * 从Excel文件中读取用户
   */
  getListFromXslx() {
    if (!this.filename) throw new Error('this.filename is not exists!!!')
    console.log(`读取文件${this.filename}....`)
    var workbook = XLSX.readFile(this.filename)

    let obj = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

    console.log('obj.length', obj.length)
    // 同时去掉曾经录入的，如果本身重复，就只塞一次
    let result = []
    obj.forEach(item => {
      // console.log('item', item)
      // 去掉前后的空格
      let itn = item.name.trim()
      item.name = itn
      if (!namesExist.includes(itn)) {
        if (!result.find(res => res.name === itn)) {
          // 转化数据格式
          let time = moment().unix()
          result.push({
            name: item.name + '',
            bankname: item.bankname + '',
            phone_number: item.phone_number + '',
            id_number: item.id_number + '',
            banknumber: item.banknumber + '',
            // 0'未知', 1'男', 2'女'
            gender: {'男': 1, '女': 2}[item.gender.trim()],
            create_time: time,
            modify_time: time,
          })
        }
      }
    })

    console.log('result', result.length)
    this.bulkbody = result
  }

  create() {
    return ClientModel.bulkCreate(this.bulkbody).then(result => {
      // console.log('===result', result)
    }).catch(err => {
      console.log('===err', err)
    })
  }
}

new Daoru()
