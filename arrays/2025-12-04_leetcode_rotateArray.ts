/**
 * Rotate Array
 * 
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/646/
 * 
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 *
 * Example 1:
 *
 * Input: nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 * Explanation:
 * rotate 1 steps to the right: [7,1,2,3,4,5,6]
 * rotate 2 steps to the right: [6,7,1,2,3,4,5]
 * rotate 3 steps to the right: [5,6,7,1,2,3,4]
 * Example 2:
 * Input: nums = [-1,-100,3,99], k = 2
 * Output: [3,99,-1,-100]
 * Explanation: 
 * rotate 1 steps to the right: [99,-1,-100,3]
 * rotate 2 steps to the right: [3,99,-1,-100]
 *
 * Constraints:
 * 1 <= nums.length <= 105
 * -231 <= nums[i] <= 231 - 1
 * 0 <= k <= 105

 * Follow up:
 * Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.
 * Could you do it in-place with O(1) extra space?
 * **/

let DEBUG = false;

function debug(log: string) {
    if (DEBUG) {
        console.log('\t' + log);
    }
}

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    const limitedMove =  k % nums.length ;
    const tail = nums.slice(limitedMove * -1);

    for (let i = (nums.length - 1) - tail.length; i >= 0; i--) {
        nums[i + tail.length] = nums[i];
    }

    for (let j = 0; j < tail.length; j++) {
        nums[j] = tail[j];
    }
};

const testExamples: [number[], number, number[]][] = [
    // [ input, k, output ]
    [[1, 2, 3, 4, 5, 6, 7], 3,  [5, 6, 7, 1, 2, 3, 4]],
    [[-1, -100, 3, 99],     2,  [3, 99, -1, -100]],
    [[-2, -1, 0, 1, 2],     2,  [1, 2, -2, -1, 0]],
    [[1,2],                 7,  [2, 1]]
];

DEBUG = true;

for (let test of testExamples) {
    console.log(`For input: \t${test[0]} \tK: ${test[1]}`);
    console.log(`Expects:   \t${test[2]}`);
    rotate(test[0], test[1]);
    console.log(`Run:       \t${test[0]}`);
    console.log('\n\n');
}