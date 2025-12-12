import { debug, check, c } from './debug_utils.ts';

/*

Reverse String

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/879/

Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
 
Constraints:
1 <= s.length <= 105
s[i] is a printable ascii character.

*/

/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
    let tmp = '';
    for (let i = 0; i < s.length / 2; i++) {
        tmp = s[i];
        s[i] = s[s.length - 1 - i];
        s[s.length - 1 - i] = tmp;
    }
};


const testExamples: [string[], string[]][] = [
    [
        ["h","e","l","l","o"],
        ["o","l","l","e","h"]
    ],
    [
        ["H","a","n","n","a","h"],
        ["h","a","n","n","a","H"]
    ],
];

check(testExamples, reverseString);
