/**
 * Q12) Binary Search (Find First Occurrence)
 *
 * AI-BEST:
 * Modified binary search keeps searching left on match.
 * Time: O(log n), Space: O(1)
 */

function firstOccurrenceBest(nums: number[], target: number): number {
  // Step 1: Run binary search because the array is sorted and each probe can discard half the range.
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      // Step 2: Record the match and keep searching left because we want the first occurrence.
      answer = mid;
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  // Step 3: Return the stored answer because it is the leftmost target index we discovered.
  return answer;
}

function runDemo(): void {
  console.log("Q12: Binary Search First Occurrence");
  const cases = [
    { nums: [1, 2, 2, 2, 3, 4], target: 2 },
    { nums: [1, 3, 5, 7], target: 4 },
    { nums: [8, 8, 8, 8], target: 8 },
  ];

  for (const { nums, target } of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}, target=${target}`);
    console.log("  BEST:", firstOccurrenceBest(nums, target));
  }
}

runDemo();

export {};
