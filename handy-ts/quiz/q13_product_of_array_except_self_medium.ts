/**
 * Q13) Product of Array Except Self
 *
 * AI-BEST:
 * Prefix and suffix products in one output array.
 * Time: O(n), Space: O(1) extra
 *
 * AI-EASY:
 * Recompute the product for each index with nested loops.
 * Time: O(n^2), Space: O(1) extra
 */

function productExceptSelfBest(nums: number[]): number[] {
  // Step 1: Build prefix products because each position needs the product of values on its left.
  const result = new Array<number>(nums.length).fill(1);
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Step 2: Sweep from the right with a suffix product because each position also needs the product on its right.
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  // Step 3: Return the combined result because prefix and suffix together represent "all except self".
  return result;
}

function productExceptSelfEasy(nums: number[]): number[] {
  const result: number[] = [];

  // Step 1: For each index, walk the whole array because we are intentionally using the simplest brute-force idea.
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      product *= nums[j];
    }

    // Step 2: Store the computed product because each position is independent in this brute-force version.
    result.push(product);
  }

  // Step 3: Return all per-index products because the output array is the requested answer.
  return result;
}

function runDemo(): void {
  console.log("Q13: Product of Array Except Self");
  const cases = [
    [1, 2, 3, 4],
    [0, 1, 2, 3],
    [2, 2, 2, 2],
  ];

  for (const nums of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}`);
    console.log("  BEST:", productExceptSelfBest(nums));
    console.log("  EASY:", productExceptSelfEasy(nums));
  }
}

runDemo();

export {};
