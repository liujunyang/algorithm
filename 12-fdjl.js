function debouce(fn, time) {
  let timer = null

  return function(){
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      fn.apply(Object.create(null), arguments)
    }, time)
  }
}

function throttle(fn, time) {
  let timer = null
  let last

  return function () {
    let now = Date.now()

    if (last && now - last < time) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        clearTimeout(timer)
        fn.apply(Object.create(null), arguments)
      }, time)
    } else {
      last = now
      fn.apply(Object.create(null), arguments)
    }
  }
}

function fab(n) {
  let f = []
  f[0] = 1
  f[1] = 1

  for (let i = 2; i <= n; i++) {
    f[i] = f[i-1] + f[i-2]
  }

  return f[n]
}

console.log(fab(10))
