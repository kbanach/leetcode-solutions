import { debug, check } from '../debug_utils.ts';

/*
Valid Palindrome

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/883/

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters 
and removing all non-alphanumeric characters, it reads the same forward and backward. 
Alphanumeric characters include letters and numbers.

Given a string `s`, return `true`* if it is a **palindrome**, or *`false`* otherwise*.

**Example 1:**

    Input: s = "A man, a plan, a canal: Panama"
    Output: true
    Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2:**

    Input: s = "race a car"
    Output: false
    Explanation: "raceacar" is not a palindrome.

**Example 3:**

    Input: s = " "
    Output: true
    Explanation: s is an empty string "" after removing non-alphanumeric characters.
    Since an empty string reads the same forward and backward, it is a palindrome.

**Constraints:**

- `1 <= s.length <= 2 * 10`
- `s` consists only of printable ASCII characters.

*/

function isAlphaChar(cCode: number): boolean {
    const UPPER_LOWER_DIFF = 32;
    const ASCII_UPPERCASE = [65, 90];
    const ASCII_LOWERCASE = [ASCII_UPPERCASE[0] + UPPER_LOWER_DIFF, ASCII_UPPERCASE[1] + UPPER_LOWER_DIFF];

    return (cCode >= ASCII_LOWERCASE[0] && cCode <= ASCII_LOWERCASE[1])
        || (cCode >= ASCII_UPPERCASE[0] && cCode <= ASCII_UPPERCASE[1])
}

function isNumber(cCode: number): boolean {
    const ASCII_NUMBERS = [48, 57];
    return (cCode >= ASCII_NUMBERS[0] && cCode <= ASCII_NUMBERS[1]);
}

function isAlphanumeric(cCode: number): boolean {
    return isNumber(cCode) || isAlphaChar(cCode);
}

function isPalindrome(s: string): boolean {
    let i = 0, j = s.length - 1;
    while (i < j) {
        debug(`i: ${i}`, `j: ${j}`);
        const frontCharCode = s.charCodeAt(i);
        debug('frontCharCode', frontCharCode);
        if (!isAlphanumeric(frontCharCode)) {
            i++;
            continue;
        }
        const backCharCode = s.charCodeAt(j);
        debug('backCharCode', backCharCode);
        if (!isAlphanumeric(backCharCode)) {
            j--;
            continue;
        }
        if (frontCharCode === backCharCode) {
            debug(`${frontCharCode} === ${backCharCode} || ${Math.abs(frontCharCode - backCharCode)} === 32`);
            i++;
            j--;
            continue;
        }
        if (Math.abs(frontCharCode - backCharCode) === 32 && !isNumber(frontCharCode) && !isNumber(backCharCode)) {
            i++;
            j--;
            continue;
        }

        return false;
    }

    return true;
};

const testExamples: [string, boolean][] = [
    ['A man, a plan, a canal: Panama', true],
    ['race a car', false],
    [' ', true],
    ['0P', false],
];

check(testExamples, isPalindrome);
