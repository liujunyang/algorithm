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
    let nums1 = [1,2,3]
    let nums2 = [2,5,6]

    function merge (nums1, nums2) {
        let i = nums1.length - 1
        let j = nums2.length - 1
        // 这里容易把 k 搞错，k应该是合成后的数组的最后一个位置的下标
        let k = i + j + 1
        console.log(i,j,k)

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

        console.log(i,j,k)

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

        nums.sort((a, b) => a-b)
        // console.log(nums)

        for (let i = 0; i < len; i++) {
            let j = i + 1
            let k = len - 1

            // 把数组【改为有序数组】后，去掉相邻重复的 nums[i] ，因为这两个相同的话，后面能得到的结果话一定是和之前一样的
            // 比如 -1 -1 2，第一个 -1 能得到 -1 -1 2 的结果，第二个 -1 虽然得不到 -1 -1 2 的结果
            // 但是后面再得到的结果就和第一个 -1 一样了，所以遇到第二个 -1，就直接跳过即可
            if (i > 0 && nums[i] === nums[i-1]) {
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
                while (j < k && nums[j] === nums[j-1]) {
                    j++
                }

                // 右侧重复的话继续往左走
                while (j < k && nums[k] === nums[k+1]) {
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

        for (let i = 0; i <len/2; i++) {
            if (str[i] !== str[len-i-1]) {
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
                return validPalindrome(str.slice(i+1, j+1), canDelNum - 1) || validPalindrome(str.slice(i, j), canDelNum - 1)
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

    wordDirectionary.prototype.addWord = function(word) {
        let len = word.length

        if (this.words[len]) {
            this.words[len].push(word)
        } else {
            this.words[len] = [word]
        }
    }

    wordDirectionary.prototype.searchWord = function(word) {
        let len = word.length

        if (!this.words[len]) {
            return false
        } else {
            if (word.includes('.')) {
                let re = new RegExp(word)

                return this.words[len].some(item => {
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
        let max =  Math.pow(2,31) - 1
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
                val: 4
            }
        }
    }

    let l2 = {
        val: 1,
        next: {
            val: 3,
            next: {
                val: 4
            }
        }
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
                        val: 4
                    }
                }
            }
        }
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
                        val: 3
                    }
                }
            }
        }
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
                        val: 3
                    }
                }
            }
        }
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
                        val: 3
                    }
                }
            }
        }
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
                        val: 3
                    }
                }
            }
        }
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
                        val: 3
                    }
                }
            }
        }
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
            for (let j = 1; j < arr.length - i-1; j++) {
                let a2 = arr[i+j]

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
            while(stack.length) {
                let len = stack.length
                if (arr[stack[len-1]] < a1) {
                    res[stack[len-1]] = i - stack[len-1]
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
        let res = (new Array(arr.length)).fill(0)
        // stack 存的是索引、下标
        let stack = []

        for (let i = 0; i < arr.length; i++) {
            // 注意关键词 "递减栈" ，栈是有序的，所以可以连续比较
            while(stack.length && arr[stack[stack.length-1]] < arr[i]) {
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

    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    console.log(minStack.getMin())
    minStack.pop();
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

    MyQueue.prototype.push = function(x) {
        this.stack1.push(x)
    }
    MyQueue.prototype.pop = function() {
        if (!this.stack2.length) {
            while (this.stack1.length) {
                this.stack2.push(this.stack1.pop())
            }
        }

        return this.stack2.pop()
    }
    MyQueue.prototype.peek = function() {
        if (!this.stack2.length) {
            while (this.stack1.length) {
                this.stack2.push(this.stack1.pop())
            }
        }

        return this.stack2[this.stack2.length - 1]
    }
    MyQueue.prototype.empty = function() {
        // 注意，这里用的是一个感叹号
        return !(this.stack1.length || this.stack2.length)
    }


    let queue = new MyQueue();
    queue.push(1);
    queue.push(2);
    console.log(queue.peek())
    console.log(queue.pop())
    console.log(queue.empty())
}

// funMap.MyQueue()



// 滑动窗口问题   给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
funMap.maxSlidingWindow = () => {
    let nums = [1,3,-1,-3,5,3,6,7]
    let k = 3

    function maxSlidingWindow(nums, k) {
        let res = []

        for (let i = 0; i <= nums.length - k; i++) {
            let min = nums[i]

            for (let j = 1; j < k; j++) {
                if (min < nums[i+j]) {
                    min = nums[i+j]
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
    let nums = [1,3,-1,-3,5,3,6,7]
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
                if (queue[0] === nums[i-k]) {
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
    let nums = [1,3,-1,-3,5,3,6,7]
    let k = 3

    function maxSlidingWindow3(nums, k) {
        let res = []
        let descIndexQueue = []

        for (let i = 0; i < nums.length; i++) {
            // 和当前位比较，把所有小的去掉
            while(descIndexQueue.length && nums[descIndexQueue[descIndexQueue.length - 1]] < nums[i]) {
                descIndexQueue.pop()
            }

            // 别忘了加入当前位置的值
            descIndexQueue.push(i)

            // 去掉过期的值，比如 i 等于 3 的时候，就要把0位上的去掉
            while (descIndexQueue.length && descIndexQueue[0] <= i - k) {
                descIndexQueue.shift()
            }

            // 数量达到 k 个后，比如 i 等于 2 的时候，就要开始出结果了
            if (i >= k -1) {
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
                val: 'D'
            },
            right: {
                val: 'E'
            }
        },
        right: {
            val: 'C',
            right: {
                val: 'F'
            }
        }
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
                    dfs(nth+1) // 深度优先遍历

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
                dfs(i+1) // 深度优先遍历

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

                dfs(i+1) // 深度优先遍历

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
                val: 3
            }
        }
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
                val: 3
            }
        }
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
                val: 3
            }
        }
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
                val: 15
            },
            right: {
                val: 7
            }
        }
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
                val: 15
            },
            right: {
                val: 7
            }
        }
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
    }

    function erchaSearch(root, n) {
        if (!root) {
            return
        }

        if (root.val === n) {
            console.log('目标是', root)
        }else if (root.val < n) {
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
    }

    function insertIntoBST(root, n) {
        if (!root) {
            return {val: n}
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
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
            }else if (root.left) {
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
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

        return isLeftValid && isRightValid && isValidBST(root.left) && isValidBST(root.right)
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
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
            return dfs(root.left, minVal, root.val) && dfs(root.right, root.val, maxVal)
        }

        return dfs(root, -Infinity, Infinity)
    }

    console.log(JSON.stringify(isValidBST2(root)))
}

// funMap.isValidBST2()


// 将排序数组转化为二叉搜索树  将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
funMap.sortedArrayToBST = () => {
    let arr = [-10,-3,0,5,9]

    function sortedArrayToBST(arr) {
        let root = null

        if (!arr || !arr.length) {
            return root
        }

        let len = arr.length
        let mid = Math.floor(len/2)

        root = {
            val: arr[mid],
            left: sortedArrayToBST(arr.slice(0, mid)),
            right: sortedArrayToBST(arr.slice(mid+1))
        }

        return root
    }

    console.log(JSON.stringify(sortedArrayToBST(arr)))
}

// funMap.sortedArrayToBST()


// 将排序数组转化为二叉搜索树  将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
// 小册的写法，通过传索引，不用像上面自己写的那样 slice 出来新的数组，节约了空间
funMap.sortedArrayToBST2 = () => {
    let arr = [-10,-3,0,5,9]

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
            let mid = Math.floor(low + (high - low)/2)
            // console.log('mid', mid)

            return {
                val: arr[mid],
                left: buildBST(low, mid - 1),
                right: buildBST(mid + 1, high)
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9,
                left: {
                    val: 8,
                    // left: {
                    //     val: 7.5
                    // }
                }
            }
        }
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9,
                left: {
                    val: 8,
                    // left: {
                    //     val: 7.5
                    // }
                }
            }
        }
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
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9,
                left: {
                    val: 8,
                    // left: {
                    //     val: 7.5
                    // }
                }
            }
        }
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

            let mid = Math.floor(left + (right - left)/2)
            let root = {
                val: arr[mid],
                left: buildBST(left, mid - 1),
                right: buildBST(mid + 1, right)
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
    let nums = [3,2,1,5,6,4]
    let k = 2

    function findKthLargest(nums, k) {
        let arr = nums.sort((a, b) => b-a)

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
    let nums = [3,2,1,5,6,4]
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
                if (j+1 <= high && heap[j] > heap[j+1]) {
                    j = j + 1
                }

                if (heap[i] > heap[j]) {
                    [heap[i], heap[j]] = [heap[j], heap[i]]
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
            let j = Math.floor((i - 1)/2)

            while (j >= low) {
                if (heap[j] > heap[i]) {
                    [heap[i], heap[j]] = [heap[j], heap[i]]

                    i = j
                    j = Math.floor((i - 1)/2)
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
    let nums = [3,2,1,5,6,4]

    function bubbleSort(nums) {
        if (!nums || !nums.length) {
            return nums
        }

        let len = nums.length

        // 记得这里是2层循环，时间长了就忘了，写成了一个 for
        // 这个不是冒泡排序，是啥排序来着？
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1; j++) {
                if (nums[j] > nums[j+1]) {
                    [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
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

funMap.bubbleSort()

