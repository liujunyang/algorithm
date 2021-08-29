let l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5
        }
      }
    }
  }
}

function ListNode(val) {
  this.val = val
  this.next = null
}

function removeLstN(head, n) {
  let dummy = new ListNode()

  dummy.next = head
  let slow = dummy
  let quick = dummy

  while (n > 0){
    quick = quick.next
    n--
  }

  while (quick.next){
    quick = quick.next
    slow = slow.next
  }

  slow.next = slow.next.next
  return dummy.next
}

// console.log(JSON.stringify(removeLstN(l1, 2)))

// 完全翻转链表
function reverseList(head) {
  let pre = null
  let cur = head

  while (cur) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}

// console.log(JSON.stringify(reverseList(l1)))

// 局部翻转链表
function reverseListMN(head, m, n) {
  let dummy = new ListNode()
  dummy.next = head

  let p = dummy

  for (let i = 1; i < m; i++) {
    p = p.next
  }

  let leftHead = p
  let pre = p.next
  let midTail = pre
  let cur = pre.next

  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  leftHead.next = pre
  midTail.next = cur

  return dummy.next
}


// console.log(JSON.stringify(reverseListMN(l1, 2, 3)))

// k 个一组翻转链表
function reverseKGroup(head, k) {
  let len = 0
  let count = 0
  let cur = head

  while (cur) {
    count++
    cur = cur.next
  }

  len = count

  let n = Math.floor(len/k)
  let tailCount = len % k

  // 翻转 第 i*k+1 到 i*k + k 的部分
  for (let i = 0; i < n; i++) {
    head = reverseListMN(head, i*k+1, i*k+k)
  }

  return head
}

console.log(JSON.stringify(reverseKGroup(l1, 3)))
