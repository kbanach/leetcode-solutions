import { debug, check, c } from './debug_utils.ts';

/*
Valid Anagram

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/882/

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**Example 1:**
**Input:** s = "anagram", t = "nagaram"
**Output:** true

**Example 2:**
**Input:** s = "rat", t = "car"
**Output:** false

**Constraints:**
- `1 <= s.length, t.length <= 5 * 10`
- `s` and `t` consist of lowercase English letters.

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
*/

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const sLettersMap = new Map<string, number>();
    const tLettersMap = new Map<string, number>();
    for (let i = 0; i < s.length; i++) {
        if (sLettersMap.has(s[i])) {
            sLettersMap.set(s[i], sLettersMap.get(s[i])! + 1);
        } else {
            sLettersMap.set(s[i], 1);
        }

        if (tLettersMap.has(t[i])) {
            tLettersMap.set(t[i], tLettersMap.get(t[i])! + 1);
        } else {
            tLettersMap.set(t[i], 1);
        }
    }

    return [...sLettersMap.entries()].every(([key, value]) => {
        return tLettersMap.get(key) === value;
    });

};

const testExamples: [string, string, boolean][] = [
    // [ input, expected ]
    ['anagram', 'nagaram', true],
    ['rat', 'car', false],
    ];

check(testExamples, isAnagram);
