/**
 * 20210829
 * 在高途
 */
let funMap = {}

// 两数求和
funMap.twoSum = function () {
  let arr = [2, 7, 11, 9]
  let target = 9

  function twoSum(arr, target) {
    const diff = {}

    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]

      if (diff[target - item] !== undefined) {
        return [diff[target - item], i]
      } else {
        diff[item] = i
      }
    }

    return []
  }

  console.log(twoSum(arr, target))
}

// 合并有序数组
funMap.mege = function () {
  let nums1 = [1, 2, 3]
  let nums2 = [2, 5, 6]

  function merge(nums1, nums2) {
    let i = nums1.length - 1
    let j = nums2.length - 1
    // 这里容易把 k 搞错，k应该是合成后的数组的最后一个位置的下标
    let k = i + j + 1
    console.log(i, j, k)

    // 这里容易设想成使用pop方法，其实只是挪位置而已。用pop的话，就又同时改变了 nums1 数组，改变了 nums2 数组还好
    while (i >= 0 && j >= 0) {
      if (nums1[i] > nums2[j]) {
        nums1[k] = nums1[i]
        i--
        k--
      } else {
        nums1[k] = nums2[j]
        j--
        k--
      }
    }

    console.log(i, j, k)

    while (j >= 0) {
      nums1[k] = nums2[j]
      j--
      k--
    }
    return nums1
  }

  console.log(merge(nums1, nums2))
}

// 三数求和问题
funMap.threeSum = () => {
  let nums = [-1, 0, 1, 2, -1, -4]

  function threeSum(nums) {
    let len = nums.length
    let res = []

    nums.sort((a, b) => a - b)
    // console.log(nums)

    for (let i = 0; i < len; i++) {
      let j = i + 1
      let k = len - 1

      // 把数组【改为有序数组】后，去掉相邻重复的 nums[i] ，因为这两个相同的话，后面能得到的结果话一定是和之前一样的
      // 比如 -1 -1 2，第一个 -1 能得到 -1 -1 2 的结果，第二个 -1 虽然得不到 -1 -1 2 的结果
      // 但是后面再得到的结果就和第一个 -1 一样了，所以遇到第二个 -1，就直接跳过即可
      if (i > 0 && nums[i] === nums[i - 1]) {
        continue
      }

      while (j < k) {
        let temp = nums[i] + nums[j] + nums[k]
        // console.log(i,j,k, temp)

        switch (true) {
          case temp > 0:
            k--
            break
          case temp < 0:
            j++
            break
          // 这里不要写成 temp = 0
          case temp === 0:
            res.push([nums[i], nums[j], nums[k]])
            // 左侧边界值变大，右侧边界值变小，还是有可能求和为0，所以需要这么做
            j++
            k--
            break
        }

        // 左侧重复的话继续往右走
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }

        // 右侧重复的话继续往左走
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      }
    }

    console.log(res)
  }

  threeSum(nums)
}

// funMap.threeSum()

// 回文字符串
funMap.isPalindrome = () => {
  const str = 'asdfasdf'

  function isPalindrome(str) {
    // const res = str.split('').reverse().join('')
    // console.log(res == str)

    let len = str.length

    for (let i = 0; i < len / 2; i++) {
      if (str[i] !== str[len - i - 1]) {
        console.log(false)
        return
      }
    }
    console.log(true)
  }

  isPalindrome(str)
}

// funMap.isPalindrome()

// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
funMap.validPalindrome = () => {
  // const str = 'abbacd'
  // const str = 'abcbac'
  const str = 'abcdeba'

  // 这里把可删除的字符数量作为参数传入，比小册上自由度更高
  function validPalindrome(str, canDelNum = 1) {
    let len = str.length
    let i = 0
    let j = len - 1

    while (i <= j) {
      if (str[i] === str[j]) {
        i++
        j--
      } else if (canDelNum > 0) {
        return (
          validPalindrome(str.slice(i + 1, j + 1), canDelNum - 1) ||
          validPalindrome(str.slice(i, j), canDelNum - 1)
        )
      } else {
        return false
      }
    }

    return true
  }

  console.log(validPalindrome(str, 2))
}

// funMap.validPalindrome()

// 设计一个支持以下两种操作的数据结构：
funMap.wordDirectionary = () => {
  const str = 'abcdeba'

  function wordDirectionary() {
    this.words = {}
  }

  wordDirectionary.prototype.addWord = function (word) {
    let len = word.length

    if (this.words[len]) {
      this.words[len].push(word)
    } else {
      this.words[len] = [word]
    }
  }

  wordDirectionary.prototype.searchWord = function (word) {
    let len = word.length

    if (!this.words[len]) {
      return false
    } else {
      if (word.includes('.')) {
        let re = new RegExp(word)

        return this.words[len].some((item) => {
          return re.test(item)
        })
      } else {
        return this.words[len].includes(word)
      }
    }
  }

  let dict = new wordDirectionary()
  dict.addWord('abc')

  console.log(dict.searchWord('.bc'))
}

// funMap.wordDirectionary()

// 模拟 parseInt
funMap.myParseInt = () => {
  function myParseInt(str) {
    // 可以用 trim，但是尽量用正则的捕获组，这也是一个可考查点
    // str = str.trim()

    // 小册用下面的,\d 后面用了 *，这样的话还需要判断是不是只有 正负号，用 isNaN 判断
    // let re = /^\s*([-\+]?\d*)/
    // 可以改成 \d+ 就肯定有数字了
    let re = /^\s*([-\+]?\d+)/
    let max = Math.pow(2, 31) - 1
    let min = -max - 1

    console.log(777, str.match(re))

    let group = str.match(re)

    // 没有匹配的值时，是 null
    if (!group) {
      return 0
    } else {
      // 使用了捕获组时，匹配捕获组的结果是在一个group数组中的第1位
      let targetNum = +group[1]

      if (targetNum < min) {
        return min
      }

      if (targetNum > max) {
        return max
      }

      return targetNum
    }
  }

  console.log(myParseInt('     -14424442sfdasfadfa'))
  console.log(myParseInt('     -sfdasfadfa'))
}

// funMap.myParseInt()

function ListNode(val) {
  this.val = val
  this.next = null
}

// 链表 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
// 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
funMap.mergeTwoLists = () => {
  let l1 = {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 4,
      },
    },
  }

  let l2 = {
    val: 1,
    next: {
      val: 3,
      next: {
        val: 4,
      },
    },
  }

  function mergeTwoLists(l1, l2) {
    let head = new ListNode()
    let cur = head

    while (l1 && l2) {
      if (l1.val < l2.val) {
        cur.next = l1
        l1 = l1.next
      } else {
        cur.next = l2
        l2 = l2.next
      }

      cur = cur.next
    }

    cur.next = l1 ? l2 : l1

    return head.next
  }

  console.log(JSON.stringify(mergeTwoLists(l1, l2)))
}

// funMap.mergeTwoLists()

// 链表 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
// 输入：1->1->4 输出：1->2
funMap.deleteDuplicates = () => {
  let l1 = {
    val: 1,
    next: {
      val: 1,
      next: {
        val: 4,
        next: {
          val: 4,
          next: {
            val: 4,
          },
        },
      },
    },
  }

  function deleteDuplicates(head) {
    let cur = head

    while (cur && cur.next) {
      if (cur.val === cur.next.val) {
        cur.next = cur.next.next
      } else {
        cur = cur.next
      }

      // 这个一定要写到上面的 else 中，否则就只能跳过一个重复的
      // cur = cur.next
    }

    return head
  }

  console.log(JSON.stringify(deleteDuplicates(l1)))
}

// funMap.deleteDuplicates()

// 链表 给定一个排序链表，彻底删除所有重复的元素
// 输入：1->1->1->2->3 输出：2->3
funMap.deleteDuplicates2 = () => {
  let l1 = {
    val: 0,
    next: {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
          },
        },
      },
    },
  }

  function deleteDuplicates2(head) {
    // 注意边界条件
    if (!head || !head.next) {
      return head
    }
    let dummy = new ListNode()
    dummy.next = head
    // 关键是要想到用 pre 节点
    let pre = dummy
    let cur = dummy.next

    while (cur && cur.next) {
      if (cur.val == cur.next.val) {
        // 把后面的重复的吃完
        while (cur.val == cur.next.val) {
          cur.next = cur.next.next
        }

        // 然后把当前的往后移动一位
        cur = cur.next
        pre.next = cur
      } else {
        // 没有重复就往后平移
        pre = cur
        cur = cur.next
      }
    }

    return dummy.next
  }

  console.log(JSON.stringify(deleteDuplicates2(l1)))
}

// funMap.deleteDuplicates2()

// 小册上解决 deleteDuplicates2 的问题 链表 给定一个排序链表，彻底删除所有重复的元素
// 输入：1->1->1->2->3 输出：2->3
funMap.deleteDuplicates3 = () => {
  let l1 = {
    val: 0,
    next: {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
          },
        },
      },
    },
  }

  function deleteDuplicates3(head) {
    // 注意边界条件
    if (!head || !head.next) {
      return head
    }
    let dummy = new ListNode()
    dummy.next = head
    let cur = dummy

    // 注意这里从 cur.next 开始算，因为第一个 cur 是 dummy
    while (cur.next && cur.next.next) {
      if (cur.next.val === cur.next.next.val) {
        let val = cur.next.val

        // 有重复的话，从第一个重复的值开始，直接扔掉
        while (cur.next.val === val) {
          cur.next = cur.next.next
        }
      } else {
        cur = cur.next
      }
    }

    return dummy.next
  }

  console.log(JSON.stringify(deleteDuplicates3(l1)))
}

// funMap.deleteDuplicates3()

// 给定一个链表，判断链表中是否有环。
funMap.hasCycle = () => {
  let l1 = {
    val: 0,
    next: {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
          },
        },
      },
    },
  }

  function hasCycle(head) {
    // 注意边界条件
    if (!head || !head.next) {
      return false
    }

    let cur = head

    while (cur) {
      if (cur.flag) {
        return true
      } else {
        cur.flag = true
        cur = cur.next
      }
    }

    return false
  }

  console.log(hasCycle(l1))
}

// funMap.hasCycle()

// 给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null
funMap.listCycleStart = () => {
  let l1 = {
    val: 0,
    next: {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
          },
        },
      },
    },
  }

  function listCycleStart(head) {
    // 注意边界条件
    if (!head || !head.next) {
      return null
    }

    let cur = head
    let cnt = 0

    while (cur) {
      if (cur.flag) {
        return cnt
      } else {
        cur.flag = true
        cur.cnt = cnt++
        cur = cur.next
      }
    }

    return null
  }

  console.log(listCycleStart(l1))
}

// funMap.listCycleStart()

// 给定一个链表，判断链表中是否有环。
funMap.hasCycle = () => {
  let l1 = {
    val: 0,
    next: {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
          },
        },
      },
    },
  }

  function hasCycle(head) {
    // 注意边界条件
    if (!head || !head.next) {
      return false
    }

    let cur = head

    while (cur) {
      if (cur.flag) {
        return true
      } else {
        cur.flag = true
        cur = cur.next
      }
    }

    return false
  }

  console.log(hasCycle(l1))
}

// funMap.hasCycle()

// 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
funMap.dailyTemperatures = () => {
  let temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

  function dailyTemperatures(arr) {
    let res = []

    for (let i = 0; i < arr.length; i++) {
      let a1 = arr[i]
      let isPushed = false

      // 这个暴力解法的问题在于对过程中已经能够进行的比较视而不见。
      for (let j = 1; j < arr.length - i - 1; j++) {
        let a2 = arr[i + j]

        if (a1 < a2) {
          isPushed = true
          res.push(j)
          break
        }
      }

      // 没有填充过的话再填充0
      !isPushed && res.push(0)
    }

    return res
  }

  console.log(dailyTemperatures(temperatures))
}

// funMap.dailyTemperatures()

funMap.dailyTemperatures2 = () => {
  let temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

  function dailyTemperatures2(arr) {
    let res = []
    // stack 存的是索引、下标
    let stack = []

    for (let i = 0; i < arr.length; i++) {
      let a1 = arr[i]
      let isPushed = false

      // 初始化第 i 个位置多久升温
      res[i] = 0

      // 注意关键词 "递减栈" ，栈是有序的，所以可以连续比较
      while (stack.length) {
        let len = stack.length
        if (arr[stack[len - 1]] < a1) {
          res[stack[len - 1]] = i - stack[len - 1]
          stack.pop()
        } else {
          isPushed = true
          stack.push(i)
          break
        }
      }

      !isPushed && stack.push(i)
    }

    return res
  }

  console.log(dailyTemperatures2(temperatures))
}

// funMap.dailyTemperatures2()

funMap.dailyTemperatures3 = () => {
  let temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

  function dailyTemperatures3(arr) {
    let res = new Array(arr.length).fill(0)
    // stack 存的是索引、下标
    let stack = []

    for (let i = 0; i < arr.length; i++) {
      // 注意关键词 "递减栈" ，栈是有序的，所以可以连续比较
      while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
        let top = stack.pop()
        res[top] = i - top
      }

      stack.push(i)
    }

    return res
  }

  console.log(dailyTemperatures3(temperatures))
}

// funMap.dailyTemperatures3()

// 最小栈”问题  设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
funMap.MinStack = () => {
  function MinStack() {
    this.stack = []
    this.stack2 = []
  }

  MinStack.prototype.push = function (item) {
    this.stack.push(item)

    // 允许 stack2 有重复值，因为 stack pop 后，还可以有同样的值
    if (!this.stack2.length || this.stack2[this.stack2.length - 1] >= item) {
      this.stack2.push(item)
    }
  }
  MinStack.prototype.pop = function () {
    let res = this.stack.pop()
    if (res === this.stack2[this.stack2.length - 1]) {
      this.stack2.pop()
    }

    return res
  }
  MinStack.prototype.top = function () {
    if (!this.stack || !this.stack.length) {
      return
    }
    return this.stack[this.stack.length - 1]
  }
  MinStack.prototype.getMin = function () {
    return this.stack2[this.stack2.length - 1]
  }

  let minStack = new MinStack()

  minStack.push(-2)
  minStack.push(0)
  minStack.push(-3)
  console.log(minStack.getMin())
  minStack.pop()
  console.log(minStack.top())
  console.log(minStack.getMin())
}

// funMap.MinStack()

// 如何用栈实现一个队列？  使用栈实现队列的下列操作：
// 能用栈实现队列是因为，栈的进入和出来是反向的
// 无法用队列实现栈，是因为队列是一个方向，无法调转
funMap.MyQueue = () => {
  function MyQueue() {
    this.stack1 = []
    this.stack2 = []
  }

  MyQueue.prototype.push = function (x) {
    this.stack1.push(x)
  }
  MyQueue.prototype.pop = function () {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }

    return this.stack2.pop()
  }
  MyQueue.prototype.peek = function () {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }

    return this.stack2[this.stack2.length - 1]
  }
  MyQueue.prototype.empty = function () {
    // 注意，这里用的是一个感叹号
    return !(this.stack1.length || this.stack2.length)
  }

  let queue = new MyQueue()
  queue.push(1)
  queue.push(2)
  console.log(queue.peek())
  console.log(queue.pop())
  console.log(queue.empty())
}

// funMap.MyQueue()

// 滑动窗口问题   给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
funMap.maxSlidingWindow = () => {
  let nums = [1, 3, -1, -3, 5, 3, 6, 7]
  let k = 3

  function maxSlidingWindow(nums, k) {
    let res = []

    for (let i = 0; i <= nums.length - k; i++) {
      let min = nums[i]

      for (let j = 1; j < k; j++) {
        if (min < nums[i + j]) {
          min = nums[i + j]
        }
      }

      res.push(min)
    }

    return res
  }

  console.log(JSON.stringify(maxSlidingWindow(nums, k)))
}

// funMap.maxSlidingWindow()

// 还是我写的这个更符合小册解释的语义，更容易理解
// 下面的 maxSlidingWindow3 是小册的写法
funMap.maxSlidingWindow2 = () => {
  let nums = [1, 3, -1, -3, 5, 3, 6, 7]
  let k = 3

  function maxSlidingWindow2(nums, k) {
    let res = []
    let queue = []

    for (let i = 0; i < nums.length; i++) {
      console.log(i)
      if (i < k) {
        while (queue.length && queue[queue.length - 1] < nums[i]) {
          queue.pop()
        }
        queue.push(nums[i])

        if (i === k - 1) {
          res.push(queue[0])
        }
      } else {
        if (queue[0] === nums[i - k]) {
          queue.shift()
        }

        while (queue.length && queue[queue.length - 1] < nums[i]) {
          queue.pop()
        }
        queue.push(nums[i])

        res.push(queue[0])
      }
    }

    return res
  }

  console.log(JSON.stringify(maxSlidingWindow2(nums, k)))
}

// funMap.maxSlidingWindow2()

funMap.maxSlidingWindow3 = () => {
  let nums = [1, 3, -1, -3, 5, 3, 6, 7]
  let k = 3

  function maxSlidingWindow3(nums, k) {
    let res = []
    let descIndexQueue = []

    for (let i = 0; i < nums.length; i++) {
      // 和当前位比较，把所有小的去掉
      while (
        descIndexQueue.length &&
        nums[descIndexQueue[descIndexQueue.length - 1]] < nums[i]
      ) {
        descIndexQueue.pop()
      }

      // 别忘了加入当前位置的值
      descIndexQueue.push(i)

      // 去掉过期的值，比如 i 等于 3 的时候，就要把0位上的去掉
      while (descIndexQueue.length && descIndexQueue[0] <= i - k) {
        descIndexQueue.shift()
      }

      // 数量达到 k 个后，比如 i 等于 2 的时候，就要开始出结果了
      if (i >= k - 1) {
        res.push(nums[descIndexQueue[0]])
      }
    }

    return res
  }

  console.log(JSON.stringify(maxSlidingWindow3(nums, k)))
}

// funMap.maxSlidingWindow3()

// 层序遍历二叉树 广度优先
funMap.BFS = () => {
  let root = {
    val: 'A',
    left: {
      val: 'B',
      left: {
        val: 'D',
      },
      right: {
        val: 'E',
      },
    },
    right: {
      val: 'C',
      right: {
        val: 'F',
      },
    },
  }

  // 以队列为中心，而不是以 二叉树为中心去递归，否则就又是先序遍历了
  function BFS(root) {
    if (!root) {
      return
    }

    let que = []

    que.push(root)

    while (que.length) {
      let cur = que.shift()

      console.log(cur.val)
      cur.left && que.push(cur.left)
      cur.right && que.push(cur.right)
    }
  }

  BFS(root)
}

// funMap.BFS()

// 全排列问题   给定一个没有重复数字的序列，返回其所有可能的全排列。
funMap.permute = () => {
  let nums = [1, 2, 3]

  function permute(nums) {
    let res = []
    let len = nums.length
    let curr = []
    let visited = {}

    // 入参是坑位的索引
    function dfs(nth) {
      if (nth >= len) {
        res.push(curr.slice())
        return
      }

      for (let i = 0; i < len; i++) {
        let item = nums[i]

        if (!visited[item]) {
          visited[item] = 1
          curr.push(item)

          // 下面手动执行 1 次 dfs(0)
          // nth 等于 0 的时候会执行 len 次 dfs(1)
          // nth 等于 1 的时候会执行 len-1 次 dfs(2)
          // nth 等于 2 的时候会执行 len-2 次 dfs(3)
          // nth 等于 len-1 的时候会执行 1 次 dfs(len) 然后在上面收集结果并return
          dfs(nth + 1) // 深度优先遍历

          // 上面dfs之前用过了，然后通过dfs进入了更深一层
          // 这里把该位置释放掉，以便下一个for循环中的dfs更深一层使用
          // 而不是下一个 for循环中的dfs之前给推进curr
          // 这是for循环本身的功能
          visited[item] = 0
          curr.pop()
        }
      }
    }

    dfs(0)
    return res
  }

  console.log(JSON.stringify(permute(nums)))
}

// funMap.permute()

// 组合问题   给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集
funMap.subset = () => {
  let nums = [1, 2, 3]

  function subset(nums) {
    let res = []
    let len = nums.length
    let curr = []

    // 入参是nums中数字的索引
    // 深度遍历的入参是 "不变的东西" 的索引
    // 如全排列用的是坑位的索引，组合用的是数字的索引
    // 虽然值是一样的，不过考虑的角度是不一样的
    function dfs(index) {
      // 进入 dfs 直接把结果塞进res，因为 curr 是最新更新的了
      // 所以第一次的时候是通过手动执行 dfs(0)， curr 是 空数组 []
      // 下面的 for 可能就执行不了，因为 index 可能大于 len 了
      // 这里用 for 作为隐藏的边界判断
      res.push(curr.slice())

      // 注意这里 i 是从 index 开始，因为迷宫前面的路确定了，这里继续深入
      for (let i = index; i < len; i++) {
        let item = nums[i]

        // ！！！重要
        // 思考的时候不要沿着 dfs 一直深入下去，就考虑当前1个位置是什么处理
        // 把后面的 dfs(i+1) 看成是对下一个数字的处理而已，不再把思路深入进去并且然后考虑函数怎么结束
        // 就考虑是当前位置的数字 如 1 确定用了，然后进行下一个数字的深度遍历
        // 然后把当前位置数字 1 弹出来，i++进入下一个for循环，
        // 就是当前位置的数字 1 不用，下一个位置的数字 2 确定用，
        // 然后在2确定用的基础上，进入2后面的数字的深度遍历,
        // 如此进行 for 循环

        // 以 index 为 0 且 i 为 0 时的数字 1 为例，带上 1 然后进去深度遍历走一趟
        curr.push(item)

        // 这里不能写成 index+1，
        // 因为 index 只是当前这个 dfs 的起点,
        // 接下来要以当前位置的数字用和不用已经确定的情况下去判断接下来的数字用还是不用
        dfs(i + 1) // 深度优先遍历

        // 弹出 1，所以 curr 接下来不带 1
        // 通过 for 循环进入下一个循环，通过 i++，
        // 在下一个循环中 i 变成了 1，就变成了操作数字 2
        // 又是对 2 进行了先使用并进入深度遍历，然后弹出进入下一个循环的过程
        // 这样通过弹出和 i+1 实现了一个数字的 "用" 和 "不用" 的深度遍历
        // 边界就是 i 增大到等于 len 的时候，自然就结束了
        curr.pop()
      }
    }

    dfs(0)
    return res
  }

  console.log(JSON.stringify(subset(nums)))
}

// funMap.subset()

// 限定组合问题   及时回溯，即为“剪枝”
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
// 小册文案【实际上，这里的“回溯”二字，大家可以理解为是在强调 DFS 过程中“退一步重新选择”这个动作。这样想的话， DFS 算法其实就是回溯思想的体现。】
funMap.combine = () => {
  let n = 3
  let k = 2

  function combine(n, k) {
    let res = []
    let curr = []

    function dfs(index) {
      if (curr.length === k) {
        res.push(curr.slice())
        return
      }

      for (let i = index; i <= n; i++) {
        curr.push(i)

        dfs(i + 1) // 深度优先遍历

        curr.pop()
      }
    }

    dfs(1)
    return res
  }

  console.log(JSON.stringify(combine(n, k)))
}

// funMap.combine()

// 给定一个二叉树，返回它的前序（先序）遍历序列。
// 递归算法很简单，你可以通过迭代算法完成吗？
funMap.preorderTraversal = () => {
  let root = {
    val: 1,
    right: {
      val: 2,
      left: {
        val: 3,
      },
    },
  }

  function preorderTraversal(root) {
    let res = []
    let stack = []

    stack.push(root)

    while (stack.length) {
      let item = stack.pop()

      if (item) {
        res.push(item.val)
        stack.push(item.right)
        stack.push(item.left)
      }
    }

    return res
  }

  console.log(JSON.stringify(preorderTraversal(root)))
  // preorderTraversal(root)
}

// funMap.preorderTraversal()

// 给定一个二叉树，返回它的后序遍历序列。
// 递归算法很简单，你可以通过迭代算法完成吗？
funMap.postorderTraversal = () => {
  let root = {
    val: 1,
    right: {
      val: 2,
      left: {
        val: 3,
      },
    },
  }

  function postorderTraversal(root) {
    let res = []
    let stack = []

    if (!root) {
      return res
    }

    stack.push(root)

    while (stack.length) {
      let item = stack.pop()

      res.unshift(item.val)

      if (item.left) {
        stack.push(item.left)
      }

      if (item.right) {
        stack.push(item.right)
      }
    }

    return res
  }

  console.log(JSON.stringify(postorderTraversal(root)))
}

// funMap.postorderTraversal()

// 给定一个二叉树，返回它的中序遍历序列。
// 递归算法很简单，你可以通过迭代算法完成吗？
funMap.inorderTraversal = () => {
  let root = {
    val: 1,
    right: {
      val: 2,
      left: {
        val: 3,
      },
    },
  }

  function inorderTraversal(root) {
    let res = []
    let stack = []
    let cur = root

    while (cur || stack.length) {
      // 一路向左
      while (cur) {
        stack.push(cur)
        cur = cur.left
      }

      // 上面到了空节点后，这一步获取最左侧叶子节点
      cur = stack.pop()
      res.push(cur.val)

      // 然后在这个外层 while 循环中检查当前节点的右侧子节点
      // 符合左中右的顺序
      // 以最左侧叶子节点为例，这里得到的 cur 为 null，
      // 然后在外层 while 中 cur 为 null，在内层 while 中依然为 null 不走
      // 然后 stack pop ，就得到了最左侧叶子节点的父节点，然后被放进 res
      // 然后 cur 指向最左侧叶子节点的父节点的右侧子节点，
      // 也就是最左侧第二个叶子节点
      cur = cur.right
    }

    return res
  }

  console.log(JSON.stringify(inorderTraversal(root)))
}

// funMap.inorderTraversal()

// 层序遍历的衍生问题
// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）
// 这个是自己写的，真的就是按照小册上提示的给每个节点标记下他所在的层级
// 小册上的更进一步，在 while 循环内再使用 for 循环，直接在一个 while 循环内就把一层的搞定
funMap.levelOrder = () => {
  let root = {
    val: 3,
    left: {
      val: 9,
    },
    right: {
      val: 20,
      left: {
        val: 15,
      },
      right: {
        val: 7,
      },
    },
  }

  function levelOrder(root) {
    let res = []
    let que = []
    let cur = []
    let l = 0

    if (!root) {
      return res
    }

    root.l = 0

    que.push(root)
    while (que.length) {
      let item = que.shift()
      let lNow = item.l

      if (l < lNow) {
        res.push(cur.slice())
        cur = []
        l = lNow
      }

      cur.push(item.val)

      if (item.left) {
        item.left.l = lNow + 1
        que.push(item.left)
      }

      if (item.right) {
        item.right.l = lNow + 1
        que.push(item.right)
      }
    }

    res.push(cur)
    return res
  }

  console.log(JSON.stringify(levelOrder(root)))
}

// funMap.levelOrder()

funMap.levelOrder2 = () => {
  let root = {
    val: 3,
    left: {
      val: 9,
    },
    right: {
      val: 20,
      left: {
        val: 15,
      },
      right: {
        val: 7,
      },
    },
  }

  function levelOrder2(root) {
    let res = []
    let que = []
    let level = []

    if (!root) {
      return res
    }

    que.push(root)
    while (que.length) {
      let len = que.length

      for (let i = 0; i < len; i++) {
        let item = que.shift()

        level.push(item.val)

        if (item.left) {
          que.push(item.left)
        }

        if (item.right) {
          que.push(item.right)
        }
      }

      res.push(level.slice())
      level = []
    }
  }

  console.log(JSON.stringify(levelOrder2(root)))
}

// funMap.levelOrder2()

// 翻转二叉树
funMap.invertTree = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function invertTree(root) {
    if (!root) {
      return root
    }

    let left = invertTree(root.left)
    let right = invertTree(root.right)

    root.left = right
    root.right = left

    return root
  }

  console.log(JSON.stringify(invertTree(root)))
}

// funMap.invertTree()

// 二叉搜索树 查找数据域为某一特定值的结点
funMap.erchaSearch = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function erchaSearch(root, n) {
    if (!root) {
      return
    }

    if (root.val === n) {
      console.log('目标是', root)
    } else if (root.val < n) {
      erchaSearch(root.right, n)
    } else {
      erchaSearch(root.left, n)
    }
  }

  console.log(JSON.stringify(erchaSearch(root, 7)))
}

// funMap.erchaSearch()

// 二叉搜索树 插入新结点
funMap.insertIntoBST = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function insertIntoBST(root, n) {
    if (!root) {
      return { val: n }
    }

    // 注意这里要用等号
    if (root.val > n) {
      root.left = insertIntoBST(root.left, n)
    }

    if (root.val < n) {
      root.right = insertIntoBST(root.right, n)
    }

    return root
  }

  console.log(JSON.stringify(insertIntoBST(root, 3)))
}

// funMap.insertIntoBST()

// 二叉搜索树 删除指定结点
funMap.deleteFromBST = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function deleteFromBST(root, n) {
    if (!root) {
      return root
    }

    // 记得这里用等号
    if (root.val > n) {
      root.left = deleteFromBST(root.left, n)
    }

    if (root.val < n) {
      root.right = deleteFromBST(root.right, n)
    }

    // 这2个函数返回的是目标节点的 val，同时会替换目标节点的父节点的下面的指向
    function getMax(parent, root, level) {
      if (root.right) {
        return getMax(root, root.right, level + 1)
      } else {
        let val = root.val
        /**
         * 这个地方确定归属 parent.left 还是 parent.right
         * 如果只找了一次就完事了，就是这层节点紧挨着删除的目标节点，
         * parent 就是目标节点，因为这种方式是找的左子树的最大值，那就用 left,
         * 如果是找了多次（level 大于 0），
         * 那得到 val 之后的操作就是 parent.right =（赋值） 最大节点的左节点
         *
         * 下面的 getMin 函数类似，只是相反
         */
        //
        let str = level === 0 ? 'left' : 'right'
        parent[str] = root.left
        return val
      }
    }

    function getMin(parent, root, level) {
      if (root.left) {
        return getMin(root, root.left, level + 1)
      } else {
        let val = root.val
        // 这个地方难以确定归属 parent.left 还是 parent.right
        let str = level === 0 ? 'right' : 'left'
        parent[str] = root.left
        return val
      }
    }

    /**
     * 将当前节点的值改为左子树中值最大的或右节点中值最小的
     *
     */
    if (root.val === n) {
      // 用 if else if 来优先使用左子树中值最大的
      if (root.left) {
        root.val = getMax(root, root.left, 0)
      } else if (root.right) {
        root.val = getMin(root, root.right, 0)
      } else {
        // 叶子节点，直接删除，因为下面把 root 返回出去了，而且上面 "记得这里用等号"
        root = null
      }

      // if (root.right) {
      //     root.val = getMin(root, root.right, 0)
      // } else if (root.left) {
      //     root.val = getMax(root, root.left, 0)
      // } else {
      //     root = null
      // }
    }

    return root
  }

  console.log(JSON.stringify(deleteFromBST(root, 4)))
}

// funMap.deleteFromBST()

// 二叉搜索树 删除指定结点 这个是小册上面的写法，把最值节点的删除又用 deleteFromBST2 函数进行了，这点值得点赞
// 上面的自己写的是自己挪动了子树。这个小册的写法也只会导致再执行一次 deleteFromBST2，
// 因为替换目标节点的节点肯定是叶子节点了
funMap.deleteFromBST2 = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function deleteFromBST2(root, n) {
    if (!root) {
      return root
    }

    if (root.val > n) {
      root.left = deleteFromBST2(root.left, n)
    } else if (root.val < n) {
      root.right = deleteFromBST2(root.right, n)
    } else {
      // 这里不要忘写任意一个感叹号
      if (!root.left && !root.right) {
        root = null
      } else if (root.left) {
        let maxLeftVal = findMax(root.left)

        root.val = maxLeftVal
        deleteFromBST2(root.left, maxLeftVal)
      } else {
        let minLeftVal = findMin(root.right)

        root.val = minLeftVal
        deleteFromBST2(root.right, minLeftVal)
      }
    }

    function findMax(root) {
      while (root.right) {
        root = root.right
      }

      return root.val
    }

    function findMin(root) {
      while (root.left) {
        root = root.left
      }

      return root.val
    }

    return root
  }

  console.log(JSON.stringify(deleteFromBST2(root, 4)))
}

// funMap.deleteFromBST2()

// 二叉搜索树的验证  给定一个二叉树，判断其是否是一个有效的二叉搜索树
funMap.isValidBST = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function isValidBST(root) {
    if (!root) {
      return true
    }

    let isLeftValid = true
    let isRightValid = true

    if (root.left && root.left.val > root.val) {
      isLeftValid = false
    }

    if (root.right && root.right.val < root.val) {
      isRightValid = false
    }

    return (
      isLeftValid &&
      isRightValid &&
      isValidBST(root.left) &&
      isValidBST(root.right)
    )
  }

  console.log(JSON.stringify(isValidBST(root)))
}

// funMap.isValidBST()

// 二叉搜索树的验证  给定一个二叉树，判断其是否是一个有效的二叉搜索树
// 这是小册的写法，简化了代码结构，就是把当前节点的值传入下一个dfs，
// 把对当前节点的判断转化为将当前节点作为子节点的值的边界进行判断。因为 Infinity 那个是肯定成立的。
funMap.isValidBST2 = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
      },
    },
  }

  function isValidBST2(root) {
    function dfs(root, minVal, maxVal) {
      if (!root) {
        return true
      }

      // 第一次 dfs 这里肯定能通过，因为初次边界是 Infinity
      if (root.val < minVal || root.val > maxVal) {
        return false
      }

      // 把当前节点的值送入下一个dfs作为边界
      return (
        dfs(root.left, minVal, root.val) && dfs(root.right, root.val, maxVal)
      )
    }

    return dfs(root, -Infinity, Infinity)
  }

  console.log(JSON.stringify(isValidBST2(root)))
}

// funMap.isValidBST2()

// 将排序数组转化为二叉搜索树  将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
funMap.sortedArrayToBST = () => {
  let arr = [-10, -3, 0, 5, 9]

  function sortedArrayToBST(arr) {
    let root = null

    if (!arr || !arr.length) {
      return root
    }

    let len = arr.length
    let mid = Math.floor(len / 2)

    root = {
      val: arr[mid],
      left: sortedArrayToBST(arr.slice(0, mid)),
      right: sortedArrayToBST(arr.slice(mid + 1)),
    }

    return root
  }

  console.log(JSON.stringify(sortedArrayToBST(arr)))
}

// funMap.sortedArrayToBST()

// 将排序数组转化为二叉搜索树  将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
// 小册的写法，通过传索引，不用像上面自己写的那样 slice 出来新的数组，节约了空间
funMap.sortedArrayToBST2 = () => {
  let arr = [-10, -3, 0, 5, 9]

  function sortedArrayToBST2(arr) {
    let root = null

    if (!arr || !arr.length) {
      return root
    }

    function buildBST(low, high) {
      if (low > high) {
        return null
      }
      // 这里用 ceil 也行，只是拎起来的点不同，也是合法的
      let mid = Math.floor(low + (high - low) / 2)
      // console.log('mid', mid)

      return {
        val: arr[mid],
        left: buildBST(low, mid - 1),
        right: buildBST(mid + 1, high),
      }
    }

    return buildBST(0, arr.length - 1)
  }

  console.log(JSON.stringify(sortedArrayToBST2(arr)))
}

// funMap.sortedArrayToBST2()

// 给定一个二叉树，判断它是否是高度平衡的二叉树【非平衡二叉树】。
funMap.isBalanced = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
        left: {
          val: 8,
          // left: {
          //     val: 7.5
          // }
        },
      },
    },
  }

  function isBalanced(root) {
    if (!root) {
      return true
    }

    if (root.left && (root.left.left || root.left.right) && !root.right) {
      return false
    }

    if (root.right && (root.right.right || root.right.right) && !root.left) {
      return false
    }

    return isBalanced(root.left) && isBalanced(root.right)
  }

  console.log(isBalanced(root))
}

// funMap.isBalanced()

// 给定一个二叉树，判断它是否是高度平衡的二叉树【非平衡二叉树】。
// 小册上用了一个全局 flag，以及用数字来判断深度。flag 确定非平衡的话其他深度值就不再算了，递归返回。
funMap.isBalanced2 = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
        left: {
          val: 8,
          // left: {
          //     val: 7.5
          // }
        },
      },
    },
  }

  function isBalanced2(root) {
    let flag = true

    function dfs(root) {
      // 如果 flag 为 false，其实没必要进行后面子树的递归了，直接返回一个随便的数字即可
      // 因为最后的返回值是 flag
      if (!root || !flag) {
        return 0
      }

      let left = dfs(root.left)
      let right = dfs(root.right)

      if (Math.abs(left - right) > 1) {
        flag = false
        return 0
      }

      return Math.max(left, right) + 1
    }

    // 记得这里启动第一个 dfs
    dfs(root)
    return flag
  }

  console.log(isBalanced2(root))
}

// funMap.isBalanced2()

// 平衡二叉树的构造
// 给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
// 小册中示例的输入输出虽然是数组，不过那是算法的伪表达，实际还是上面题目说的，输入输出都是树。
funMap.balanceBST = () => {
  let root = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 3,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
      },
      right: {
        val: 9,
        left: {
          val: 8,
          // left: {
          //     val: 7.5
          // }
        },
      },
    },
  }

  function balanceBST(root) {
    if (!root) {
      return root
    }
    let arr = []
    function inOrder(root) {
      if (!root) {
        return
      }

      inOrder(root.left)
      arr.push(root.val)
      inOrder(root.right)
    }

    inOrder(root)

    function buildBST(left, right) {
      if (left > right) {
        return null
      }

      let mid = Math.floor(left + (right - left) / 2)
      let root = {
        val: arr[mid],
        left: buildBST(left, mid - 1),
        right: buildBST(mid + 1, right),
      }

      return root
    }

    return buildBST(0, arr.length - 1)
  }

  console.log(JSON.stringify(balanceBST(root)))
}

// funMap.balanceBST()

// 堆结构在排序中的应用——优先队列
// 在未排序的数组中找到第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 输入: [3,2,1,5,6,4] 和 k = 2 输出: 5
funMap.findKthLargest = () => {
  let nums = [3, 2, 1, 5, 6, 4]
  let k = 2

  function findKthLargest(nums, k) {
    let arr = nums.sort((a, b) => b - a)

    return arr[k - 1]
  }

  console.log(JSON.stringify(findKthLargest(nums, k)))
}

// funMap.findKthLargest()

// 堆结构在排序中的应用——优先队列
// 在未排序的数组中找到第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 输入: [3,2,1,5,6,4] 和 k = 2 输出: 5
// 小册写法
// 其实完全没用用树的结构，而是用的数组表征程序遍历树的值
funMap.findKthLargest2 = () => {
  let nums = [3, 2, 1, 5, 6, 4]
  let k = 2

  function findKthLargest2(nums, k) {
    let heap = []
    // n 其实是 heap 数组的位置索引
    let n = 0

    function createHeap() {
      for (let i = 0; i < k; i++) {
        insert(nums[i])
      }
    }

    function updateHeap() {
      for (let i = k; i < nums.length; i++) {
        let item = nums[i]

        if (item > heap[0]) {
          heap[0] = item
          downHeap(0, k)
        }
      }
    }

    function insert(x) {
      heap[n] = x
      upHeap(0, n)
      n++
    }

    function downHeap(low, high) {
      let i = low
      let j = 2 * i + 1

      while (j <= high) {
        // 这个地方的判断不要写到下面的if中去，先判断左右哪个小
        if (j + 1 <= high && heap[j] > heap[j + 1]) {
          j = j + 1
        }

        if (heap[i] > heap[j]) {
          ;[heap[i], heap[j]] = [heap[j], heap[i]]
          i = j
          j = 2 * i + 1
        } else {
          break
        }
      }
    }

    /**
     * 和 downHeap 不一样，upHeap 的时候，目标j的值不需要和兄弟节点的值去比较
     * 因为就算比较了，依然要和父节点比较，而且就算和兄弟节点比较完，也不能换，因为换完后这个堆不一定是合法的堆。
     * 如[1, 3, 2.5, 3.1, 3.2, 2.7, 2.8] 就不能把 3 和 2.5 互换
     * @param low
     * @param high
     */
    function upHeap(low, high) {
      let i = high
      let j = Math.floor((i - 1) / 2)

      while (j >= low) {
        if (heap[j] > heap[i]) {
          ;[heap[i], heap[j]] = [heap[j], heap[i]]

          i = j
          j = Math.floor((i - 1) / 2)
        } else {
          break
        }
      }
    }

    createHeap()
    updateHeap()
    return heap[0]
  }

  console.log(JSON.stringify(findKthLargest2(nums, k)))
}

// funMap.findKthLargest2()

// 冒泡排序
funMap.bubbleSort = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function bubbleSort(nums) {
    if (!nums || !nums.length) {
      return nums
    }

    let len = nums.length

    // 记得这里是2层循环，时间长了就忘了，写成了一个 for
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (nums[j] > nums[j + 1]) {
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        }
      }
    }

    // 这个不是冒泡排序，是啥排序来着？
    // for (let i = 0; i < len - 1; i++) {
    //     for (let j = i+1; j < len; j++) {
    //         if (nums[i] > nums[j]) {
    //             [nums[i], nums[j]] = [nums[j], nums[i]]
    //         }
    //     }
    // }

    return nums
  }

  console.log(JSON.stringify(bubbleSort(nums)))
}

// funMap.bubbleSort()

// 冒泡排序
funMap.bubbleSort2 = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function bubbleSort2(nums) {
    if (!nums || !nums.length) {
      return nums
    }

    let len = nums.length

    // 记得这里是2层循环，时间长了就忘了，写成了一个 for
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (nums[j] > nums[j + 1]) {
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        }
      }
    }
    return nums
  }

  console.log(JSON.stringify(bubbleSort2(nums)))
}

// funMap.bubbleSort2()

// 冒泡排序
funMap.bubbleSort3 = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function bubbleSort3(nums) {
    if (!nums || !nums.length) {
      return nums
    }

    let len = nums.length
    let flag = true

    // 记得这里是2层循环，时间长了就忘了，写成了一个 for
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (nums[j] > nums[j + 1]) {
          flag = false // 这个地方记得带分号，要么就记住在下面的方括号前面带上分号，养成习惯
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        }
      }

      if (flag) {
        return nums
      }
    }

    return nums
  }

  console.log(JSON.stringify(bubbleSort3(nums)))
}

// funMap.bubbleSort3()

// 选择排序
funMap.selectSort = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function selectSort(nums) {
    if (!nums || !nums.length) {
      return nums
    }

    let len = nums.length
    let minIndex

    // 最后一个元素的话就没必要再执行这个循环了
    for (let i = 0; i < len - 1; i++) {
      minIndex = i

      // 每次都是把最小的移到了前面了，所以这里从新的 i继续往后选择排序
      // 这里要判断当时最后一个位置 len - 1 上元素的值
      for (let j = i; j < len; j++) {
        if (nums[j] < nums[minIndex]) {
          minIndex = j
        }
      }

      if (minIndex !== i) {
        ;[nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
      }
    }

    return nums
  }

  console.log(JSON.stringify(selectSort(nums)))
}

// funMap.selectSort()

// 插入排序
funMap.insertSort = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function insertSort(nums) {
    if (!nums || !nums.length) {
      return nums
    }

    // 第一个肯定是有序的
    for (let i = 1; i < nums.length; i++) {
      // 假设前面都有序了，这个有逐个和前面互换位置的过程
      for (let j = i - 1; j >= 0; j--) {
        if (nums[j] > nums[j + 1]) {
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        } else {
          // 有序的情况下就不用继续往前比了
          break
        }
      }
    }

    return nums
  }

  console.log(JSON.stringify(insertSort(nums)))
}

// funMap.insertSort()

// 插入排序 小册上的写法
funMap.insertSort2 = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function insertSort2(nums) {
    if (!nums || !nums.length) {
      return nums
    }

    // 第一个肯定是有序的
    // 到某一个元素的时候，这个元素的值先保留着值，把自己占的位置给先让出来
    for (let i = 1; i < nums.length; i++) {
      let temp = nums[i]
      let j = i

      // 这里跟上面自己的写法类似，都会及时终端：已经到了应该到的位置，或j到了0了
      while (j > 0 && nums[j - 1] > temp) {
        nums[j] = nums[j - 1]
        j--
      }

      // j 目前的位置就是本轮 temp 应该在的位置
      nums[j] = temp
    }

    return nums
  }

  console.log(JSON.stringify(insertSort2(nums)))
}

// funMap.insertSort2()

// 归并排序
funMap.mergeSort = () => {
  let nums = [3, 2, 1, 5, 6, 4]

  function mergeSort(nums) {
    if (!nums || nums.length === 0 || nums.length === 1) {
      return nums
    }

    let mid = Math.floor(nums.length / 2)
    let leftArr = mergeSort(nums.slice(0, mid))
    let rightArr = mergeSort(nums.slice(mid))

    return mergeArr(leftArr, rightArr)
  }

  function mergeArr(leftArr, rightArr) {
    let len1 = leftArr.length
    let len2 = rightArr.length
    let i = len1 - 1
    let j = len2 - 1
    let k = i + j + 1

    while (i >= 0 && j >= 0) {
      if (leftArr[i] < rightArr[j]) {
        leftArr[k] = rightArr[j]
        k--
        j--
      } else {
        leftArr[k] = leftArr[i]
        k--
        i--
      }
    }

    while (j >= 0) {
      leftArr[k] = rightArr[j]
      k--
      j--
    }

    return leftArr
  }

  console.log(JSON.stringify(mergeSort(nums)))
}

// funMap.mergeSort()

// 快速排序
funMap.quickSort = () => {
  let nums = [3, 2, 1, 1, 1, 5, 6, 4]

  function quickSort(nums, left = 0, right = nums.length - 1) {
    if (!nums || nums.length === 0 || nums.length === 1) {
      return nums
    }

    let len = nums.length
    let mid = Math.floor(len / 2)
    let numMid = nums[mid]

    // 快速排序依次，得到分隔位置，下面分治进入后续的快排
    let lineIndex = partition(nums, left, right)

    if (left < lineIndex - 1) {
      quickSort(nums, left, lineIndex - 1)
    }

    if (right > lineIndex) {
      quickSort(nums, lineIndex, right)
    }

    return nums
  }

  // 把基准值左侧大于基准值的都弄右边，把基准值右侧小于基准值的都弄左边，这样当前的区域左边都小于等于右边了
  // 再结合上面的分治思想，所有大小区间都满足这个特点的话，那整个数组就是有序的
  function partition(nums, left, right) {
    // 以中间为基准值
    let pivotValue = nums[left + Math.floor((right - left) / 2)]

    let i = left
    let j = right

    // 这里像下面一样的道理，等于号的时候不用互换位置，所以不用写等号
    while (i < j) {
      while (nums[i] < pivotValue) {
        i++
      }

      while (nums[j] > pivotValue) {
        j--
      }

      // 等于的话，就是自己，没必要换，所以不用写等号
      if (i < j) {
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
      }

      // 这个放上面这个 if 的外面，因为数组中有相同的值的时候，
      // 在上面不写 i<=j 的条件的情况下某些时候触发不了自增，如 let nums = [3,2,1,1,1,5,6,4]
      // 如果要写上面的 if 内，要在上面的判断条件上改为 i<=j
      i++
      j--
    }

    return i
  }

  console.log(JSON.stringify(quickSort(nums)))
}

// funMap.quickSort()

// 动态规划 爬楼梯问题 递归版
/**
 * 站在第0阶阶梯开始爬
 * 以终为始，从终点看 f(n) = f(n-1) + f(n-2)
 * f(1) 为 1
 * f(2) 为 2
 *
 * 基于树形思维思考是自顶向下，从未知最终拆回到已知的过程
 * 动态规划是自底向上，从已知一步步向前推导找出未知的过程
 */
funMap.climbStairs = () => {
  let n = 50

  let _map = []

  function climbStairs(n) {
    if (n === 1) {
      return 1
    }

    if (n === 2) {
      return 2
    }

    if (_map[n]) {
      return _map[n]
    }

    let res = climbStairs(n - 1) + climbStairs(n - 2)

    _map[n] = res
    return res
  }

  console.log(climbStairs(n))
}

// funMap.climbStairs()

// 动态规划 爬楼梯问题 动态规划版
/**
 * 站在第0阶阶梯开始爬
 * 以终为始，从终点看 f(n) = f(n-1) + f(n-2)
 * f(1) 为 1
 * f(2) 为 2
 *
 * 基于树形思维思考是自顶向下，从未知最终拆回到已知的过程
 * 动态规划是自底向上，从已知一步步向前推导找出未知的过程
 *
 * 前面咱们在排序专题学过“分治”思想，提到了“子问题”这个概念。
 * 分治问题的核心思想是：把一个问题分解为相互独立的子问题，逐个解决子问题后，
 * 再组合子问题的答案，就得到了问题的最终解。
 *
 * 动态规划的思想和“分治”有点相似。不同之处在于，“分治”思想中，
 * 各个子问题之间是独立的：比如说归并排序中，子数组之间的排序并不互相影响。
 * 而动态规划划分出的子问题，往往是相互依赖、相互影响的。
 *
 * 什么样的题应该用动态规划来做？
 * 最优子结构  它指的是问题的最优解包含着子问题的最优解——不管前面的决策如何，此后的状态必须是基于当前状态（由上次决策产生）的最优决策
 * 重叠子问题  它指的是在递归的过程中，出现了反复计算的情况
 */
funMap.climbStairs2 = () => {
  let n = 50

  function climbStairs2(n) {
    let f = []

    f[1] = 1
    f[2] = 2

    for (let i = 3; i <= n; i++) {
      f[i] = f[i - 1] + f[i - 2]
    }

    return f[n]
  }

  console.log(climbStairs2(n))
}

// funMap.climbStairs2()

// 动态规划 “最值”型问题典范：如何优雅地找硬币
/**
 * 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 *
 * 示例1：
 * 输入: coins = [1, 2, 5], amount = 11
 * 输出: 3
 * 解释: 11 = 5 + 5 + 1
 *
 * 假设组成 amount 用了 k 个硬币 ck 表示第 k 个硬币
 * f(amount) = Math.min(f(amount-c1) + f(amount-c1) + f(amount-c1) + ...f(amount-ck)) + 1
 * f(0) = 0
 */
funMap.coinChange = () => {
  let coins = [1, 2, 5]
  let amount = 11

  function coinChange(coins, amount) {
    let f = []

    f[0] = 0

    // 从 1 开始到 amount 逐个计算每个值的最优解
    // 不要忘记写等号
    for (let i = 1; i <= amount; i++) {
      // 先初始化值为极大，如果这个数能找到硬币来凑他，一定比 Infinity 小，就会被替换
      f[i] = Infinity

      for (let j = 0; j < coins.length; j++) {
        let item = coins[j]

        // 能凑数
        if (i - item >= 0) {
          // 不要像下面一样写 f[i-1]
          // f[i] = Math.min(f[i-1], (f[i-item]+1))

          // 没有加入 item 硬币时的最小硬币数【可能为 Infinity】
          let coinCountWithoutCoinJ = f[i - item]
          // 加入 item 硬币时的最小硬币数【可能继续为 Infinity】
          let coinCountWithCoinJ = coinCountWithoutCoinJ + 1

          // f[i] 本身在上面赋值为 Infinity，如果 coinCountWithCoinJ 为正常值，
          // 就能更新 f[i]，当然，前提是 i - item >= 0
          // 有可能算着算着 i - item >= 0 这个条件本身就满足不了了
          f[i] = Math.min(f[i], coinCountWithCoinJ)
        }
      }
    }

    if (f[amount] === Infinity) {
      return -1
    }

    return f[amount]
  }

  console.log(coinChange(coins, amount))
}

// funMap.coinChange()

/**
 * 题目描述：0-1背包问题
 * 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；
 * 每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的
 * 背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？
 *
 * 注意：每种物品都只有1件
 *
 * 同样体积和价值的物品只有一件
 * 如何才能使背包内的物品总价值最大？
 *
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！                                               ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 这个 knapsack1 函数的注释是错误的，               ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 要看下面 knapsack2 函数的注释，                  ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 代码是小册的代码，自然是能运行的，                  ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 不过这个注释解释不了代码为什么这么写。               ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 这里留着这个注释是要留下思维的轨迹，                ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 这个错误的思维在死胡同卡了一个月。                  ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 有时候会忘记当初小白时候是怎么想的。                ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 从这个问题对动态规划有了更深刻的理解。               ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 小册中爬楼梯那一节对动态规划有规律总结。             ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！ 所以自己走走弯路和直接看总结好的规律的感受相比会更深刻。！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！                                                ！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 *
 *
 *
 *【这里要知道，对于给定的一堆物品，什么都定下了，在不同的背包体积下的最优解都有固定答案了】
 *【不要在思考的过程中考虑有别的规格的物品怎么办】
 *
 * 【注意小册说的是在容量终点c 取出一样物品，取一个】
 * 1.在容量终点往后退
 * 2.取的是1个，所以是逐个物品讨论，讨论某个物品的时候，其他物品都在这堆物品里。WRONG!!!
 *
 *
 * 倒推法，能推导出 f(n) 和 f(n-1) 之间的关系，能得到状态转移方程，
 * 再找到边界 f(0) f(1) 等。所以都用倒推法。
 * 重点思路：背包的体积在我们手里是可变的。往外拿，相当于换一个背包求解当时的解。
 * 往外拿 x 的时候，可以分为有 x 和没有 x，这个思路要记住。
 *
 *
 * 小册中：现在，假设背包已满，容量已经达到了 c。站在c这个容量终点往后退，考虑从中取出一样物品，
 * 那么可能被取出的物品就有 i 种可能性。
 * 这句话应该改为："有 n 中可能性"
 *
 * 【这个 i 是怎么得来的】
 * 作者直接思路跳跃引入了 i，引入了 f(i, c)。
 * f(i, c) 其实表示的是讨论物品 i 的时候的最大价值。进而表示的是物品数组中包含物品 i 的时候的解。
 * 然后   f(i-1, v) 表示的是物品数组中根本就不包含物品 i 的时候，在 体积 v 下的最优解。
 * 相应的 f(i-1, c) 表示的是物品数组中根本就不包含物品 i 的时候，在 体积 c 下的最优解。
 * i 本身表示的意思，应该是遍历讨论物品数组的时候，讨论任何一个物品的时候，该物品的序号。
 * i 可以取的是任意一个，而不是数组中最后一个。
 *
 * 小册中：我用 f(i, c) 来表示【前 i 件】物品恰好装入容量为 c 的背包中所能获得的最大价值。
 * 这句话应该改成
 * 我用 【f(数组包含i物品, c)】 来表示【这 n 件】物品恰好装入容量为 c 的背包中所能获得的最大价值。
 * 不能写成 前 i 件，有误导性，而应该是 "这 n 件"。WRONG!!!
 *
 * 倒推时，不是说包里有两个体积相同但是价值不同的物体往外取的时候，
 * 往外拿哪个能够使得包里面剩下的总价格最大，
 * 而是说，这个 i 就是物品数组的 i，讨论 i 物品时，就是针对该物品。其他物品都在可选的物品堆里。
 *
 * 讨论物品 i 时，有如下 2 中情况：
 *
 * 1.假如最优解中就不包含 i 物品的话
 *  那么假如物品堆里本就没有这个物品（比如一个超大气球），也不影响最优解。
 *  f(things数组, c) 等于 f(things数组不包含 i 物品, c), 是背包体积 c 下的最大的值
 *  f(i, c) == f(i-1, c)
 *
 *  2.假如最优解中包含 i 物品的话
 *  用倒推法的时候，从最优解包里面拿出来 i 物品后,
 *  f(things数组, c) - value[i] 是原来的最优解方案的价值减去物品 i 的价值，
 *  和
 *  f(things数组不包含 i 物品, c - w[i]), 是这堆物品（刨除物品 i）在背包体积 c - w[i] 下的最大的价值（该情况下的最优解）
 *  两者相等。即：
 *  f(i, c) - value[i] == f(i-1, c - w[i])
 *  进而：f(i, c) == f(i-1, c-w[i]) + value[i]
 *
 *  ！！！为什么前者等于后者（后者就是按照表示方式进行的表示，或者说该情况下的最优解就是用它表示。前者用了减号，就是从之前的最优解算出来的一个值）
 *  ！！！！原因：
 *  "那么取出这个动作就会带来价值量和体积量的减少" 这句话容易扰乱思路。
 *  就记住现在是包里有物品 i，即最优解中 包含 i 物品的话，就记住终点体积 c 下的最优解肯定有它。
 *  没有它的情况已经在上面是另外一种情况。
 *
 *  把 i 物品拿走之后，背包 A 减少 i 的体积后剩下的体积 B 中，
 *  如果当前的最优解剩下的物品的组合不是价值最大的，而是有别能让价值更大的方案，
 *  那么在那个基础上把体积恢复背包 A 后，包中最沉的方案肯定不是原来的方案，
 *  就是那个更大的方案基础上再加上 i 物品了（虽然这个别的方案和原来的方案一样都包含 i 物品）。【记住现在一直在讨论的是情况 2，最终最优解中一定包含 i 物品】
 *  （有别的价值同等的方案倒是没关系，因为不影响等式本身，都是值一样的最优解的话，等式依然成立）
 *  可以想象家里那个塑料袋的例子，把擦脸水拿出来后，再减少擦脸水的体积，
 *  剩下的肯定是剩下体积下最重的，一个是别的物品不管大小，依然放不进去，
 *  而且也如上所说，不能换方案，否则加上物品i后最重的就不是原来的方案了。
 *
 *
 *  结合 2 种情况，得到了状态转移方程：
 *  f(i, c) = Math.max(f(i-1, c), f(i-1, c-w[i]) + value[i])
 *
 *
 * 然后就是对每个物体都试试数组里面有没有他怎么样。
 * 这么说，i的遍历顺序可以正序、倒序、甚至随机跳着来，for循环只是方便遍历而已
 * 小册的解法里面就是让 i 从 0 开始计数的。
 *
 *
 *
 * 写掘金文章，先写正确的结论，然后把错误的思路留到下面作为思路进化的记录。
 * 最后得出结论：动态规划的关键：最优子结构+自底向上从已知推导找出未知。
 * 还是爬楼梯的结论，难点在于状态转移方程不好确定，已知状态不明显（这里是需要自己设置初始值，以及求出各个体积下的解，虽然题目只是要求求出某个体积下的解）。
 *
 * 答案阶段的结论。
 * 然后代码走的是动态规划的路线。
 * 在上面的爬楼梯问题 climbStairs 已经总结了：
 * 基于树形思维思考是自顶向下，从未知最终拆回到已知的过程
 * 动态规划是自底向上，从已知一步步向前推导找出未知的过程
 *
 * 这里进行动态规划的代码是这样的：
 * 遍历物品数组相当于逐步增加可以选择放入背包中的物品，
 * 在其中的一个步骤中，遍历体积 v 从该步骤物品体积开始（也可以从0开始，不过小于
 * 该物品体积时，该物品肯定放不进去，没有意义，直接保持原来的值）到 v 最终到达背包总体积最优解的值，
 * 直到最后得到了可选物品包含了所有物品的情况下的最大值。该最大值就是答案。
 *
 * 这么说 i 就是物品数组的顺序。逐个往外拿。
 * ！！！关键点：讨论i的时候，i+1到n的物品已经不在可选物品堆中了。
 *
 * 物品数组中物品的顺序变化的话，只会影响遍历过程（逐步增加可能的物品的过程）中的值，
 * 不影响最终的最优解，最终得到的最优解都是一样的。
 *
 *
 *
 * 小册中：考虑到这道题中存在两个自变量，我们需要开辟的是一个二维数组【存二维数组，这个思路要记住】
 * 进而，说二维数组的时候，用 i-1 表示已经把 i 物品拿出来的情况的那一行。表示物品堆里没有 i 的情况那一行。
 * 不这样理解的话，难以往对物品数组的遍历上去转。
 * f(i, c) 不是 js 代码里的函数，而是表示该条件下的最优解的值，就是个值而已，也就是数组的一个值，dp[i][c]。
 * 这样，上面的状态转移方程就可以通过有初始值的数组进行遍历了。
 * 就这样，思维转到了数组上。
 *
 * !!!注意是这样转的：求对于每个物品在不同背包体积下的最优解，才能进行最优解之间的衔接。
 *                 题目本身只要求求某个体积下的最优解，而我们自己逐
 *                 个（自定为每次变化 1，这是假定物品体积都是整数没有小数 ）求不同体积下的最优解，
 *                 达到了衔接的目的。
 *
 * 遍历每一个物品，在该循环内，倒推对于这个物体来说，背包体积的变化对应的最优解的值。
 * 就像上面提到过的那样，小册里说的 "前 i 件" 那个地方有误导性，物体不讲顺序，
 * 只是要都试一下它对应的不同背包体积下的最优解。
 *
 * 2个变量，v是依赖 i 变化的，所以 v 放内层循环。
 *
 *
 * !!!在本题基础上进一步考虑优化下函数入参（这样便于理解 下面的 knapsack2 函数用这样的方式）：
 * 对于一堆给定的物体来说，不同体积的背包的解，已经定死了结果。
 * 所以更合适的理解方式下，可能入参应该更语义化成 items 这种格式，连 n 也不要
 * 而且对于给定的入参来说，当次执行函数时，背包体积 c 的值也是定死的。
 *
 *
 * 变量 v 从 item.volume 到 vTotal, 而不是从 0 开始，
 * 是因为背包体积比 item.volume 都小的话，本就容不下item，没有意义（就用初始值 -Infinity）。
 * 后面之所以是从 vTotal 到 item.volume 递减的方式，是因为可以用滚动数组的方式，就是要倒着来，因为是覆盖性的。
 *
 *
 * 假设从增量的角度考虑：
 * 假设背包中有 i，那么拿走i后，把体积减小 w[i]，能拿走的价值就是 value[i]，
 * 也能是体积相同但是价值比vaule[i]小的物体，
 * 如果是往包里塞东西的时候，在包里已经有 i 的基础上，包的体积又增加了 w[i], 而w[j] 等于 w[i],
 * 但是 value[j] < value[i], 那么假设这时候把包的总体积减小 w[j],拿出来的就是价值比 i 小的 j 了，
 *
 * 倒推法比较适合 人类 的思维模式。
 * ！！！注意：要预防上面的"增量陷阱"：即从开始向终点去思考。既不要从起点向终点思考，也不要从半截腰向终点思考。
 * ！！！不要用上面的角度从增量去考虑，需要从终点的容积 c 值全塞满去倒着考虑。
 * 注意 c 可能是绰绰有余包含所有的物品的一个值，也可能是刚好包含所有物品的一个值，也可能是包含不了所有物品的一个值
 *
 *
 * 上的注释的思路是错的！！看上面一大堆感叹号包围的地方。
 * 去看 knapsack2 的注释。
 *
 * 入参是物品的个数n 和背包的容量上限c，以及物品的体积w和价值value数组
 * 最优解 初始值给 0
 * res 初始值给 -Infinity
 */
funMap.knapsack1 = () => {
  let n = 3
  let vTotal = 23
  let vList = [7, 15, 7]
  let valueList = [1, 2, 3]

  function knapsack1(n, vTotal, vList, valueList) {
    // 这里数组的长度设置的 vTotal+1，因为下面初始化的 v 的值为 vTotal，
    // dp[vTotal] 想要为 0 而不是 undefined 的话，需要 dp 的 length 为 vTotal + 1
    const dp = new Array(vTotal + 1).fill(0)
    // res 用来记录所有组合方案中的最大值
    let res = -Infinity

    // i 不能从 1 开始，否则会把 w[0] 漏掉
    for (let i = 0; i < n; i++) {
      console.log(`======vList[${i}]: ${vList[i]}`)
      for (let v = vTotal; v >= vList[i]; v--) {
        // 写出状态转移方程
        console.log(
          `开始 v: ${v}, v-vList[i]: ${v - vList[i]}, dp[v]: ${
            dp[v]
          }  dp[v-vList[i]] + valueList[i]:${dp[v - vList[i]] + valueList[i]}`
        )
        dp[v] = Math.max(dp[v], dp[v - vList[i]] + valueList[i])
        console.log(`结束 dp[${v}]`, dp[v])

        // 即时更新最大值
        if (dp[v] > res) {
          res = dp[v]
        }
      }
    }
    return res
  }

  console.log(knapsack1(n, vTotal, vList, valueList))
}

// funMap.knapsack1()

/**
 * 这个是正确注释: knapsack2 函数的注释
 *
 * 题目描述：0-1背包问题
 * 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；
 * 每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的
 * 背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？
 *
 * 注意：每种物品都只有1件
 *
 * 同样体积和价值的物品只有一件
 * 如何才能使背包内的物品总价值最大？
 *
 * 小册中这段话需要改一下：
 * 现在，假设背包已满，容量已经达到了 c。站在c这个容量终点往后退，考虑从中取出一样物品，那么可能被取出的物品就有 i 种可能性。我们现在尝试表达“取出一件”这个动作对应的变化，我用 f(i, c) 来表示前 i 件物品恰好装入容量为 c 的背包中所能获得的最大价值。现在假设我试图取出的物品是 i，那么只有两种可能：
 * 应该改为
 * 现在，假设背包已达到最优解，容量已经达到了 c。我用 f(i, c) 来表示前 i 件物品恰好装入容量为 c 的背包中所能获得的最大价值。站在c这个容量终点往后退，考虑从中取出一样物品，那么可能被取出的物品有 i 种可能性。我们现在尝试表达“取出一件”这个动作对应的变化。现在假设我试图取出的物品是 i，那么只有两种可能：
 *
 * 1.不一定满，有可能是个超大背包吧，所以不应该说"背包已满"。
 * 2.语句顺序要变一下，否则就应该在那个地方说 "有 n 中可能性"。因为该处还没有引入概念 i 呢。
 * 3.i 就是物品数组中前 i 个中的最后一个物品（非代码语言，从 1 开始数）。
 * 4.在讨论 f(i, c) 的时候，就是假定物品数组中的 i+1 及后面的物品都还不在可选物品堆里。
 * 5.讨论 f(i, c) 时，就是假设取出的物品是 i（当前可选物品中的最后一个）。前面的那些物品的讨论顺序就不能再变。
 * 5.1.讨论 f(i, c) 时，前面的那些物品的讨论顺序就不能再变，虽然可以有不同的遍历顺序，不过对于同一个遍历顺序，之前的结果不能乱动。
 * 6.如果讨论物品 i-1 的话，讨论的是 f(i-1) 和 f(i-2) 的关系。而且物品 i 也还不在可选物品堆里。
 * 7.对于遍历来说，i 本身表示的意思，就是遍历讨论物品数组的时候，讨论任何一个物品的时候，该物品的序号。
 * 8.遍历的时候，通过不同体积下的解进行数值的衔接。
 *
 *
 *【这里要知道，对于给定的一堆物品，什么都定下了，在不同的背包体积下的最优解都有固定答案了】
 *【不要在思考的过程中考虑有别的规格的物品怎么办】
 *【倒推法，能推导出 f(n) 和 f(n-1) 之间的关系，能得到状态转移方程】
 *【再找到边界 f(0) f(1) 等。就可以任意决定用正向的动态规划还是倒着来的递归了。】
 *
 *
 * 讨论物品 i 时，有如下 2 种情况：
 * 1.假如最优解中就不包含 i 物品的话
 *  那么假如物品堆里本就没有这个物品（比如一个超大气球），也不影响最优解。
 *  f(可选物品堆, c) 等于 f(可选物品堆不包含 i 物品, c), 是背包体积 c 下的最大的值。
 *  f(i-2, c) 也不包含 i 物品，不过连 i-1 物品也直接不包含了, 这可不行，哈哈，所以是等于 f(i-1, c)。
 *  f(i, c) == f(i-1, c)
 *
 *  2.假如最优解中包含 i 物品的话
 *  用倒推法的时候，从最优解包里面拿出来 i 物品后,
 *  f(可选物品堆, c) - value[i] 是去掉从 i+1 到 n 的物品后的最优解方案的价值减去物品 i 的价值，
 *  和
 *  f(可选物品堆不包含 i 物品, c - w[i]), 是可选物品堆再刨除物品 i（即从 1 到 i -1 的物品）在背包体积 c - w[i] 下的最大的价值（该情况下的最优解）
 *  两者相等。即：
 *  f(i, c) - value[i] == f(i-1, c - w[i])
 *  进而：f(i, c) == f(i-1, c-w[i]) + value[i]
 *
 *  ！！！为什么前者等于后者（后者就是按照表示方式进行的表示，或者说该情况下的最优解就是用它表示。前者用了减号，就是从之前的最优解算出来的一个值）
 *  ！！！！原因：
 *  "那么取出这个动作就会带来价值量和体积量的减少" 这句话容易扰乱思路。
 *  就记住现在是包里有物品 i，即最优解中 包含 i 物品，即终点体积 c 下的最优解包含 i 物品。
 *  最优解没有 i 物品的情况已经在上面是另外一种情况。
 *
 *
 * 上面 knapsack1 的注释保留，是想留着之前的思维轨迹。那个注释的思维进入死胡同了一个月。
 *  注意：这里和之前的 knapsack1 的注释不一样的地方在于，
 *  讨论 i 物品的时候，从 i+1 到 n 的物品都还不在可选物品堆，在动态规划的过程中，还没有讨论到它们。
 *  可选物品堆的当前一步只跟前一步有关系。对于最终的最优解来说，过程不重要，不同的遍历顺序的过程可以不一样，
 *  不过最终的最优解一样。因为最终的可选物品都是全部物品，中间用 Math.max 的状态转移方程，
 *  就是在尝试各种方案。
 *  可以试试不同的遍历顺序，去查看打印过程和最终最优解。
 *  尝试后可以看到，不同物品遍历顺序时，过程中打印是不一样的，不过最终最优解是一样的。
 *
 *
 *
 *  把 i 物品拿走之后，背包 A 减少 i 的体积后剩下的体积 B 中，
 *  如果当前的最优解剩下的物品的组合不是价值最大的，而是有别能让价值更大的方案，
 *  那么在那个基础上把体积恢复背包 A 后，包中最沉的方案肯定不是原来的方案，
 *  就是那个更大的方案基础上再加上 i 物品了（虽然这个别的方案和原来的方案一样都包含 i 物品）。【记住现在一直在讨论的是情况 2，最终最优解中一定包含 i 物品】
 *  （有别的价值同等的方案倒是没关系，因为不影响等式本身，都是值一样的最优解的话，等式依然成立）
 *  可以想象家里有个塑料袋，最优解有洗发水，香皂，苹果等，把洗发水拿出来后，再把塑料袋压住，减少洗发水的体积，
 *  剩下的肯定是剩下体积下最重的，一个是别的物品不管大小，依然放不进去，
 *  而且也如上所说，不能换方案，否则加上物品i后最重的就不是原来的方案了。
 *
 *
 *  f(i, c) 在这 2 中情况下有 2 个可能的值，那么结合 2 种情况，得到了状态转移方程：
 *  f(i, c) = Math.max(f(i-1, c), f(i-1, c-w[i]) + value[i])
 *
 *
 * 然后就是不断把物品数组中的物品加入可选物品堆，每次对那个加入物体都运用状态转移方程，即对可选物品堆的这个最后加入的物品讨论上面 2 种情况。
 * 这么说，i的遍历顺序可以正序、倒序、甚至随机跳着来，for循环只是方便遍历而已。
 * 不过不管怎么遍历，遍历过程中已经加入可选物品堆的东西不能再拿出来，直到最后加入了物品数组中的所有物品。
 * 小册的解法里面就是让 i 从 0 开始计数的。
 *
 *
 *
 * 动态规划的关键：最优子结构+自底向上从已知推导找出未知。
 * 还是爬楼梯的结论，难点在于状态转移方程不好确定，已知状态不明显（这里是需要自己设置初始值，以及求出各个体积下的解，虽然题目只是要求求出某个体积下的解）。
 *
 * 在上面的爬楼梯问题 climbStairs 已经总结了：
 * 基于树形思维思考是自顶向下，从未知最终拆回到已知的过程
 * 动态规划是自底向上，从已知一步步向前推导找出未知的过程
 * 小册代码走的是动态规划的路线。
 *
 * 这里进行动态规划的代码是这样的：
 * 遍历物品数组相当于逐步增加可以选择放入背包中的物品，
 * 在其中的一个步骤中，遍历体积 v 从该步骤物品体积开始（也可以从0开始，不过小于
 * 该物品体积时，该物品肯定放不进去，没有意义，直接保持原来的值）到 v 最终到达背包总体积最优解的值，
 * 直到最后得到了可选物品包含了所有物品的情况下的最大值。该最大值就是答案。
 *
 * ！！！关键点：讨论i 即 f(i, 某某)的时候，i+1到n的物品还不在可选物品堆中。
 *
 * 物品数组中物品的顺序变化的话，只会影响遍历过程（逐步增加可选的物品的过程）中的值，
 * 不影响最终的最优解，最终得到的最优解都是一样的。
 *
 *
 *
 * 小册中：考虑到这道题中存在两个自变量，我们需要开辟的是一个二维数组【存二维数组，这个思路要记住】
 * 进而，说二维数组的时候，用 i-1 表示已经把 i 物品拿出来的情况的那一行。表示物品堆里没有 i 的情况那一行。
 * 不这样理解的话，难以往对物品数组的遍历上去转。
 * f(i, c) 不是 js 代码里的函数，而是表示该条件下的最优解的值，就是个值而已，也就是数组的一个值: dp[i][c]。
 * 这样，上面的状态转移方程就可以通过有初始值的数组进行遍历了。
 * 就这样，思维转到了数组上。
 *
 * !!!注意是这样转的：求对于每个物品在不同背包体积下的最优解，才能进行最优解之间的衔接。
 *                 题目本身只要求求某个体积下的最优解，而我们自己逐
 *                 个（自定为每次变化 1，这是假定物品体积都是整数没有小数 ）求不同体积下的最优解，
 *                 达到了衔接的目的。
 *
 * 遍历每一个物品，在该循环内，倒推对于这个物体来说，背包体积的变化对应的最优解的值。
 *
 * 2 个变量，v是依赖 i 变化的，所以 v 放内层循环。
 *
 *
 * !!!在本题基础上进一步考虑优化下函数入参（这样便于理解 下面的 knapsack3 函数用这样的方式）：
 * 对于一堆给定的物体来说，不同体积的背包的解，已经定死了结果。
 * 所以更合适的理解方式下，可能入参应该更语义化成 items 这种格式，连 n 也不要
 * 而且对于给定的入参来说，当次执行函数时，背包体积 c 的值也是定死的。
 *
 *
 * 变量 v 从 item.volume 到 vTotal, 而不是从 0 开始，
 * 是因为背包体积比 item.volume 都小的话，本就容不下item，没有意义（就用初始值 0）。
 * 后面之所以是从 vTotal 到 item.volume 递减的方式，是因为可以用滚动数组的方式，就是要倒着来，因为是覆盖性的。
 *
 *
 * 增量思维陷阱：假设从增量的角度考虑
 * 假设背包中有 i，那么拿走i后，把体积减小 w[i]，能拿走的价值就是 value[i]，
 * 也能是体积相同但是价值比vaule[i]小的物体，
 * 如果是往包里塞东西的时候，在包里已经有 i 的基础上，包的体积又增加了 w[i], 而w[j] 等于 w[i],
 * 但是 value[j] < value[i], 那么假设这时候把包的总体积减小 w[j],拿出来的就是价值比 i 小的 j 了，
 *
 * 倒推法比较适合 人类 的思维模式。
 * ！！！注意：要预防上面的"增量陷阱"：即从开始向终点去思考状态转移方程。既不要从起点向终点思考，也不要从半截腰向终点思考。
 * ！！！不要用上面的角度从增量去考虑，需要从终点的容积 c 值全塞满去倒着考虑。
 * 注意 c 可能是绰绰有余包含所有的物品的一个值，也可能是刚好包含所有物品的一个值，也可能是包含不了所有物品的一个值
 *
 *
 * 入参是物品的个数n 和背包的容量上限c，以及物品的体积w和价值value数组
 * 代码的写法和 knapsack1 一样，就是注释不一样。
 * 最优解 初始值给 0
 * res 初始值给 -Infinity
 */
funMap.knapsack2 = () => {
  let n = 3
  let vTotal = 23
  let vList = [7, 15, 7]
  let valueList = [4, 2, 3]

  function knapsack2(n, vTotal, vList, valueList) {
    // 这里数组的长度设置的 vTotal+1，因为下面初始化的 v 的值为 vTotal，
    // dp[vTotal] 想要为 0 而不是 undefined 的话，需要 dp 的 length 为 vTotal + 1
    const dp = new Array(vTotal + 1).fill(0)
    // res 用来记录所有组合方案中的最大值
    let res = -Infinity

    // i 不能从 1 开始，否则会把 w[0] 漏掉
    for (let i = 0; i < n; i++) {
      // 测试更换遍历物品的顺序，过程中的打印值会不一样，不过最终解一样
      // for(let i=n-1; i>=0; i--) {
      console.log(`======vList[${i}]: ${vList[i]}`)
      for (let v = vTotal; v >= vList[i]; v--) {
        // 写出状态转移方程
        console.log(
          `开始 v: ${v}, v-vList[i]: ${v - vList[i]}, dp[v]: ${
            dp[v]
          }  dp[v-vList[i]] + valueList[i]:${dp[v - vList[i]] + valueList[i]}`
        )
        dp[v] = Math.max(dp[v], dp[v - vList[i]] + valueList[i])
        console.log(`结束 dp[${v}]`, dp[v])

        // 即时更新最大值
        if (dp[v] > res) {
          res = dp[v]
        }
      }
    }
    return res
  }

  console.log(knapsack2(n, vTotal, vList, valueList))
}

// funMap.knapsack2()

/**
 * 背包问题考虑优化下函数入参后的写法
 */
funMap.knapsack3 = () => {
  let vTotal = 23

  let items = [
    {
      volume: 7,
      value: 4,
    },
    {
      volume: 15,
      value: 2,
    },
    {
      volume: 7,
      value: 3,
    },
  ]

  function knapsack3(vTotal, items) {
    let len = items.length
    // 这里数组的长度设置的 vTotal+1，因为下面初始化的 v 的值为 vTotal，
    // dp[vTotal] 想要为 0 而不是 undefined 的话，需要 dp 的 length 为 vTotal + 1
    const dp = new Array(vTotal + 1).fill(0)
    // res 用来记录所有组合方案中的最大值
    let res = -Infinity

    // i 不能从 1 开始，否则会把 w[0] 漏掉
    for (let i = 0; i < len; i++) {
      // 测试更换遍历物品的顺序，过程中的打印值会不一样，不过最终解一样
      // for(let i = len-1; i >=0 ; i--) {
      let item = items[i]
      console.log(`====== ${i} item.volume: ${item.volume}`)
      for (let v = vTotal; v >= item.volume; v--) {
        // 写出状态转移方程
        console.log(
          `开始 v: ${v}, v-item.volume: ${v - item.volume}, dp[v]: ${
            dp[v]
          }  dp[v-item.volume] + item.value:${dp[v - item.volume] + item.value}`
        )
        dp[v] = Math.max(dp[v], dp[v - item.volume] + item.value)
        console.log(`结束 dp[${v}]`, dp[v])

        // 即时更新最大值
        if (dp[v] > res) {
          res = dp[v]
        }
      }
    }
    return res
  }

  console.log(knapsack3(vTotal, items))
}

// funMap.knapsack3()

/**
 * 背包问题留下怎么选择物品的足迹
 */
funMap.knapsack4 = () => {
  let vTotal = 23

  let items = [
    {
      volume: 7,
      value: 4,
    },
    {
      volume: 15,
      value: 2,
    },
    {
      volume: 7,
      value: 3,
    },
  ]

  function knapsack4(vTotal, items) {
    let len = items.length
    // 这里数组的长度设置的 vTotal+1，因为下面初始化的 v 的值为 vTotal，
    // dp[vTotal] 想要为 0 而不是 undefined 的话，需要 dp 的 length 为 vTotal + 1
    const dp = []

    for (let i = 0; i < vTotal + 1; i++) {
      dp[i] = {
        value: 0,
        bagItems: [],
      }
    }

    // res 用来记录所有组合方案中的最大值
    let res = {
      value: -Infinity,
    }

    // i 不能从 1 开始，否则会把 w[0] 漏掉
    for (let i = 0; i < len; i++) {
      // 测试更换遍历物品的顺序，过程中的打印值会不一样，不过最终解一样
      // for(let i = len-1; i >=0 ; i--) {
      let item = items[i]
      console.log(`====== ${i} item.volume: ${item.volume}`)
      for (let v = vTotal; v >= item.volume; v--) {
        // 写出状态转移方程
        console.log(
          `开始 v: ${v}, v-item.volume: ${v - item.volume}, dp[v].value: ${
            dp[v].value
          }  dp[v-item.volume].value + item.value:${
            dp[v - item.volume].value + item.value
          }`
        )
        // 留下足迹的话，这里就不能用 Math.max 了，而是要对比下
        // dp[v] = Math.max(dp[v], dp[v-item.volume] + item.value)

        let valAfterUseItem = dp[v - item.volume].value + item.value
        if (dp[v].value < valAfterUseItem) {
          dp[v].value = valAfterUseItem
          // i 物品对这个体积 v 可用的话，就覆盖原来的取物痕迹
          dp[v].bagItems = dp[v - item.volume].bagItems.concat([i])
        }

        console.log(`结束 dp[${v}]`, dp[v])

        // 即时更新最大值
        if (dp[v].value > res.value) {
          res = dp[v]
        }
      }
    }
    return res
  }

  console.log(knapsack4(vTotal, items))
}

// funMap.knapsack4()

/**
 * 最长上升子序列
 * 题目描述：给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 示例:
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 *
 *
 * =========================
 * 关键思想：那就是关注到序列中元素的索引，尝试寻找不同索引对应的元素之间的关系、并以索引为线索去构造一维或二维的状态数组。
 * 只要你把握住了“重叠子问题”和“最优子结构”两个关键特征，把握住了动态规划的核心解题逻辑
 *
 */
funMap.lengthOfLIS = () => {
  let arr = [10, 9, 2, 5, 3, 7, 101, 18]
  function lengthOfLIS(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return 0
    }

    let res = 1
    let indexArr = new Array(arr.length).fill(1)

    // 0 不用算，就是1个
    for (let i = 1; i < arr.length; i++) {
      let item = arr[i]
      for (let j = 0; j < i; j++) {
        if (item > arr[j]) {
          indexArr[i] = Math.max(indexArr[i], indexArr[j] + 1)
        }
      }

      res = Math.max(res, indexArr[i])
    }

    return res
  }

  console.log(lengthOfLIS(arr))
}

// funMap.lengthOfLIS()

// 微软系列开始
/**
 * 最长回文子串问题
 * 题目描述：给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 示例1:
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 *
 * 示例 2：
 * 输入: "cbbd"
 * 输出: "bb"
 *
 * =========================
 * 命题关键字：字符串、动态规划
 *
 *
 * 知道了 dp[i][j] 和 dp[i + 1][j - 1] 之间的状态转移关系以后怎么从已知到未知进行动态规划？
 * 自己的方案：把 i 从后往前遍历，把 j 从前往后遍历
 *
 */
funMap.longestPalindrome = () => {
  let str = 'aaabbac'

  function longestPalindrome(str) {
    let dp = []

    // 初始化状态为二维数组
    for (let i = 0; i < str.length; i++) {
      // 初始化 i j 相等时为 1，自己一个字符肯定回文啦
      dp[i] = []
      dp[i][i] = 1
    }

    // 如果只要长度的话，也可以直接用 res=1,然后不断更新最长长度
    // let res = 1
    let res = {
      i: 0,
      j: 0,
    }

    // for (let i = 0; i < str.length; i++) {
    // i 从后往前遍历，才可以拿到 dp[i + 1][j - 1] 的值啊
    for (let i = str.length - 1; i >= 0; i--) {
      // j 从 i 右侧开始，因为左侧不可能，而且等于 i 本身时也已经在上面初始化过了
      for (let j = i + 1; j < str.length; j++) {
        console.log(`i ${i} j ${j}`)
        if (str[i] === str[j]) {
          if (i + 1 <= j - 1) {
            dp[i][j] = dp[i + 1][j - 1]
          } else {
            dp[i][j] = 1
          }
        } else {
          dp[i][j] = 0
        }

        if (dp[i][j] === 1) {
          // 注意不要写代码时候的小失误，比如写成下面这样
          // res = Math.max(1, j - 1 + 1)
          // res = Math.max(res, j - i + 1)
          if (res.j - res.i < j - i) {
            res = { i, j }
          }
        }
      }
    }

    return res
  }

  console.log(longestPalindrome(str))
}

// funMap.longestPalindrome()

/**
 * 最长回文子串问题
 * 小册上的方案：限定子串的长度，逐个求状态，然后增加子串的长度，再逐个求状态
 *
 */
funMap.longestPalindrome2 = () => {
  let str = 'aaabbac'

  function longestPalindrome2(str) {
    let dp = []
    let len = str.length

    // 初始化状态为二维数组
    for (let i = 0; i < len; i++) {
      // 初始化 i j 相等时为 1，自己一个字符肯定回文啦
      dp[i] = []
      dp[i][i] = 1
    }

    // 如果只要长度的话，也可以直接用 res=1,然后不断更新最长长度
    // let res = 1
    let res = {
      i: 0,
      j: 0,
    }

    // n 表示当前求解的子串的长度
    // 为 1 的时候就是一个字母，已经在上面初始化为1，所以从 2 开始
    for (let n = 2; n <= len; n++) {
      let item = str[n]
      for (let i = 0; i <= len - n; i++) {
        let j = i + n - 1

        if (str[i] === str[j]) {
          if (i + 1 <= j - 1) {
            dp[i][j] = dp[i + 1][j - 1]
          } else {
            // 只有 n 为 2 的时候才会到这里
            dp[i][j] = 1
          }
        } else {
          dp[i][j] = 0
        }

        if (dp[i][j] && res.j - res.i < j - 1) {
          res = { i, j }
        }
      }
    }

    return res
  }

  console.log(longestPalindrome2(str))
}

// funMap.longestPalindrome2()

/**
 * 从前序（先序）与中序遍历序列构造二叉树
 * 题目描述：根据一棵树的前序遍历与中序遍历构造二叉树。
 * 注意: 你可以假设树中没有重复的元素。
 *
 * 例如，给出
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 *
 * 返回如下的二叉树：
 *
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15  7
 *
 * 命题关键字：二叉树、前序、中序、遍历序列特征、递归
 *
 * ----------------------
 * 先序遍历的第一个元素一定是根节点
 * 中序遍历根节点的左侧肯定是左子树，右侧肯定是右子树
 * 中序遍历根节点所在的索引 k 等于先序遍历左子树所在的最后一个元素的索引
 *
 * 自己的方案：通过 slice 数组
 *
 */
funMap.buildTree = () => {
  const preorder = [3, 9, 20, 15, 7]
  const inorder = [9, 3, 15, 20, 7]

  function buildTree(preorder, inorder) {
    if (!preorder.length || !inorder.length) {
      return null
    }

    const root = {}

    root.val = preorder[0]
    let k = inorder.indexOf(preorder[0])

    // 这里容易不判断 k，结合下面可能的错误方式可能会导致无限递归，slice
    if (k > -1) {
      // 下面可能限制错 slice 的范围
      root.left = buildTree(preorder.slice(1, k + 1), inorder.slice(0, k))
      root.right = buildTree(preorder.slice(k + 1), inorder.slice(k + 1))
    }

    return root
  }

  console.log(buildTree(preorder, inorder))
}

// funMap.buildTree()

/**
 * 从前序（先序）与中序遍历序列构造二叉树
 *
 * 小册的方案：通过数组下标定位，优势：不占用额外空间
 *
 */
funMap.buildTree2 = () => {
  const preorder = [3, 9, 20, 15, 7]
  const inorder = [9, 3, 15, 20, 7]

  function buildTree2(preorder, inorder) {
    function bdt(preL, preR, inL, inR) {
      if (preL > preR || inL > inR) {
        return null
      }

      let rootVal = preorder[preL]
      let root = {
        val: rootVal,
      }
      let k = inorder.indexOf(rootVal)

      root.left = bdt(preL + 1, k, inL, k - 1)
      root.right = bdt(k + 1, preR, k + 1, inR)

      return root
    }

    let len = preorder.length
    return bdt(0, len - 1, 0, len - 1)
  }

  console.log(buildTree2(preorder, inorder))
}

// funMap.buildTree2()

/**
 * 复制带随机指针的链表
 * 题目描述：给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。要求返回这个链表的 深拷贝。
 * 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
 *
 * 命题关键字：数据结构、链表、哈希表
 *
 * ------------------
 * 自己做一遍
 *
 */
funMap.copyRandomList = () => {
  function Node(val, next = null, random = null) {
    this.val = val
    this.next = next
    this.random = random
  }

  let list = {
    val: 7,
    next: {
      val: 13,
      next: {
        val: 11,
        next: {
          val: 10,
          next: {
            val: 1,
          },
        },
      },
    },
  }

  // list.random = null
  // list.next.random = list
  // list.next.next.random = list.next.next.next.next
  // list.next.next.next.random = list.next.next
  // list.next.next.next.next.random = list

  console.log(JSON.stringify(list))

  function copyRandomList(list) {
    let cur = list
    let dummy = {}
    let copy = {}

    dummy.next = copy

    let _map = new Map()

    while (cur) {
      copy.val = cur.val
      _map.set(cur, copy)

      // 避免最后一个位置出现 {}
      if (cur.next) {
        copy.next = {}
        copy = copy.next
      }

      cur = cur.next
    }

    cur = list
    copy = dummy.next

    while (cur) {
      copy.random = _map.get(cur.random)
      cur = cur.next
      copy = copy.next
    }

    return dummy.next
  }

  console.log(JSON.stringify(copyRandomList(list)))
}

// funMap.copyRandomList()

// 谷歌真题系列
/**
 * 岛屿数量问题
 * 题目描述：给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 *
 * 示例 1:
 * 输入:
 * 11110
 * 11010
 * 11000
 * 00000
 *
 * 输出: 1
 *
 * 示例 2:
 * 输入:
 * 11000
 * 11000
 * 00100
 * 00011
 * 输出: 3
 * 解释: 每座岛屿只能由水平和/或竖直方向上相邻的陆地连接而成。
 *
 *
 * 命题关键字：模拟、DFS
 *
 * ------------------
 * 每次搜寻的时候，搜寻到一个岛屿，然后就把所有相连的陆地变成 0，
 * 这样在后续遍历到该位置的时候也会因为成为了边界二及时退出，不会有性能问题
 *
 */
funMap.numIslands = () => {
  const arr = [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ]

  function numIslands(arr) {
    let count = 0
    // 上右下左
    let moveX = [0, 1, 0, -1]
    let moveY = [-1, 0, 1, 0]

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j]) {
          dfs(i, j)
          count++
        }
      }
    }

    // 一旦一个地方是1，那么就沿着他自己的四个方向递归的去把所有相连的岛屿变成0，直到碰到边界
    // 然后在上面的两层 for 循环中遍历所有的点。因为 dfs 的作用主要就是一次刷掉一个岛屿，有点像扫雷游戏的效果
    function dfs(i, j) {
      // 同时处理了水域和边界，这里用 arr[i].length 兼容了 异型 的地图
      // 这里处理边界主要是因为下面会自己递归自己，而不是为了上面双层 for 循环内的第一次 if 内的执行
      if (
        i < 0 ||
        i >= arr.length ||
        j < 0 ||
        j >= arr[i].length ||
        !arr[i][j]
      ) {
        return
      }

      // 放在下面 for 的前面，避免无限循环到自己
      arr[i][j] = 0

      // 把所有相连的岛屿变成 0
      for (let k = 0; k < 4; k++) {
        dfs(i + moveX[k], j + moveY[k])
      }
    }

    return count
  }

  console.log(numIslands(arr))
}

// funMap.numIslands()

/**
 * 扫地机器人问题
 * 题目描述：房间（用格栅表示）中有一个扫地机器人。格栅中的每一个格子有空和障碍物两种可能。
 * 扫地机器人提供4个API，可以向前进，向左转或者向右转。每次转弯90度。
 * 当扫地机器人试图进入障碍物格子时，它的碰撞传感器会探测出障碍物，使它停留在原地。
 * 请利用提供的4个API编写让机器人清理整个房间的算法。
 *
 * interface Robot {
 *  // 若下一个方格为空，则返回true，并移动至该方格
 *  // 若下一个方格为障碍物，则返回false，并停留在原地
 *  boolean move();
 *
 *  // 在调用turnLeft/turnRight后机器人会停留在原位置
 *  // 每次转弯90度
 *  void turnLeft();
 *  void turnRight();
 *
 *  // 清理所在方格
 *  void clean();
 * }
 *
 * 示例:
 * 输入:
 * room = [
 * [1,1,1,1,1,0,1,1],
 * [1,1,1,1,1,0,1,1],
 * [1,0,1,1,1,1,1,1],
 * [0,0,0,1,0,0,0,0],
 * [1,1,1,1,1,1,1,1]
 * ],
 * row = 1,
 * col = 3
 * 解析: 房间格栅用0或1填充。0表示障碍物，1表示可以通过。 机器人从row=1，col=3的初始位置出发。在左上角的一行以下，三列以右。
 *
 * 注意:
 * 输入只用于初始化房间和机器人的位置。你需要“盲解”这个问题。换而言之，你必须在对房间和机器人位置一无所知的情况下，只使用4个给出的API解决问题。
 * 扫地机器人的初始位置一定是空地。
 * 扫地机器人的初始方向向上。
 * 所有可抵达的格子都是相连的，亦即所有标记为1的格子机器人都可以抵达。
 * 可以假定格栅的四周都被墙包围。
 *
 * 命题关键字：模拟、DFS
 * ----------------------
 * 小册的代码是不可运行的，只能脑补。
 * 不过小册通过一个 Set 来记录清扫过的格子，可以借鉴
 *
 *
 * 如何用代码表示让机器人前进：改变索引+执行函数
 * 四个方向尝试，直到不断回退到原点后尝试完毕后，就意味着所有地方都清扫到了
 * 只不过被清扫过的地方，会在后面反复的 move 过去看看有没有清扫过
 *
 */
funMap.cleanRoom = () => {
  const room = [
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ]

  function cleanRoom(room, row, col) {
    let moveX = [-1, 0, 1, 0]
    let moveY = [0, 1, 0, -1]

    class Robot {
      direction = 0
      constructor(row, col) {
        this.row = row
        this.col = col
        // 记录清扫过的地方
        this.roomSet = new Set()
      }
      move() {
        let newRow = this.row + moveX[this.direction]
        let newCol = this.col + moveY[this.direction]

        console.log('newRow, newCol', newRow, newCol)

        // 这里不要忘记判断小于 0 的边界情况
        if (
          newRow < 0 ||
          newRow >= room.length ||
          newCol < 0 ||
          newCol >= room[newRow].length ||
          room[newRow][newCol] === 0
          // 不能在这里加上对已经清扫过的地方的判断，否则回不了原位
          // 而是在 dfs 函数中去判断，可以 move 到已经清扫的格子，不过直接函数调用栈 return 掉即可。
          // this.roomSet.has(`${newRow}+${newCol}`)
        ) {
          return false
        }

        this.row = newRow
        this.col = newCol
        return true
      }
      clean() {
        this.roomSet.add(`${this.row}+${this.col}`)
      }

      turnLeft() {
        let newDirection = this.direction - 1
        this.direction = newDirection < 0 ? 3 : newDirection
      }
      turnRight() {
        let newDirection = this.direction + 1
        this.direction = newDirection > 3 ? 0 : newDirection
      }
    }

    // 初始化机器人的位置
    let rob = new Robot(row, col)

    /**
     * 参数都放在 robot 机器人身上了
     * 四处尝试，直到不断回退到原点后尝试完毕后，就意味着所有地方都清扫到了
     * 只不过被清扫过的地方，会在后面反复的 move 过去看看有没有清扫过
     * @param direction
     */
    function dfs() {
      console.log('`${rob.row}+${rob.col}`', `${rob.row}+${rob.col}`)
      let room = `${rob.row}+${rob.col}`

      // 如果这个位置已经清扫过，直接返回，那有可能初始化时就放在一个已经清扫过的地方吗？
      // 现实中会，这里不会，因为 rob.roomSet 刚开始是空的
      if (rob.roomSet.has(room)) {
        return
      }

      rob.clean(room)

      // 直接遍历4个方向，这里利用了代码的同步特点
      // 刚开始写是想着用一个变量记录尝试次数，后来发现分不清记录不同步骤的尝试次数了，
      // 直接对每一个地方的4个方向进行遍历吧

      for (let i = 0; i < 4; i++) {
        // 对某个方向进行尝试
        if (rob.move()) {
          /**
           * 能进到这，说明已经移动到下一个格子了（只是该格子可以是清扫过或未清扫过的，move 动作不判断是否清扫过）
           * dfs 中会直接先进行清扫，而且清扫过的地方会在刚开始直接 return 掉，就会退到父级函数调用栈中去回到原处，
           * 是通过不断回退到上一步然后去尝试它的4个方向做到清扫所有地方的，
           *
           * 清扫过的地方被重复经过有2种情况：
           *    move 过去站在格子上，不过在 dfs 发现格子清扫过了之后，dfs 函数 return；
           *    主动后退经过它；
           *
           * 假如经过某个格子 A 的时候它的旁边有个格子 B 可以打扫，不过在随后的遍历中因为路径的阻挡打扫不到了，
           * 那也会在不断回退，直到回退到 A 的时候，进行下面的的不断转向尝试的时候，最终做到去清扫到 B。
           */
          dfs()
          rob.turnLeft()
          rob.turnLeft()
          rob.move()
          rob.turnRight()
          rob.turnRight()
        }

        // 尝试完后，向右转，之后的交给下个循环
        rob.turnRight()
      }
    }

    dfs()
    return rob.roomSet
  }

  console.log(cleanRoom(room, 1, 3))
}

// funMap.cleanRoom()

/**
 * 合并区间问题
 * 题目描述：给出一个区间的集合，请合并所有重叠的区间。
 * 示例 1:
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 * 示例 2:
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 * 命题关键字：数学问题、数组
 * -----------------
 * 区间集合是有序的吗: 不一定
 *
 * 对于区间类问题，尝试以区间内的第一个元素为索引进行排序，往往可以帮助我们找到问题的突破点
 *
 */
funMap.mergeOverlappedArray = () => {
  const intervals = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]

  function mergeOverlappedArray(invervals) {
    if (!invervals || !invervals.length) {
      return
    }

    invervals.sort((a, b) => a[0] - b[0])

    let res = [invervals[0]]

    for (let i = 1; i < invervals.length; i++) {
      let item = invervals[i]
      let prev = res[res.length - 1]

      if (prev[1] > item[0]) {
        // 要兼容包含的情况，用 Math.max
        prev[1] = Math.max(prev[1], item[1])
      } else {
        res.push(item)
      }
    }

    return res
  }

  console.log(mergeOverlappedArray(intervals))
}

// funMap.mergeOverlappedArray()

// 腾讯真题
/**
 * 寻找二叉树的最近公共祖先
 * 题目描述：给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。最近公共祖先节点可以为节点本身。
 *
 * 命题关键字：二叉树、递归
 *            3
 *         /     \
 *       5        1
 *     /  \      / \
 *    6    2    0   8
 *        / \
 *       7  4
 *
 * ------------------------
 * 命题关键字：二叉树、递归
 *
 * 怎么算上报：一层层往上透传返回目标节点（如果到了边界 null，那就一层层往上透传返回 null）
 *
 */
funMap.lowestCommonAncestor = () => {
  let root = {
    val: 3,
    left: {
      val: 5,
      left: {
        val: 6,
      },
      right: {
        val: 2,
        left: {
          val: 7,
        },
        right: {
          val: 4,
        },
      },
    },
    right: {
      val: 1,
      left: {
        val: 0,
      },
      right: {
        val: 8,
      },
    },
  }

  function lowestCommonAncestor(root, val1, val2) {
    function dfs(root) {
      /**
       * 找到空或目标节点就是边界，
       * 如果找的是 5 6，
       * 到 5 这里直接就不再往下遍历了，而且 6 如果是它的子树上的某个节点，那本身结果就应该是 5。
       * 这就进入了 节点 3 的 return left || right 的逻辑，结果 right 这时是 null，
       * 那就返回了 5。
       *
       * 如果找的是 6 2，就进入了 5 的 if (left && right) 的逻辑，就返回了 5，
       * 然后又回到了 3 的 return left || right 的逻辑，结果 right 这时是 null，
       * 那就返回了 5。
       *
       * 最终递归栈都会回到根节点，除非本身目标就包含根节点，如求：3, 5 的最近共同祖先，那到 3 就直接返回了。
       */
      if (!root || root.val === val1 || root.val === val2) {
        return root
      }

      // 注意这里传入参数的时候 root.left root.right 要写对
      let left = dfs(root.left)
      let right = dfs(root.right)

      // 左子树和右子树都有，这里刚好是交叉点
      if (left && right) {
        return root
      }

      // 这里返回啥？本能反应是返回 root，那岂不是上面的判断和遍历就没用了，
      // 所以应该返回 dfs 的结果，远远的传上去，
      // 让递归栈回退到上面的时候再判断
      return left || right
    }

    return dfs(root).val
  }

  console.log(lowestCommonAncestor(root, 5, 6))
}

// funMap.lowestCommonAncestor()

/**
 * 寻找两个正序数组的中位数
 * 题目描述：给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
 * 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 你可以假设 nums1 和 nums2 不会同时为空。
 *
 * 示例 1:
 * nums1 = [1, 3]
 * nums2 = [2]
 * 则中位数是 2.0
 *
 * 示例 2:
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 则中位数是 (2 + 3)/2 = 2.5
 * ------------------------
 * 命题关键字：二分思想、数学问题
 *
 * 两个数组总长度为偶数时的中位数，按照定义需要取中间两个元素的平均值, s1 s2 的和为总长度的一半，
 * 结果为：：(左侧较大的+右侧较小的值)/2
 *
 * 两个数组总长度为奇数时的中位数，按照定义需要取中间一个元素 s1 s2 的和为总长度的一半向下取整
 * 结果为：：右侧较小的值
 *
 * 在已知 s1 s2 应该是什么样的值的时候，如何计算中位数是显而易见的。
 *
 *
 * 但难点是，小册上 s1 s2 如何确定边界？即，分割点如何确定？
 *
 * 分割点 s1 s2 的可选方式是是唯一的，下面分为偶数、奇数去讨论
 * 偶数的情况，如: 1 2 3 4 5 6 7 8 9 10
 * s1 + s2 = 5
 * 1 3 5 | 7 9
 *   2 4 | 6 8 10
 * 左侧取5，右侧取6
 *
 * s1 + s2 = 5
 *   1 3 | 5 7 9
 * 2 4 6 | 8 10
 * 这种分隔就不行，左侧的值要统统小于右侧的值
 *
 *
 * 奇数的情况，如: 1 2 3 4 5 6 7
 * s1 + s2 = 3
 *   1 | 3  5 7
 * 2 4 | 6
 * 这种分隔就不行，左侧的值要统统小于右侧的值
 *
 * s1 + s2 = 3
 * 1 3 | 5 7
 *   2 | 4 6
 * 取右侧较小值4
 *
 *
 * s1 + s2 = 3
 * 1 3 5 7
 * 2 4 6 |
 * 这就不行了，右边没东西？
 *
 * 边界的结论：左侧的最大值要小于右侧的最小值；而且分割线不能在边界上
 *
 */
funMap.findMedianSortedArrays = () => {
  // let nums1 = [1, 3, 5, 7, 9]
  // let nums2 = [2, 4, 6, 8, 10]

  let nums1 = [1, 3, 5, 7]
  let nums2 = [2, 4, 6]

  function findMedianSortedArrays(nums1, nums2) {
    let len1 = nums1.length
    let len2 = nums2.length
    // 奇数
    let isOdd = (len1 + len2) % 2 !== 0
    let sLen = Math.floor((len1 + len2) / 2)

    console.log('isOdd', isOdd)

    // 这里约定 i 是用于 nums1 数组，i < len1 是防止分隔到边缘
    // i 就相当于 s1，表示长度，而不是表示下标
    for (let i = 1; i < sLen && i < len1; i++) {
      let j = sLen - i

      let leftMax = Math.max(nums1[i - 1], nums2[j - 1])
      let rightMin = Math.min(nums1[i], nums2[j])

      console.log('leftMax, rightMin', leftMax, rightMin)

      // 边界，跳过去，试下一个分隔方式
      if (leftMax > rightMin) {
        continue
      }

      if (isOdd) {
        return rightMin
      } else {
        return (leftMax + rightMin) / 2
      }
    }
  }

  console.log(findMedianSortedArrays(nums1, nums2))
}

funMap.findMedianSortedArrays()
