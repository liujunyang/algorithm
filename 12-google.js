/**
 * 合并有序区间问题
 * google真题
 *
 * @param arr
 * @returns {Array}
 */
function merge(arr) {
  let len = arr.length

  if (len <= 1) {
    return arr
  }

  arr.sort((a, b) => a[a.length - 1] - b[b.length - 1])

  for (let i = 0; i < len - 1; i++) {
    if (arr[i][1] >= arr[i+1][0]) {
      arr[i][1] = arr[i+1][1]
      arr.splice(i+1, 1)
      i--
      len--
    }
  }

  return arr
}

console.log(merge( [[1,3],[2,6],[8,10],[15,18]]))
