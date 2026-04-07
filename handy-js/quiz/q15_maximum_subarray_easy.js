/**
 * Q15) Maximum Subarray
 *
 * AI-BEST:
 * Kadane's algorithm.
 * Time: O(n), Space: O(1)
 */

function maxSubarrayBest(nums) {
  if (nums.length === 0) return 0;

  // Step 1: Start with the first value as both current and best sum.
  // Why: this correctly handles arrays with all negative numbers.
  let currentSum = nums[0];
  let bestSum = nums[0];

  // Step 2: For each value, choose extend vs restart.
  // Why: optimal subarray ending at i depends only on ending at i - 1.
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    bestSum = Math.max(bestSum, currentSum);
  }

  // Step 3: Return the best sum found.
  return bestSum;
}

function runDemo() {
  console.log("Q15: Maximum Subarray");
  const cases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1],
    [5, 4, -1, 7, 8],
    [-3, -2, -7],
  ];

  for (const nums of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}`);
    console.log("  BEST:", maxSubarrayBest(nums));
  }
}

runDemo();
