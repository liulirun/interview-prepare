/**
 * Q13) Product of Array Except Self
 *
 * AI-BEST:
 * Prefix + suffix products in two passes, no division.
 * Time: O(n), Space: O(1) extra (excluding output)
 *
 * AI-EASY:
 * Nested loop: for each index, multiply every other value.
 * Time: O(n^2), Space: O(1) extra (excluding output)
 */

function productExceptSelfBest(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Step 1: Build prefix products.
  // Why: result[i] should include product of everything to the LEFT of i.
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Step 2: Multiply suffix products from right to left.
  // Why: now we fold in everything to the RIGHT of i.
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  // Step 3: Return final combined result.
  // Why: each index now has left-product * right-product = product except self.
  return result;
}

function productExceptSelfEasy(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Step 1: For each index i, compute product of all j != i.
  // Why: this is the most direct translation of the problem statement.
  for (let i = 0; i < n; i++) {
    let product = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) product *= nums[j];
    }

    // Step 2: Save the computed value for index i.
    // Why: each position needs its own independent product.
    result[i] = product;
  }

  // Step 3: Return all computed answers.
  return result;
}

function runDemo() {
  console.log("Q13: Product of Array Except Self");
  const cases = [
    [1, 2, 3, 4],
    [-1, 1, 0, -3, 3],
    [0, 4, 0],
    [5],
  ];

  for (const nums of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}`);
    console.log("  BEST:", JSON.stringify(productExceptSelfBest(nums)));
    console.log("  EASY:", JSON.stringify(productExceptSelfEasy(nums)));
  }
}

runDemo();
