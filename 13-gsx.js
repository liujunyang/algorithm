/*
1.int类型值，倒序输出，要求，正数直接倒序，负责为负符号后面的值倒序，如1463
输出3641，输入-1864输出-4681；
2.一个int数组，找出里面第二大的值；
3.求数组中第二大的值：O（N）时间复杂度；
4.反转一个INT型数组
5.两个有序数组求他们的中数
6.插入排序，快速排序
7.输入三个值，判断是什么三角形。三角形类型有：等边，等腰，直角，普通
8.list1=[1,2,3]list2=['a','b','c','d','f']要合成list3=[(1,'a'),(2,'b')(3,'c'),(1,'d'),(2,'f')],用
Python实现；
*/

function template() {
  console.time('a')

  console.timeEnd('a')
}

// 1 这个涉及类型转换，时间长
function reverse(num) {
  // console.time('a')
  if (isNaN(+num)) {
    return 0
  }
  num = '' + num
  let pre = ''
  if (num.startsWith('-')) {
    pre = '-'
    num = num.slice(1)
  }

  num = pre + num.split('').reverse().join('')
  // console.timeEnd('a')
  let res = +num

  res = Math.pow(-2, 64) > res || Math.pow(2, 64) - 1 < res ? 0 : res
  return res
}

function reverse2(num) {
  console.time('a')

  if (num === 0) {
    return 0
  }

  let _tmp = Math.abs(num)
  let res = 0

  while (_tmp){
    res = res * 10 + _tmp % 10
    _tmp = parseInt(_tmp/10)
  }

  res = num > 0 ? res : -res

  res = Math.pow(-2, 64) > res || Math.pow(2, 64) - 1 < res ? 0 : res

  console.timeEnd('a')
  return res
}

// console.log(reverse(146344444444))
// console.log(reverse2(146344444444))
// console.log(reverse(-1864))


// 3 只求值的话，不用排序，一层遍历即可
function find2nd2(nums) {
  if (!Array.isArray(nums) || nums.length < 2) {
    return
  }

  let len = nums.length
  let max = -Infinity
  let max2 = -Infinity

  for (let i = 0; i < len; i++) {
    let item = nums[i]

    if (max < item) {
      max2 = max
      max = item
    }
  }

  return max2
}

// console.log(find2nd2([1,4,2,5]))

//4
function reverseIntArr(nums) {
  let res = []

  while (nums.length) {
    res.push(nums.pop())
  }

  return res
}

function reverseIntArr2(nums) {
  let len = nums.length
  let i = 0
  let j = len - 1
  while (i < j) {
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
    i++
    j--
  }

  return nums
}

// console.log(reverseIntArr2([1,2,3]))


//7 输入三个值，判断是什么三角形。三角形类型有：等边，等腰，直角，普通
function triangle(a, b, c) {
  let arr = [a, b, c].sort()
  let res = []

  if (!(a + b > c && a + c > b && b + c > a)) {
    return '不是三角形'
  }

  if (a === b) {
    res.push(b === c ? '等边' : '等腰')
  }

  if ((a*a + b*b) === c*c) {
    res.push('直角')
  }

  if (!res.length) {
    res.push('普通')
  }

  return res
}

// console.log(triangle(3,4, 5))

// list1=[1,2,3]list2=['a','b','c','d','f']要合成list3=[(1,'a'),(2,'b')(3,'c'),(1,'d'),(2,'f')],用
// Python实现；
function mergearr(arr1, arr2) {
  let len1 = arr1.length
  let len2 = arr2.length

  // 保证前一个数组更短
  if (len1 > len2) {
    return mergearr(arr2, arr1)
  }

  let res = []

  for (let i = 0; i < len2; i++) {
    res.push([arr1[i%len1], arr2[i]])
  }

  return res
}

// console.log(mergearr([1,2,3], ['a','b','c','d','f']))

function findMedianSortedArrays(nums1, nums2) {
  let len1 = nums1.length
  let len2 = nums2.length

  if (len1 > len2) {
    return findMedianSortedArrays(nums2, nums1)
  }

  let len = len1 + len2
  let slice1 = 0
  let slice2 = 0
  let sliceL = 0
  let sliceR = len1

  while (slice1 <= len1){
    slice1 = Math.floor((sliceR - sliceL)/2) + sliceL
    slice2 = Math.floor(len/2) - slice1

    let l1 = nums1[slice1 - 1] || -Infinity
    let l2 = nums2[slice2 - 1] || -Infinity
    let r1 = nums1[slice1] || Infinity
    let r2 = nums2[slice2] || Infinity

    if (l1 > r2) {
      sliceR = slice1 - 1
    } else if (l2 > r1) {
      sliceL = slice1 + 1
    } else {
      if (len % 2) {
        return r1 > r2 ? r2 : r1
      } else {
        let l = l1 > l2 ? l1 : l2
        let r = r1 > r2 ? r2 : r1

        return (l + r) / 2
      }
    }
  }

  return -1
}

console.log(findMedianSortedArrays([1, 2, 3], [7, 8, 9]))
