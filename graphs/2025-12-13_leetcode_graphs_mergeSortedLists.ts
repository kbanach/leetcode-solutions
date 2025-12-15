import { checkGraphs } from '../debug_utils.ts';
import { ListNode, arrToList } from '../graph_utils.ts';

/*
Merge Two Sorted Lists

https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/771/

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** list. The list should be made by 
splicing together the nodes of the first two lists.

Return *the head of the merged linked list*.

**Example 1:**
![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]

**Example 2:**

    Input: list1 = [], list2 = []
    Output: []

**Example 3:**

    Input: list1 = [], list2 = [0]
    Output: [0]

**Constraints:**

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in **non-decreasing** order.

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

//// runtime: 1ms/46.99%; memory: 59.50mb/5.89%
// function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
//     let root: ListNode;

//     if (list1 && !list2) {
//         root = list1;
//     } else if (!list1 && list2) {
//         root = list2;
//     } else if (list1 && list2) {
//         root = (list1.val <= list2.val) ? list1 : list2;
//     } else {
//         return null;
//     }

//     let currentNode: ListNode | null = root;
//     let ptrL1: ListNode | null = list1;
//     let ptrL2: ListNode | null = list2;
//     let nextCandidate: ListNode | null;

//     while (currentNode) {
//         nextCandidate = null;

//         if (currentNode === ptrL1) {
//             ptrL1 = ptrL1.next;
//         } else if (currentNode === ptrL2) {
//             ptrL2 = ptrL2.next;
//         }

//         if (ptrL1 && currentNode.val <= ptrL1?.val) {
//             nextCandidate = ptrL1;
//         } else if (ptrL2 && currentNode.val <= ptrL2?.val) {
//             nextCandidate = ptrL2;
//         }

//         if (nextCandidate) {
//             if (ptrL2 && nextCandidate === ptrL1 && nextCandidate.val > ptrL2?.val) {
//                 nextCandidate = ptrL2;
//             } else if (ptrL1 && nextCandidate === ptrL2 && nextCandidate.val > ptrL1?.val) {
//                 nextCandidate = ptrL1;
//             }
//         }

//         currentNode.next = nextCandidate;
//         currentNode = currentNode.next;
//     }

//     return root;
// };


//// runtime: 1ms/46.99%; memory: 59.99mb/5.89%
// function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
//     if (!list1 && !list2) return null;
//     if (!list1) return list2;
//     if (!list2) return list1;

//     const root = new ListNode();
//     let currentNode = root;

//     if (list1.val <= list2.val) {
//         currentNode.val = list1.val;
//         list1 = list1.next;
//     } else {
//         currentNode.val = list2.val;
//         list2 = list2.next;
//     }

//     while (list1 || list2) {
//         currentNode.next = new ListNode();
//         currentNode = currentNode.next;

//         if (list1 && list2) {
//             if (list1?.val <= list2?.val) {
//                 currentNode.val = list1?.val;
//                 list1 = list1?.next;
//             } else {
//                 currentNode.val = list2?.val;
//                 list2 = list2?.next;
//             }
//         } else if (list1 && !list2) {
//             currentNode.val = list1?.val;
//             list1 = list1?.next;
//         } else if (!list1 && list2) {
//             currentNode.val = list2?.val;
//             list2 = list2?.next;
//         }
//     }

//     return root;
// };


// this solution feels "hacky"... but it's the only one I could think of to beat 50% of solutions by memory consumption 
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (!list1 && !list2) return null;
    if (!list1) return list2;
    if (!list2) return list1;

    const root = new ListNode();
    let currentNode = root;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            currentNode.next = list1;
            list1 = list1?.next;
        } else {
            currentNode.next = list2;
            list2 = list2.next;
        }
        currentNode = currentNode.next;
    }

    if (list1) currentNode.next = list1;
    if (list2) currentNode.next = list2;

    // the first node is a dummy one, to attach sorted nodes, so it should be thrown away
    return root.next;
};


const testExamples: [ListNode | null, ListNode | null, ListNode | null][] = [
    [arrToList([1, 2, 4]), arrToList([1, 3, 4]), arrToList([1, 1, 2, 3, 4, 4])],
    [arrToList([1, 1, 1, 2, 4]), arrToList([1, 3, 4]), arrToList([1, 1, 1, 1, 2, 3, 4, 4])],
    [arrToList([2, 4]), arrToList([1, 3, 4]), arrToList([1, 2, 3, 4, 4])],
    [null, null, null],
    [null, arrToList([0]), arrToList([0])],
    [arrToList([0]), null, arrToList([0])]
];

checkGraphs(testExamples, mergeTwoLists);
