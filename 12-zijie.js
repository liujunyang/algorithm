let arr = [0,1,0,2,1,0,1,3,2,1,2,1]

function getRain(arr) {
  let len = arr.length

  // 初始化两头的指针。一轮对撞就把结果求出来了。
  let leftCur = 0
  let rightCur = len -1

  // 初始化为 0，能够在下面的 while 循环中把两头的 0 的给跳过
  let leftMax = 0
  let rightMax = 0

  // 返回值，初始化为 0
  let res = 0

  while (leftCur < rightCur){
    let left = arr[leftCur]
    let right = arr[rightCur]
    console.log(left, right)

    // 一个地方能存的水，不是由它旁边的柱子决定，
    // 而是由它左侧最高处柱子和右侧最高处柱子中的较矮的那个决定
    // 为什么这里用 left < right 判断？这两个相距还挺远的啊
    // 里面包含相等、为0等情况，加0等于没加，如果left目前小，肯定是左侧可以决定高度。
    // 一侧走到高的地方的时候，另外一个侧一直走到高于这个地方或者到头为止。
    // 还是那句话，水位是有洼地两侧最高处柱子总较矮的那个决定。
    if (left < right) {
      // 遇见旧的 leftMax <= left 时，
      // leftMax 就变为新的 left， 那么leftMax - left就是 0,这就是水的边界。
      // 只有 旧的 leftMax > left 时，表示开始向下洼地了，才能存水。
      // 左侧想通了的话，右侧是对称的。
      leftMax = Math.max(left, leftMax)
      // 没遇见洼地的话，leftMax === left，那加的就是 0
      res += leftMax - left
      leftCur++
    } else {
      rightMax = Math.max(right, rightMax)
      res += rightMax - right
      rightCur--
    }
  }

  return res
}

console.log(getRain(arr))
