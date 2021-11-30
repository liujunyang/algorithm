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

async function abc() {
  console.log(123)
  return 456
}

abc().then(res => {
  console.log('res', res)
})
