import { debug, check, c } from './debug_utils.ts';

/*
String to Integer (atoi)

https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/884/
Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace (`" "`).
2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-2, 2 - 1]`, then round the integer to remain in the range. Specifically, integers less than `-2` should be rounded to `-2`, and integers greater than `2 - 1` should be rounded to `2 - 1`.

Return the integer as the final result.

**Example 1:**
**Input:** s = "42"
**Output:** 42
**Explanation:**

    The underlined characters are what is read in and the caret is the current reader position.Step 1: "42" (no characters read because there is no leading whitespace) ^Step 2: "42" (no characters read because there is neither a '-' nor '+') ^Step 3: "42" ("42" is read in) ^

**Example 2:**
**Input:** s = " -042"
**Output:** -42
**Explanation:**
    Step 1: " -042" (leading whitespace is read and ignored) ^Step 2: " -042" ('-' is read, so the result should be negative) ^Step 3: " -042" ("042" is read in, leading zeros ignored in the result) ^

**Example 3:**
**Input:** s = "1337c0d3"
**Output:** 1337
**Explanation:**
    Step 1: "1337c0d3" (no characters read because there is no leading whitespace) ^Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+') ^Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit) ^

**Example 4:**
**Input:** s = "0-1"
**Output:** 0
**Explanation:**
    Step 1: "0-1" (no characters read because there is no leading whitespace) ^Step 2: "0-1" (no characters read because there is neither a '-' nor '+') ^Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit) ^

**Example 5:**
**Input:** s = "words and 987"
**Output:** 0
**Explanation:**
Reading stops at the first non-digit character 'w'.

**Constraints:**
- `0 <= s.length <= 200`
- `s` consists of English letters (lower-case and upper-case), digits (`0-9`), `' '`, `'+'`, `'-'`, and `'.'`.
*/

function charToInt(cCode: number): number {
    return cCode - 48;
}

function isNumber(cCode: number): boolean {
    // ASCII_NUMBERS = [48, 57];
    const int = charToInt(cCode);
    return (int >= 0 && int <= 9);
}

const MAX_32_INT = 2147483648 - 1; //  Math.pow(2, 31) - 1
const MIN_32_INT = -2147483648; //    -Math.pow(2, 31)
const ASCII_SPACE = ' '.charCodeAt(0); 
const ASCII_MINUS = '-'.charCodeAt(0); 
const ASCII_PLUS = '+'.charCodeAt(0); 

function isFrontTrimmable(cCode: number): boolean {
    return cCode === ASCII_SPACE || cCode === ASCII_MINUS || cCode === ASCII_PLUS; 
}

function myAtoi(s: string): number {
    let isNegative = false;
    let trimmingFront = true;
    let trimmingLeadingZeros = true;
    let outputInt = 0;

    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);

        // 0. leading whitespaces
        // 1. first "-" or "+"
        if (trimmingFront && isFrontTrimmable(charCode)) {
            if (charCode === ASCII_MINUS) { isNegative = true; trimmingFront = false;}
            if (charCode === ASCII_PLUS) {isNegative = false; trimmingFront = false;}
            continue;
        }

        if (trimmingFront && isNumber(charCode)) {
            trimmingFront = false;
        }

        // 2. !number
        if (!isNumber(charCode)) {
            break;
        }
        const int = charToInt(charCode);

        // 3. \d
        //    3.a. unimportant first 0's
        if(trimmingLeadingZeros && int !== 0) {
            trimmingLeadingZeros = false;
        } else if (trimmingLeadingZeros && int === 0) {
            continue;
        }
    
        //    3.b. x >= 0
        outputInt = outputInt * 10 + int;

        
        // as making x*-1 is on last return, we have here only positive numbers
        if (!isNegative && outputInt > MAX_32_INT) return MAX_32_INT;
        if (isNegative && outputInt > MAX_32_INT + 1) return MIN_32_INT;
    }

    return outputInt * (isNegative ? -1 : 1);
};

const testExamples: [string, number][] = [
    ['42', 42],
    ['-42', -42],
    ['1337c0d3', 1337],
    ['0-1', 0],
    ["-91283472332", -2147483648],
    ["+-12", 0]
];

check(testExamples, myAtoi);
