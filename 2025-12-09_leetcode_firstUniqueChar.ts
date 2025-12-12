import { check } from './debug_utils.ts';

/*
First Unique Character in a String

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/881/

Given a string `s`, find the **first** non-repeating character in it and return its index. If it **does not** exist, return `-1`.

**Example 1:**
**Input:** s = "leetcode"
**Output:** 0
**Explanation:**
The character `'l'` at index 0 is the first character that does not occur at any other index.

**Example 2:**
**Input:** s = "loveleetcode"
**Output:** 2

**Example 3:**
**Input:** s = "aabb"
**Output:** -1

**Constraints:**
- `1 <= s.length <= 10`
- `s` consist
*/

function firstUniqChar(s: string): number {
    const lettersIdx = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        if (lettersIdx.has(s[i])) {
            lettersIdx.set(s[i], -1);
        } else {
            lettersIdx.set(s[i], i);
        }
    }

    return [...lettersIdx.values()].reduce((minIdx: number, val: number) => { 
        if (val >= 0 && minIdx < 0) { 
            return val;
        } else if (val >= 0 && minIdx >= 0) {
            return Math.min(minIdx, val);
        } 

        return minIdx;
    }, -1);
};

const testExamples: [string, number][] = [
    ['leetcode', 0],
    ['loveleetcode', 2],
    ['aabb', -1],
];

check(testExamples, firstUniqChar);
