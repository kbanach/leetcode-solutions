/**
 * https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/727/
 *  
 * Remove Duplicates from Sorted Array
 * 
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates 
 * in-place such that each unique element appears only once. The relative order of the 
 * elements should be kept the same.
 * 
 * Consider the number of unique elements in nums to be k​​​​​​​​​​​​​​. After removing duplicates, 
 * return the number of unique elements k.
 * 
 * The first k elements of nums should contain the unique numbers in sorted order. 
 * The remaining elements beyond index k - 1 can be ignored.
 * 
 * Example 1:
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * Explanation: Your function should return k = 2, with the first two elements of nums 
 * being 1 and 2 respectively. It does not matter what you leave beyond 
 * the returned k (hence they are underscores).
 * 
 * Example 2:
 * Input: nums = [0,0,1,1,1,2,2,3,3,4]
 * Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
 * Explanation: Your function should return k = 5, with the first five elements 
 * of nums being 0, 1, 2, 3, and 4 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 */

//// optymalna, inspirowana odpowiedziami:
function removeDuplicates(nums: number[]): number {
    let currentUniqueVal = nums[0];
    let currentUniqueIdx = 1;

    for (let i = 1; i < nums.length; i++) {
        if (currentUniqueVal !== nums[i]) {
            currentUniqueVal = nums[i];
            nums[currentUniqueIdx] = currentUniqueVal;
            currentUniqueIdx++;
        }
    }

    return currentUniqueIdx;
}

const testCase1 = [1, 1, 2];
const expected1 = [1, 2];
const testCase2 = [0,0,1,1,1,2,2,3,3,4];
const expected2 = [0, 1, 2, 3, 4];

console.log(`Run:`);
console.log(`test case 1:\t ${testCase1}`);
console.log(`output:     \t ${removeDuplicates(testCase1)}`);
console.log(`test case 1:\t ${testCase1}`);
console.log(`should be:  \t ${expected1}`);
console.log();
console.log(`test case 2:\t ${testCase2}`);
console.log(`output:     \t ${removeDuplicates(testCase2)}`);
console.log(`test case 2:\t ${testCase2}`);
console.log(`should be:  \t ${expected2}`);
