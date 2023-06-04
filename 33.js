let util = {
  /**
   * 清除请求数据中的空数据，如空字符串等
   */
  cleanJsonNull: function (obj) {
    if (!obj) {
      return
    }

    let newObj = Object.assign({}, obj)

    for (const key in newObj) {
      let val = newObj[key]

      // 先对字符串进行处理
      if (typeof val == 'string') {
        val = val.trim()
        newObj[key] = val
      }

      // 这个 if 要放在上面 if 的后面，利用它的 trim 得到 ''
      if (val === undefined || val === '' || val === null) {
        delete newObj[key]
        // 避免 null 时进入下面的 if
        continue
      }

      // 这里 val 一定是 object，而不是 null
      if (typeof val == 'object') {
        newObj[key] = this.cleanJsonNull(val)
      }
    }

    return newObj
  },
}

let data = {
  a: 1,
  b: 2,
  c: '',
  d: null,
  e: {
    f: 6,
    g: {
      h: 7,
      i: {},
    },
  },
}

console.log(util.cleanJsonNull(null))
// console.log(util.cleanJsonNull(data))
