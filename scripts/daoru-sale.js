'use strict'

/**
 * @file 导入出单列表
 *
 * 把客户发来的总表另存为到本项目根目录，名字为 1sale.xlsx
 * 修改表头的名字为
 * product_name client_name salesman_name
 * expact_earn capital investment_time pay_time dfzt
 *
 * 注意！注意！注意！
 * 一定要临时把服务器上的 1client.json 1product.json 1salesman.json 删掉并替换为刚从网页上下回来的。s
 * 跟录入员确认投资日期、兑付日期代表的含义。
 * 表格里面的投资日期、兑付日期和网页上的相同，那么产生利息的日期就是表格里面投资日期的第二天。
 * 曾经脑子秀逗过一回：
 *    当时一直想着产生利息的日期是投资日期的第二天，然后没有在第133行减1，一看产生的日期刚好是第二天，就给导入了。
 *    忘了这是在录入原始数据，当时脑子混掉了。产生利息的日期本来是+1，然后+2 了
 * 最后把 1sale.xlsx 传到服务器上
 *
 * 从网页上查看客户列表，在 network 中把接口 /api/client/list 的返回值复制出来美化后存到根目录的 1client.json
 * 从网页上查看基金产品列表，在 network 中把接口 /api/product/list 的返回值复制出来美化后存到根目录的 1product.json
 * 从网页上查看出单人列表，在 network 中把接口 /api/salesman/list 的返回值复制出来美化后存到根目录的 1salesman.json
 * 直接在根目录执行 node ./scripts/daoru-sale.js
 *
 * 如果有报缺失的，先解决基础数据的完整性问题
 * 如果没有错误，再打开 this.create()
 *
 * 1从网页上复制最左侧的基金名称（简称），用到Excel中
 * 2将总表中没有兑付日期的补上（Excel本身逻辑要一致，不要差一天，我在导入的时候统一加减）
 * 3去掉 追加投资、提前赎回、退款、转投、续投 的，另外人工录单
 * 4去掉计息日期和投资日期不同的，另外人工录单（把投资日期写到计息日期的前一天，另外可以在备注里描述下客户购买日期）
 *
 * 不用转csv，直接用xlsx即可，转存csv了反而报bug。
 * 在终端里用head看的时候，显示乱码，但是用xlsx去读是没问题的。
 *
 * @author liujunyang@xuetangx.com
 * @date 2020-05-09
 *
 *
 */
const XLSX = require('xlsx')
const moment = require('moment')
const SaleModel = require('../server/models').SaleModel

// 生成客户、产品、出单人的map
let clients = require('./1client.json')
let products = require('./1product.json')
let salesmans = require('./1salesman.json')

let clientMap = {}
let productMap = {}
let salesmanMap = {}

clients.data.forEach(item => {
  clientMap[item.name] = item
})

products.data.forEach(item => {
  productMap[item.name] = item
})

salesmans.data.forEach(item => {
  salesmanMap[item.name] = item
})


class Daoru {
  constructor() {
    this.filename = `1sale.xlsx`
    this.bulkbody = []
    this.init()
  }

  init() {
    this.getListFromXslx()
    // TODO: 先检查没有任何格式不对的情况，只要有一个不对都不行，再打开下面的注释
    // this.create()
  }

  /**
   * 从Excel文件中读取数据
   */
  getListFromXslx() {
    if (!this.filename) throw new Error('this.filename is not exists!!!')
    console.log(`读取文件${this.filename}....`)
    var workbook = XLSX.readFile(this.filename)

    console.log('workbook.SheetNames', workbook.SheetNames)

    // let obj = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    let obj = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]])

    console.log('obj.length', obj.length)

    let lackClient = []
    let lackProduct = []
    let lackSalesman = []
    let lackDfzt = []
    let wrongTime = []
    let wrongNumber = []
    // 同时去掉曾经录入的，如果本身重复，就只塞一次
    let result = []
    obj.forEach(item => {
      /**
       * Excel 导入的时间是以1900 年为原点的，而数字 34839 和 36577 则是1995/5/20 和 2000/2/21 与 1900 年之间经过的天数差值。
       * https://segmentfault.com/q/1010000008104936
       *
       * moment的转化会变成比表格上的数字靠后一天
       *
       * investment_time: 我们系统需要的 投资日期 就得是表格上的日期
       * pay_time:        我们系统需要的 兑付日期 就得是表格上的日期
       * 曾经脑子秀逗过一回：
       *    当时一直想着产生利息的日期是投资日期的第二天，然后没有在let investment_time 减1，一看产生的日期刚好是第二天，就给导入了。
       *    忘了这是在录入原始数据，当时脑子混掉了。产生利息的日期本来是+1，然后+2 了
       */
      let investment_time = moment(new Date(1900, 0, item.investment_time - 1)).format('YYYY-MM-DD')
      let pay_time =        moment(new Date(1900, 0, item.pay_time - 1)).format('YYYY-MM-DD')

      // 没有数据时也不行
      if (!item.client_name) {
        return lackClient.push(item)
      }
      if (!item.product_name) {
        return lackProduct.push(item)
      }
      if (!item.salesman_name) {
        return lackSalesman.push(item)
      }
      if (!['未兑付', '已兑付'].includes(item.dfzt)) {
        return lackDfzt.push(item)
      }

      // 防止Excel中录入看不到的空格
      item.client_name = item.client_name.trim()
      item.product_name = item.product_name.trim()
      item.salesman_name = item.salesman_name.trim()
      item.dfzt = item.dfzt.trim()

      // 检查是不是有未录入的客户
      if (!clientMap[item.client_name]) {
        return lackClient.push(item.client_name)
      }

      // 检查是不是有未录入的基金产品
      if (!productMap[item.product_name]) {
        return lackProduct.push(item.product_name)
      }

      // 检查是不是有未录入的出单人
      if (!salesmanMap[item.salesman_name]) {
        return lackSalesman.push(item.salesman_name)
      }

      // 检查是不是数据格式不对
      let isWrong1 = investment_time === 'Invalid date' || pay_time === 'Invalid date'
      let isWrong2 = typeof item.capital !== 'number' || typeof item.expact_earn !== 'number'
      if (isWrong1) {
        return wrongTime.push(item)
      }
      if (isWrong2) {
        return wrongNumber.push(item)
      }

      let client_id = clientMap[item.client_name].id
      let product_id = productMap[item.product_name].id
      let salesman_id = salesmanMap[item.salesman_name].id
      let expact_earn = item.expact_earn * 100 + ''
      let capital = item.capital
      let time = moment().unix()

      let itemmmm = {
        investment_time,
        pay_time,
        client_id,
        product_id,
        salesman_id,
        capital,
        expact_earn,
        ispayed: {'未兑付': 0, '已兑付': 1}[item.dfzt], // TODO
        create_time: time,
        modify_time: time,
        desc: 'isimported',
      }

      // console.log('======itemmmm', itemmmm)

      result.push(itemmmm)
    })

    lackClient = [...new Set(lackClient)]
    lackProduct = [...new Set(lackProduct)]
    lackSalesman = [...new Set(lackSalesman)]
    console.log('======缺少客户', lackClient.length)
    // console.log('======缺少客户', lackClient.length, JSON.stringify(lackClient))
    console.log('======缺少产品', lackProduct.length)
    console.log('======缺少出单人', lackSalesman.length)
    console.log('======数值格式不对', wrongNumber.length)
    console.log('======日期格式不对', wrongTime.length)
    console.log('======兑付状态不对', lackDfzt.length)

    // console.log('===================result', result.length, result)
    this.bulkbody = result
  }

  create() {
    console.log('======开始导入数据库')
    return SaleModel.bulkCreate(this.bulkbody).then(result => {
      // console.log('===result', result)
    }).catch(err => {
      console.log('===err', err)
    })
  }
}

new Daoru()
