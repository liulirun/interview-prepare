/**
 * Q15) Maximum Subarray
 *
 * AI-BEST:
 * Kadane's algorithm tracks the best ending here and the best overall.
 * Time: O(n), Space: O(1)
 */

function maxSubArrayBest(nums: number[]): number {
  // Step 1: Start with the first value because any valid subarray must contain at least one element.
  let currentSum = nums[0];
  let bestSum = nums[0];

  // Step 2: At each number, either extend the previous subarray or start fresh because a negative prefix would only hurt us.
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // Step 3: Update the global best because the answer could end at any position.
    bestSum = Math.max(bestSum, currentSum);
  }

  return bestSum;
}

function runDemo(): void {
  console.log("Q15: Maximum Subarray");
  const cases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1],
    [-3, -2, -5],
  ];

  for (const nums of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}`);
    console.log("  BEST:", maxSubArrayBest(nums));
  }
}

runDemo();

export {};
