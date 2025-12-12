import { debug, check, c, checkGraphs } from './debug_utils.ts';
import { getLinkedListExample, debugGraph, deleteNodeByIdx, ListNode, getNodeByIdx, stringifyGraph, exampleList } from './graph_utils.ts';

/*
Remove Nth Node From End of List

https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/603/

Given the `head` of a linked list, remove the `n` node from the end of the list and return its head.

**Example 1:**
![](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]

**Example 2:**
    Input: head = [1], n = 1
    Output: []

**Example 3:**
    Input: head = [1,2], n = 1
    Output: [1]


**Constraints:**
- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

**Follow up:** Could you do this in one pass?
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    
};

// const a = getLinkedListExample();
// debugGraph(a);
// console.table(stringifyGraph(a));
// debugGraph(getNodeByIdx(a, 3), true);
// debugGraph(deleteNodeByIdx(a, 3));
// debugGraph(deleteNodeByIdx(a, 0));

const testExamples: [ListNode | null, number, ListNode | null][] = [
    // [ input , expected ]
    [exampleList(5, 1), 2, deleteNodeByIdx(exampleList(5, 1), 3)],
    [exampleList(10, 1), 2, deleteNodeByIdx(exampleList(10, 1), 8)],
    [exampleList(1, 1), 1, null],
];

checkGraphs(testExamples, removeNthFromEnd);
