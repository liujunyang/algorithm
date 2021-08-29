let w = [1, 3, 7]
let value = [10, 40, 90]
function knapsack(c, n, w, value) {
  let dp = (new Array(c+1)).fill(0)
  let res = -Infinity

  for (let i = 0; i < n; i++) {
    for (let v = c; v >= w[i]; v--) {
      dp[v] = Math.max(dp[v], dp[v - w[i]] + value[i])

      if (dp[v] > res) {
        res = dp[v]
      }
    }
  }

  console.log(dp)
  return res
}


// console.log(knapsack(6, 3, w, value))

function lengthOfLIS(arr) {
  let len = arr.length

  if (!len) {
    return 0
  }

  let dp = (new Array(len)).fill(1)
  let maxLen = 1

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {

      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }

    if (maxLen < dp[i]) {
      maxLen = dp[i]
    }
  }

  return maxLen
}

let a2 = [10,9,2,5,3,7,101,18]

console.log(lengthOfLIS(a2))


