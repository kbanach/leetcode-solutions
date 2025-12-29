import { checkGraphs } from "../debug_utils.ts";
import { arrToList, ListNode } from "../linkedLists_utils.ts";

/*
Palindrome Linked List

https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/772/


Given the `head` of a singly linked list, return `true`* if it is a **palindrome** or *`false`* otherwise*.

**Example 1:**
![](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

    Input: head = [1,2,2,1]Output: true

**Example 2:**
![](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

    Input: head = [1,2]Output: false

**Constraints:**

- The number of nodes in the list is in the range `[1, 10]`.
- `0 <= Node.val <= 9`

**Follow up:** Could you do it in `O(n)` time and `O(1)` space?

*/

// // runtime: 27ms/25.28%; memory: 85.26/24.37%
// function isPalindrome(head: ListNode | null): boolean {
//     if (!head) return false;

//     const items: number[] = [head?.val];
//     head = head.next;

//     while (head) {
//         items.push(head.val);
//         head = head.next;
//     }

//     if (items.length === 1) return true;

//     const middleIdx = Math.floor(items.length / 2) - 1;

//     for (let i = middleIdx; i >= 0; i--) {
//        if(items[i] !== items[items.length - 1 - i]) return false;
//     }

//     return true;
// };

// // runtime: 24ms/28.02%; memory: 82.06mb/51.71%
// function isPalindrome(head: ListNode | null): boolean {
//     const list = Array(10_000);
//     let len = 0;

//     while (head) {
//         list[len++] = head.val;
//         head = head.next;
//     }

//     for (let i = 0; i <= Math.floor(len / 2) - 1; i++) {
//         if (list[i] !== list[len - 1 - i]) return false;
//     }

//     return true;
// }

function isPalindrome(head: ListNode | null): boolean {
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    let slowReversedHead: ListNode | null = null;
    let originalSlowNext: ListNode | null;
    while (fast && fast.next) {
        fast = fast.next.next;

        // if "fast" and it's ".next" is still not null, then all slow's are available
        originalSlowNext = slow!.next;
        slow!.next = slowReversedHead;
        slowReversedHead = slow;
        slow = originalSlowNext;
    }

    let middleHead: ListNode | null;

    if (fast !== null) {
        // odd number of list elements, skip first element
        middleHead = slow!.next;
    } else {
        middleHead = slow!;
    }

    while (middleHead && slowReversedHead) {
        if (middleHead.val !== slowReversedHead.val) return false;

        middleHead = middleHead.next;
        slowReversedHead = slowReversedHead.next;
    }

    if (!middleHead && slowReversedHead) return false;
    if (middleHead && !slowReversedHead) return false;

    return true;
}

const testExamples: [ListNode | null, boolean][] = [
    [arrToList([1, 2, 2, 1]), true],
    [arrToList([1, 2, 3, 2, 1]), true],
    [arrToList([1, 2, 1, 3, 1]), false],
    [arrToList([1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]), true],
    [arrToList([1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 0]), false],
    [arrToList([8, 5, 1, 5, 8]), true],
    [arrToList([8, 5, 1, 5, 9]), false],
    [arrToList([1, 2, 1, 1, 2, 1]), true],
    [arrToList([1, 2, 1, 2, 1]), true],
    [arrToList([1, 1, 1, 1]), true],
    [arrToList([2, 2, 2, 2]), true],
    [arrToList([1, 1, 1, 1, 1]), true],
    [arrToList([2, 2, 2, 2, 2]), true],
    [arrToList([1, 2]), false],
    [arrToList([1, 1]), true],
    [arrToList([1]), true],
];

checkGraphs(testExamples, isPalindrome);