/**
 * Plus One
 * 
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/559/
 * 
 * You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the `i` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`'s.
 * 
 * Increment the large integer by one and return *the resulting array of digits*.
 * 
 * **Example 1:**
 *     Input: digits = [1,2,3]Output: [1,2,4]Explanation: The array represents the integer 123.Incrementing by one gives 123 + 1 = 124.Thus, the result should be [1,2,4].
 * 
 * **Example 2:**
 *     Input: digits = [4,3,2,1]Output: [4,3,2,2]Explanation: The array represents the integer 4321.Incrementing by one gives 4321 + 1 = 4322.Thus, the result should be [4,3,2,2].
 * 
 * **Example 3:**
 *     Input: digits = [9]Output: [1,0]Explanation: The array represents the integer 9.Incrementing by one gives 9 + 1 = 10.Thus, the result should be [1,0].
 * 
 * **Constraints:**
 * - `1 <= digits.length <= 100`
 * - `0 <= digits[i] <= 9`
 * - `digits` does not contain any leading `0`'s.
 */
let DEBUG = true;

function debug(log: string) {
    if (DEBUG) {
        console.log('\t' + log);
    }
}


function plusOne(digits: number[]): number[] {
    let outputInv: number[] = [];
    let carryOver: boolean = false;
    let firstIncreased = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let current = digits[i];

        if (!firstIncreased) {
            carryOver = true;
            firstIncreased = true;
        }
        if (current === 9 && carryOver) {
            current = 0;
        } else if (carryOver) {
            carryOver = false;
            current += 1;
        }

        outputInv.push(current);
    }

    if (carryOver) {
        outputInv.push(1);
    }

    return outputInv.reverse();
};

function plusOneStrVersion(digits: number[]): number[] {
    let outputStr: string = '';
    let carryOver: boolean = false;
    let firstIncreased = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let current = digits[i];

        if (!firstIncreased) {
            carryOver = true;
            firstIncreased = true;
        }
        if (current === 9 && carryOver) {
            current = 0;
        } else if (carryOver) {
            carryOver = false;
            current += 1;
        }

        outputStr = current + outputStr;
    }

    if (carryOver) {
        outputStr = '1' + outputStr;
    }

    return Array.from(outputStr).map(Number);
};

const testExamples: [number[], number[]][] = [
    // [ input, expected ]
    [[1,2,3], [1,2,4]],
    [[4,3,2,1], [4,3,2,2]],
    [[9], [1, 0]],
];

for (let test of testExamples) {
    console.log(`For input: \t${test[0]}`);
    console.log(`Expects:   \t${test[1]}`);
    console.log(`Run:       \t${plusOne(test[0])}`);
    console.log('\n\n');
}