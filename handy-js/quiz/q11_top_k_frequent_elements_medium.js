/**
 * Q11) Top K Frequent Elements
 *
 * AI-BEST:
 * Frequency map + bucket sort by count.
 * Time: O(n) average, Space: O(n)
 *
 * AI-EASY:
 * Frequency map + sort by frequency descending.
 * Time: O(n log n), Space: O(n)
 */

function topKFrequentBest(nums, k) {
  // 1. Build a Frequency Map: Count how many times each number appears
  // Time: O(N), Space: O(N)
  const freq = new Map();
  for (const n of nums) {
    // Uses Nullish Coalescing (??) to handle undefined keys
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }

  // 2. Create Buckets: An array of arrays
  // The index represents the frequency (0 to nums.length)
  // Example: buckets[3] = [5, 10] means 5 and 10 both appeared 3 times
  const buckets = Array.from({ length: nums.length + 1 }, () => []);

  for (const [value, count] of freq.entries()) {
    buckets[count].push(value);
  }

  // 3. Collect Result: Iterate backwards from the highest frequency bucket
  const result = [];
  for (
    let count = buckets.length - 1; // Start from highest possible frequency
    count >= 0 && result.length < k;
    count--
  ) {
    // Pick all numbers that appeared 'count' times
    for (const value of buckets[count]) {
      result.push(value);
      // Stop exactly when we reach K elements
      if (result.length === k) break;
    }
  }

  return result;
}

function topKFrequentEasy(nums, k) {
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([value]) => value);
}

function runDemo() {
  console.log("Q11: Top K Frequent Elements");
  const cases = [
    // { nums: [1, 1, 1, 2, 2, 3], k: 2 },
    // { nums: [1], k: 1 },
    { nums: [4, 4, 2, 2, 2, 3, 3], k: 2 },
  ];

  for (const { nums, k } of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}, k=${k}`);
    console.log("  BEST:", topKFrequentBest(nums, k));
    // console.log("  EASY:", topKFrequentEasy(nums, k));
  }
}

runDemo();
