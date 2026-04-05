/**
 * Q8) Two Sum
 *
 * AI-BEST:
 * One-pass map value -> index.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Nested loops over pairs.
 * Time: O(n^2), Space: O(1)
 */

function twoSumBest(nums: number[], target: number): [number, number] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  return [-1, -1];
}

function twoSumEasy(nums: number[], target: number): [number, number] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [-1, -1];
}

function runDemo(): void {
  console.log("Q8: Two Sum");
  const cases = [
    { nums: [2, 7, 11, 15], target: 9 },
    { nums: [3, 2, 4], target: 6 },
    { nums: [3, 3], target: 6 },
  ];
  for (const { nums, target } of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}, target=${target}`);
    console.log("  BEST:", twoSumBest(nums, target));
    console.log("  EASY:", twoSumEasy(nums, target));
  }
}

runDemo();

export {};
