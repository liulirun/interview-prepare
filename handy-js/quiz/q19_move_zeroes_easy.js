/**
 * Q19) Move Zeroes
 *
 * AI-BEST:
 * Two pointers (read/write) in-place.
 * Time: O(n), Space: O(1)
 */

function moveZeroesBest(nums) {
  // Step 1: Move non-zero values forward with a write pointer.
  // Why: preserves relative order of non-zero elements.
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read];
      write++;
    }
  }

  // Step 2: Fill remaining tail with zeroes.
  // Why: all valid non-zero values are already compacted at the front.
  while (write < nums.length) {
    nums[write] = 0;
    write++;
  }

  // Step 3: Return array for easier demo printing.
  return nums;
}

function runDemo() {
  console.log("Q19: Move Zeroes");
  const cases = [
    [0, 1, 0, 3, 12],
    [0],
    [4, 1, 2],
    [0, 0, 0, 5],
  ];

  for (const nums of cases) {
    const copy = [...nums];
    console.log(`Input: nums=${JSON.stringify(nums)}`);
    console.log("  BEST:", JSON.stringify(moveZeroesBest(copy)));
  }
}

runDemo();
