/**
 * Intersection of Two Arrays II
 * 
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/674/
 * 
 * Given two integer arrays `nums1` and `nums2`, return *an array of their intersection*. 
 * Each element in the result must appear as many times as it shows in both arrays 
 * and you may return the result in **any order**.
 * 
 * **Example 1:**
 *     Input: nums1 = [1,2,2,1], nums2 = [2,2]
 *     Output: [2,2]
 * 
 * **Example 2:**
 * 
 *     Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 *     Output: [4,9]
 *     Explanation: [9,4] is also accepted.
 * 
 * **Constraints:**
 * 
 * - `1 <= nums1.length, nums2.length <= 1000`
 * - `0 <= nums1[i], nums2[i] <= 1000`
 * 
 * **Follow up:**
 * 
 * - What if the given array is already sorted? How would you optimize your algorithm?
 * - What if `nums1`'s size is small compared to `nums2`'s size? Which algorithm is better?
 * - What if elements of `nums2` are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
 */
function intersect(nums1: number[], nums2: number[]): number[] {
    const nums1Occurences = new Map<number, number>();
    const intersection: number[] = [];

    for (let i = 0; i < nums1.length; i++) {
        if (nums1Occurences.has(nums1[i])) {
            nums1Occurences.set(nums1[i], nums1Occurences.get(nums1[i])! + 1)
        } else {
            nums1Occurences.set(nums1[i], 1);
        }
    }

    for (let j = 0; j < nums2.length; j++) {
        if (nums1Occurences.has(nums2[j])) {
            // decrease and remove key from nums1Occurences if value is less than 1
            const currentValue = nums1Occurences.get(nums2[j])!;
            if (currentValue > 1) {
                nums1Occurences.set(nums2[j], currentValue - 1);
            } else {
                nums1Occurences.delete(nums2[j]);
            }
            // add to intersection
            intersection.push(nums2[j]);
        } 
    }

    return intersection;
};