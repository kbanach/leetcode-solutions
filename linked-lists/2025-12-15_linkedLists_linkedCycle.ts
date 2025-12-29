import { arrToList, debugGraph, ListNode } from "../linkedLists_utils.ts";

/*
Linked List Cycle

https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/773/

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached 
again by continuously following the `next` pointer. Internally, `pos` is used to denote 
the index of the node that tail's `next` pointer is connected to. 
**Note that `pos` is not passed as a parameter**.

Return `true`* if there is a cycle in the linked list*. Otherwise, return `false`.

**Example 1:**
![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

    Input: head = [3,2,0,-4], pos = 1
    Output: true
    Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).


**Example 2:**
![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)

    Input: head = [1,2], pos = 0
    Output: true
    Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

**Example 3:**
![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)

    Input: head = [1], pos = -1
    Output: false
    Explanation: There is no cycle in the linked list.

**Constraints:**

- The number of the nodes in the list is in the range `[0, 10]`.
- `-10 <= Node.val <= 10`
- `pos` is `-1` or a **valid index** in the linked-list.

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

*/


/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// runtime: 52ms/37.71%; memory: 59.58mb/5.46%
function hasCycle(head: ListNode | null): boolean {
    const elemRegistry = new Set<ListNode>();

    while (head) {
        if (elemRegistry.has(head)) return true;

        elemRegistry.add(head);
        head = head.next;
    }

    return false;
};

const listWithCycle = arrToList([3, 2, 0, -4]);
const lastElem = listWithCycle.next!.next!.next;
lastElem!.next = listWithCycle.next;

if (hasCycle(listWithCycle) !== true) throw new Error();
console.log('cycle found, all fine');