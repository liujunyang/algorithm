let arr = [5, 3, 2, 4, 1]

// 选择排序
function selectSort(arr) {
  let len = arr.length

  for (let i=0; i<len; i++) {
    let min = i
    for (let j = i+1; j < len; j++) {
      if (arr[min]> arr[j]) {
        min = j
      }
    }

    if (min !== i) {
      ;[arr[i],arr[min]] = [arr[min], arr[i]]
    }

  }

  return arr
}

// console.log(selectSort(arr))

//插入排序
function insertSort(arr) {
  let len = arr.length
  let temp

  for (let i = 1; i < len; i++) {
    let j = i
    temp = arr[j]

    while (j > 0 && arr[j-1] > temp) {
      arr[j] = arr[j-1]
      j--
    }

    arr[j] = temp
  }

  return arr
}

console.log(insertSort(arr))
