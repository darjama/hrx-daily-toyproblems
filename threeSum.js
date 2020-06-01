var threeSum = function(nums) {
  nums.sort((a,b) => a-b)
  let x,y,z;
  let result = [];
  for (x = 0; x < nums.length; x++) {
    if (nums[x] > 0) break;
    if (nums[x] === nums[x-1]) continue;
    y = x + 1
    z = nums.length -1;
    while (y < z) {
      let current = [nums[x], nums[y], nums[z]]
      if (nums[x] + nums[y] + nums[z] === 0) {
        result.push(current);
        y++;
        while(nums[y] === nums[y-1]) y++;
        z--;
        while(nums[z] === nums[z+1]) z++;
      }
      while(-nums[x] - nums[y] > nums[z]) y++;
      while(-nums[x] - nums[y] < nums[z]) z--;
      } 
    }
  return result;
};

/**
 * 3Sum
 * Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
 * 
 * Note:
 * The solution set must not contain duplicate triplets.
 * 
 * Example:
 * Given array nums = [-1, 0, 1, 2, -1, -4],
 * 
 * A solution set is:
 * [
 *   [-1, 0, 1],
 *   [-1, -1, 2]
 * ]
 * @param {number[]} nums
 * @return {number[][]}
 */
