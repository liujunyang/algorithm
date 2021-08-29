let l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val:4,
        next: {
          val: 5,
        }
      }
    }
  }
}

function ListNode(val) {
  this.val = val
  this.next = null
}

function deleten(head, n) {
  let len = 0
  let dummy = new ListNode()
  dummy.next = head

  let cur = head

  while (cur) {
    len++
    cur = cur.next
  }

  let m = len - n
  let count = 1

  cur = head
  while (cur) {
    if (count === m) {
      cur.next = cur.next.next
      return head
    }

    count++
    cur = cur.next
  }
}

// console.log(JSON.stringify(deleten(l1, 2)))

function deleten2(head, n) {
  let cur1 = head
  let cur2 = head
  let count = 0

  while (cur2) {
    cur2 = cur2.next

    if (count === n) {
      if (!cur2) {
        cur1.next = cur1.next.next
        return head
      }
      cur1 = cur1.next
    } else {
      count++
    }
  }
}

// console.log(JSON.stringify(deleten2(l1, 2)))

function reverseList(head) {
  let pre = null
  let cur = head
  let next = head.next

  while (next) {
    cur.next = pre
    pre = cur
    cur = next
    next = next.next
  }

  cur.next = pre

  return cur
}

// console.log(JSON.stringify(reverseList(l1)))

function reverseList2(head) {
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

// console.log(JSON.stringify(reverseList2(l1)))

function reversePart(head, m , n) {
  let tt = null
  let mid = null
  let count = 0
  let dummy = new ListNode()
  let hh = dummy
  let cur = dummy

  dummy.next = head

  while (cur) {
    if (count === m - 1) {
      hh = cur
      mid = cur.next
    }

    if (count === n) {
      tt = cur.next
      cur.next = null
    }

    console.log(JSON.stringify(mid))

    count++
    cur = cur.next
  }

  let tmp = mid
  mid = reverseList2(mid)
  console.log(JSON.stringify(mid))
  tmp.next = tt
  hh.next = mid

  return dummy.next
}

console.log(JSON.stringify(reversePart(l1, 2, 4)))
