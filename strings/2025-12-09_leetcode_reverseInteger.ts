import { check } from '../debug_utils.ts';

/*

Reverse Integer

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/880/

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21
 
Constraints:
-2^31 <= x <= 2^31 - 1
*/

function reverse(x: number): number {
    if (x === 0) return 0;
    
    const minInt = -2147483648;
    const maxInt = 2147483647;

    const intStr = String(x);
    const maxIdx = intStr.length - 1;
    const isNegative = ((x < 0) ? true : false);

    const output = isNegative ? ['-'] : [];

    let zerosTail = true;
    for (let i = maxIdx; i >= 0; i--) {
        if (zerosTail && intStr[i] === '0') {
            continue;
        } 
        zerosTail = false;
        output.push(intStr[i]);
    }

    const parsed = parseInt(output.join(''), 10);
    if (parsed < minInt || parsed > maxInt) {
        return 0;
    }

    return parsed;
};


const testExamples: [number, number][] = [
    [123, 321],
    [-123, -321],
    [120, 21],
    [Number.MAX_SAFE_INTEGER + 1, 0],
    [Number.MIN_SAFE_INTEGER - 1, 0],
    [1_534_236_469, 0]
];

check(testExamples, reverse);
