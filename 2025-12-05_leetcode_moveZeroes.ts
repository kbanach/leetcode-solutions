import { styleText } from 'node:util';
import { debug, check } from './debug_utils.ts';

/**
 * Move Zeroes
 * 
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/567/
 * 
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * 
 * Note that you must do this in-place without making a copy of the array.
 * 
 * Example 1:
 * Input: nums = [0,1,0,3,12]
 * Output: [1,3,12,0,0]
 * 
 * Example 2:
 * Input: nums = [0]
 * Output: [0]
 * 
 * Constraints:
 * 1 <= nums.length <= 104
 * -231 <= nums[i] <= 231 - 1
 *  
 * Follow up: Could you minimize the total number of operations done?
 */

// /**
//  Do not return anything, modify nums in-place instead.
//  */
// function moveZeroes(nums: number[]): void {
//     let zeroIdxs: number[] = [];

//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] === 0 && zeroIdxs.length) {
//             // carries zero, found an zero
//             debug(i, 'carries zero, found an zero');
//             zeroIdxs.push(i);
//         } else if (nums[i] !== 0 && zeroIdxs.length) {
//             // carries zero, found a value
//             debug(i, 'carries zero, found a value');
//             const targetIdx = zeroIdxs.shift()!;
//             nums[targetIdx] = nums[i];
//             nums[i] = 0;
//             zeroIdxs.push(i);
//             debug(i, 'nums after modification:', nums);
//         } else if (nums[i] === 0 && !zeroIdxs.length) {
//             // found a first zero
//             debug(i, 'found a first zero');
//             zeroIdxs.push(i);
//         } else {
//             // found a value
//             debug(i, 'found a value');
//         }

//         debug('nums:',nums, 'zeroIdxs:', zeroIdxs.join(','));
//         debug('');
//     }
// };

// /**
//  Do not return anything, modify nums in-place instead.
//  */
// function findNextDigitIdx(nums: number[], startIdx: number): number {
//     for (let j = startIdx; j < nums.length; j++) {
//         if (nums[j] !== 0) return j;
//     }

//     return -1;
// }

// function swap(nums: number[], aIdx: number, bIdx: number): void {
//     const tmp = nums[aIdx];
//     nums[aIdx] = nums[bIdx];
//     nums[bIdx] = tmp;
// }

// function moveZeroes(nums: number[]): void {    
//     // 0,1,0,3,12
//     // #0,1,0,3,12  iterate, found zero, check next
//     // #0,?1,0,3,12 digit found
//     // #1,?0,0,3,12 swap
//     // 1,#0,0,3,12  iterate, found zero, check next
//     // 1,#0,?0,3,12 found zero, check next
//     // 1,#0,0,?3,12 digit found
//     // 1,#3,0,?0,12 swap
//     // 1,3,#0,0,12  iterate, found zero, check next
//     // 1,3,#0,?0,12 found zero, check next
//     // 1,3,#0,0,?12 digit found
//     // 1,3,#12,0,?0 swap
//     // 1,3,12,#0,0  iterate, found zero, check next
//     // 1,3,12,#0,?0 found zero, check next
//     //            - last element was also zero, exit

//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] === 0) {
//             // found a first zero

//             let nextDigitIdx = findNextDigitIdx(nums, i);
//             if (nextDigitIdx < 0) {
//                 // rest of nums filled with zeros

//                 return;
//             }
//             swap(nums, i, nextDigitIdx);
//         }
//     }
// };

function findNextDigitIdx(nums: number[], startIdx: number): number {
    for (let j = startIdx; j < nums.length; j++) {
        if (nums[j] !== 0) return j;
    }

    return -1;
}

function findNextZeroIdx(nums: number[], startIdx: number): number {
    for (let j = startIdx; j < nums.length; j++) {
        if (nums[j] === 0) return j;
    }

    return -1;
}

function swap(nums: number[], aIdx: number, bIdx: number): void {
    const tmp = nums[aIdx];
    nums[aIdx] = nums[bIdx];
    nums[bIdx] = tmp;
}

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    let digitIdxPtr = 0;
    let zeroIdxPtr = 0;

    while (digitIdxPtr < nums.length && zeroIdxPtr < nums.length) {
        digitIdxPtr = findNextDigitIdx(nums, digitIdxPtr);
        zeroIdxPtr = findNextZeroIdx(nums, zeroIdxPtr);

        if (digitIdxPtr >= 0 && zeroIdxPtr >= 0) {
            if (digitIdxPtr > zeroIdxPtr) {
                // don't move digits behind zero
                swap(nums, digitIdxPtr, zeroIdxPtr);
            }
            digitIdxPtr++;
        } else if (zeroIdxPtr < 0 || digitIdxPtr < 0) {
            // no more zeroes or digits left
            break;
        }

    }
};

const testExamples: [number[], number[]][] = [
    [[0, 1, 0, 3, 12], [1, 3, 12, 0, 0]],
    [[0], [0]],
    [[1, 0], [1, 0]],
    [[0, 0, 1, 0, 0], [1, 0, 0, 0, 0]],
];

check(testExamples, moveZeroes);