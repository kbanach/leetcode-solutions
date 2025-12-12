import { checkGraphs } from './debug_utils.ts';
import { ListNode, exampleList, reverseLinkedList } from './graph_utils.ts';

/*
Reverse Linked List

https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/560/

Given the `head` of a singly linked list, reverse the list, and return *the reversed list*.

**Example 1:**
![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

    Input: head = [1,2,3,4,5]
    Output: [5,4,3,2,1]

**Example 2:**
![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

    Input: head = [1,2]
    Output: [2,1]

**Example 3:**

    Input: head = []
    Output: []

**Constraints:**

- The number of nodes in the list is the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`

**Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?
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
function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null;

    let currentNode: ListNode = head;
    let prevNode: ListNode | null = null;
    let nextNode: ListNode | null;

    while (currentNode && currentNode?.next) {
        nextNode = currentNode.next;
        currentNode.next = prevNode;
        prevNode = currentNode;
        currentNode = nextNode;
    }

    currentNode.next = prevNode;

    return currentNode;
};

const testExamples: [ListNode | null, ListNode | null][] = [
    [exampleList(5, 1), reverseLinkedList(exampleList(5, 1))],
    [exampleList(10, 1), reverseLinkedList(exampleList(10, 1))],
    [exampleList(2, 1), reverseLinkedList(exampleList(2, 1))],
    [exampleList(1, 1), reverseLinkedList(exampleList(1, 1))],
];

checkGraphs(testExamples, reverseList);
