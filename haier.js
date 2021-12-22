// new Promise((resolve, reject) => {
//   // resolve(1)
//   reject(2)
//   setTimeout(() => {
//     resolve(1)
//     // reject(2)
//   }, 500)
// }).then(a => {
//   console.log(111,a)
// }).catch(b => {
//   console.log(222,b)
// })

// async function abc() {
//   console.log(123)
//   return 456
// }
//
// abc().then(res => {
//   console.log('res', res)
// })

function testRej() {
  let _res, _rej
  let pro = new Promise((res, rej) => {
    _res = res
    _rej = rej
  })

  async function abc() {
    try {
      setTimeout(() => {
        _rej(123)
      }, 1000)

      return pro
    } catch(err){
      console.log('try catch err', err)
    }
  }

  abc().then(res => {
    console.log('then', res)
  }).catch(err => {
    console.log('catch', err)
  })
}

/**
 * 打印值：
 * catch 123
 * 上面的代码直接执行到了 return pro，
 * 然后在 3 秒后 _rej 后进入了 abc() 的 catch
 */
// testRej()



function testThrow1() {
  let _res, _rej
  let pro = new Promise((res, rej) => {
    _res = res
    _rej = rej
  })

  async function abc() {
    try {
      throw '立即throw'
      console.log('after 立即throw')
      return pro

    } catch(err){
      console.log('catch err', err)
      return 'trycatch return'
    }
  }

  abc().then(res => {
    console.log('then', res)
  }).catch(err => {
    console.log('catch', err)
  })
}

/**
 * throw 后面的同步代码不再执行，而且 throw 具有穿透性
 *
 * 打印值：
 * catch err 立即throw
 * then trycatch return
 */
// testThrow1()


function testThrow2() {
  let _res, _rej
  let pro = new Promise((res, rej) => {
    _res = res
    _rej = rej
  })

  async function abc() {
    try {
      setTimeout(() => {
        // 不管这个 _rej(123) 是否打开，都报的一样的打印值，
        // 应该是 throw 后，js 进程就退出了，后面本来该报的 catch 123 也报不了了
        // _rej(123)

        console.log('before 延迟throw')

        // 定时器这里，在后续时间 throw 的错误，
        // 不会进入 try catch 中的 catch，会成为全局 throw 的错误。
        // try catch 收到的是同步（含aa）的错误
        throw '延迟throw'
      }, 1000)

      return pro

    } catch(err){
      console.log('catch err', err)
    }
  }

  abc().then(res => {
    console.log('then', res)
  }).catch(err => {
    console.log('catch', err)
  })
}

/**
 * 定时器这里，在后续时间 throw 的错误，
 * 不会进入 try catch 中的 catch，会成为全局 throw 的错误。
 * try catch 收到的是同步（含aa）的错误
 *
 * 打印值：
 * before 延迟throw
 * 报全局的 延迟throw 错误
 */
// testThrow2()



function testReject1() {
  let _res, _rej
  let pro = new Promise((res, rej) => {
    _res = res
    _rej = rej
  })

  async function abc() {
    try {
      Promise.reject(666)
      console.log(111222444)

      return pro

    } catch(err){
      console.log('catch err', err)
    }
  }

  abc().then(res => {
    console.log('then', res)
  }).catch(err => {
    console.log('catch', err)
  })
}

/**
 * 打印值：
 * 111222444
 * (node:62686) UnhandledPromiseRejectionWarning: 666
 */
// testReject1()




function testReject2() {
  let _res, _rej
  let pro = new Promise((res, rej) => {
    _res = res
    _rej = rej
  })

  async function abc() {
    try {
      _rej(456)
      Promise.reject(666)
      console.log(111222444)

      return pro

    } catch(err){
      console.log('catch err', err)
    }
  }

  abc().then(res => {
    console.log('then', res)
  }).catch(err => {
    console.log('catch', err)
  })
}

/**
 * 打印值：（这个顺序涉及宏任务微任务而已）
 * 111222444
 * catch 456
 * (node:62686) UnhandledPromiseRejectionWarning: 666
 */
testReject2()


