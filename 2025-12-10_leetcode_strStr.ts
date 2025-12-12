import { debug, check, c } from './debug_utils.ts';

/*
Implement strStr()

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/885/

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Example 1:**
    Input: haystack = "sadbutsad", needle = "sad"
    Output: 0
    Explanation: "sad" occurs at index 0 and 6.
    The first occurrence is at index 0, so we return 0.

**Example 2:**
    Input: haystack = "leetcode", needle = "leeto"
    Output: -1
    Explanation: "leeto" did not occur in "leetcode", so we return -1.

**Constraints:**
- `1 <= haystack.length, needle.length <= 10`
- `haystack` and `needle` consist of only lowercase English characters.
*/

function strStr(haystack: string, needle: string): number {
    let potentialMatchIdxs = [];

    for (let i = 0; i < haystack.length - needle.length + 1; i++) {
        if (haystack[i] === needle[0]) { potentialMatchIdxs.push(i) };
    }

    debug('potential matches:', potentialMatchIdxs);

    for (let j = 0; j < potentialMatchIdxs.length; j++) {
        const startIdx = potentialMatchIdxs[j];
        debug('startIdx', startIdx);

        for (let k = 0; k < needle.length; k++) {
            debug(`? ${needle[k]} !== ${haystack[startIdx + k]}: `, (needle[k] !== haystack[startIdx + k]))
            if (needle[k] !== haystack[startIdx + k]) {
                break;
            }

            if (k === needle.length - 1) return startIdx;
        }
    }

    return -1;
};

const testExamples: [string, string, number][] = [
    // [ haystack , needle, expected ]
    ['sadbutsad', 'sad', 0],
    ['leetcode', 'leeto', -1],
    ['aaa', 'aaaa', -1],
    ['mississippi', 'issip', 4],
];

check(testExamples, strStr);
