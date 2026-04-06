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
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [value, count] of freq.entries()) {
    buckets[count].push(value);
  }

  const result = [];
  for (
    let count = buckets.length - 1;
    count >= 0 && result.length < k;
    count--
  ) {
    for (const value of buckets[count]) {
      result.push(value);
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
