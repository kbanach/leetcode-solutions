/**
 * Contains Duplicate
 * 
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/578/
 * 
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 * 
 * Example 1:
 * Input: nums = [1,2,3,1]
 * Output: true
 * Explanation:
 * The element 1 occurs at the indices 0 and 3.
 * 
 * Example 2:
 * Input: nums = [1,2,3,4]
 * Output: false
 * Explanation:
 * All elements are distinct.
 * 
 * Example 3:
 * Input: nums = [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 *  
 * Constraints:
 * 1 <= nums.length <= 105
 * -109 <= nums[i] <= 109
 */
function containsDuplicate(nums: number[]): boolean {
    const vals = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
        if (vals.has(nums[i])) {
            return true;
        }
        vals.add(nums[i]);
    }

    return false;
};

const testExamples: [number[], boolean][] = [
    // [ input, output ]
    [[1,2,3,1], true],
    [[1,2,3,4], false],
    [[1,1,1,3,3,4,3,2,4,2], true],
];

for (let test of testExamples) {
    console.log(`For input: \t${test[0]}`);
    console.log(`Expects:   \t${test[1]}`);
    console.log(`Run:       \t${containsDuplicate(test[0])}`);
    console.log('\n\n');
}