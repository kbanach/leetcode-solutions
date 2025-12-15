import { debug } from "node:console";
import { checkGraphs } from "../debug_utils.ts";
import { arrToList, debugGraph, ListNode, stringifyNode } from "../graph_utils.ts";

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

function isPalindrome(head: ListNode | null): boolean {
    if (!head) return false;

    const items: number[] = [head?.val];
    head = head.next;

    while (head) {
        items.push(head.val);
        head = head.next;
    }

    if (items.length === 1) return true;

    const middleIdx = Math.floor(items.length / 2) - 1;

    for (let i = middleIdx; i >= 0; i--) {
       if(items[i] !== items[items.length - 1 - i]) return false;
    }

    return true;
};

const testExamples: [ListNode | null, boolean][] = [
    [arrToList([1, 2, 2, 1]), true],
    [arrToList([1, 2, 3, 2, 1]), true],
    [arrToList([8, 5, 1, 5, 8]), true],
    [arrToList([8, 5, 1, 5, 9]), false],
    [arrToList([1, 2]), false],
    [arrToList([1, 1]), true],
    [arrToList([1]), true],

];

checkGraphs(testExamples, isPalindrome);

// [
//     -1, // 0 
//     -1, // 1
//     0, // 2
//     0, // 3
//     1, // 4
//     1, // 5
//     2, // 6
//     2, // 7
//     3, // 8
//     3, // 9
//     4, // 10
//     4, // 11
// ].forEach((v, i) => console.log(`i: ${i}\t${Math.floor(i / 2) - 1} ${v} should be` ))