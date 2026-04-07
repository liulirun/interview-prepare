/**
 * Q19) Move Zeroes
 *
 * AI-BEST:
 * Stable in-place two-pointer compaction.
 * Time: O(n), Space: O(1)
 */

function moveZeroesBest(nums: number[]): number[] {
  let write = 0;

  // Step 1: Keep a write pointer because we want the next non-zero value to land in the next open slot.
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      // Step 2: Copy each non-zero forward because preserving order matters for this problem.
      nums[write] = nums[read];
      write++;
    }
  }

  // Step 3: Fill the remainder with zeroes because every non-zero has already been compacted to the front.
  while (write < nums.length) {
    nums[write] = 0;
    write++;
  }

  return nums;
}

function runDemo(): void {
  console.log("Q19: Move Zeroes");
  const cases = [
    [0, 1, 0, 3, 12],
    [0, 0, 1],
    [1, 2, 3],
  ];

  for (const nums of cases) {
    const working = [...nums];
    console.log(`Input: nums=${JSON.stringify(nums)}`);
    console.log("  BEST:", moveZeroesBest(working));
  }
}

runDemo();

export {};
