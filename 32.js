function debounce(fn, delay) {
  let timer = null

  return function () {
    let args = arguments

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function biu() {
  console.log('biu biu biu')
}

let debiu = debounce(biu, 1100)

// setInterval(debiu, 1000)

function throttle(fn, delay) {
  let timer = null
  let last = 0

  return function () {
    let args = arguments
    let now = +new Date()

    if (last && now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, delay)
    } else {
      // 触发事件的话，就主动执行，最后一次可能是 timer中执行的。
      // 比如上面的 now - last 接近 delay的时候触发了，进入了timer，
      // 随后又在 now - last 大于 delay的时候触发了事件，
      // 就进入 else执行了一次，不过上面的timer还在计时，所以后面还会再执行一次 timer约定的执行。
      last = now
      fn.apply(this, args)
    }
  }
}
