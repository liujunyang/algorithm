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

let _res, _rej
let pro = new Promise((res, rej) => {
  _res = res
  _rej = rej
})

async function abc() {
  try {
    setTimeout(() => {
      // _rej(123)
      throw 'throw666'
    }, 3000)

    return pro

  } catch(err){
    console.log('catch err', err)
  }
}

/**
 * TODO: JSLDJFLASJD
 */
abc().then(res => {
  console.log('then', res)
}).catch(err => {
  console.log('catch', err)
})
