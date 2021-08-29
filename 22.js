
// node v14.5.0
// 1
// 6
// 2
// 3
// 8
// 7
// 4
// 5


console.log(1);
async function async1 () {
    console.log(2);
    await console.log(3);
    console.log(4)
}

setTimeout(() => {
    console.log(5);
}, 0);

const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})

promise.then(res => {
    console.log(res)
})

async1()
console.log(8);






// timer1
// promise1
// timer2
// promise2

// setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(function() {
//         console.log('promise1');
//     });
// }, 0);
// setTimeout(() => {
//     console.log('timer2');
//     Promise.resolve().then(function() {
//         console.log('promise2');
//     });
// }, 0);






// 666
// Promise1
// 777
// setTimeout1
// Promise2
// setTimeout2

// console.log(666)
// Promise.resolve().then(()=>{
//     console.log('Promise1')
//     console.log(777)
//     setTimeout(()=>{
//         console.log('setTimeout2')
//     },0)
// })
// setTimeout(()=>{
//     console.log('setTimeout1')
//     Promise.resolve().then(()=>{
//         console.log('Promise2')
//     })
// },0)






// console.log(666)
// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function() {
//         console.log('promise1')
//     })
// }, 0)
// console.log(777)
// process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//         console.log('nextTick')
//         process.nextTick(() => {
//             console.log('nextTick')
//             process.nextTick(() => {
//                 console.log('nextTick')
//             })
//         })
//     })
// })
// console.log(888)
