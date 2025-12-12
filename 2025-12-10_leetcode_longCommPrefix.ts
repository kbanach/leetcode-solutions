import { debug, check, c } from './debug_utils.ts';

/*
Longest Common Prefix

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/887/

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

**Example 1:**
    Input: strs = ["flower","flow","flight"]
    Output: "fl"

**Example 2:**
    Input: strs = ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.

**Constraints:**

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of only lowercase English letters if it is non-empty.

*/

function longestCommonPrefix(strs: string[]): string {
    let endOfAnyStrReached = false;
    let anyUnmatch = false;
    let commonPrefix = '';
    let i = 0;

    while (i < strs[0].length) {
        let currentChar = strs[0][i];
        debug(`i: ${i}`, `currentChar: ${currentChar}`, `commonPrefix: ${commonPrefix}`);
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length) {
                debug(`${i} >= ${strs[j].length}`);
                endOfAnyStrReached = true;
                break;
            }

            if (strs[j][i] !== currentChar) {
                
                debug(`strs[${j}][${i}] (${strs[j][i]}) !== ${currentChar}`);
                anyUnmatch = true;
                break;
            }
        }
        if (!endOfAnyStrReached && !anyUnmatch) {
            commonPrefix += currentChar;
            i++;
        } else {
            break;
        }
    }

    return commonPrefix;
};

const testExamples: [string[], string][] = [
    [["flower", "flow", "flight"], "fl"],
    [["dog", "racecar", "car"], ''],
    [['', 'aaa', 'aaa'], ''],
];

check(testExamples, longestCommonPrefix);
