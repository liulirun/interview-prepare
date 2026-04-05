/**
 * Q18) Kth Largest Element in an Array
 *
 * AI-BEST:
 * Quickselect (partition-based selection).
 * Time: O(n) average, O(n^2) worst case; Space: O(1) extra
 *
 * AI-EASY:
 * Sort descending and take index k - 1.
 * Time: O(n log n), Space: depends on sort implementation
 */

function kthLargestBest(nums, k) {
  const arr = [...nums];
  const targetIndex = arr.length - k;
  let left = 0;
  let right = arr.length - 1;

  // Step 1: Partition until pivot lands on target index.
  // Why: Quickselect narrows search to only the relevant side.
  while (left <= right) {
    const pivotIndex = partition(arr, left, right);

    if (pivotIndex === targetIndex) return arr[pivotIndex];
    if (pivotIndex < targetIndex) left = pivotIndex + 1;
    else right = pivotIndex - 1;
  }

  return -1;
}

function partition(arr, left, right) {
  // Random pivot reduces chance of worst-case behavior on ordered inputs.
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
  const pivot = arr[right];

  let store = left;
  for (let i = left; i < right; i++) {
    if (arr[i] <= pivot) {
      [arr[i], arr[store]] = [arr[store], arr[i]];
      store++;
    }
  }

  [arr[store], arr[right]] = [arr[right], arr[store]];
  return store;
}

function kthLargestEasy(nums, k) {
  // Step 1: Sort descending.
  // Why: simplest path from problem statement to implementation.
  const sorted = [...nums].sort((a, b) => b - a);

  // Step 2: Return k-th element in 1-based terms.
  return sorted[k - 1];
}

function runDemo() {
  console.log("Q18: Kth Largest Element in an Array");
  const cases = [
    { nums: [3, 2, 1, 5, 6, 4], k: 2 },
    { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 },
    { nums: [9], k: 1 },
  ];

  for (const { nums, k } of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}, k=${k}`);
    console.log("  BEST:", kthLargestBest(nums, k));
    console.log("  EASY:", kthLargestEasy(nums, k));
  }
}

runDemo();
