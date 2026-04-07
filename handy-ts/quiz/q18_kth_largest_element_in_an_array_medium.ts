/**
 * Q18) Kth Largest Element in an Array
 *
 * AI-BEST:
 * Quickselect partitions the array until the target index lands in place.
 * Time: O(n) average, O(n^2) worst case, Space: O(1) extra
 *
 * AI-EASY:
 * Sort descending and take the kth item.
 * Time: O(n log n), Space: depends on sort implementation
 */

function kthLargestBest(nums: number[], k: number): number {
  const arr = [...nums];
  const targetIndex = arr.length - k;
  let left = 0;
  let right = arr.length - 1;

  // Step 1: Partition around a pivot because quickselect only needs the side that contains the answer.
  while (left <= right) {
    const pivotIndex = partition(arr, left, right);

    // Step 2: Narrow to the side containing the target because the other side cannot contain the kth largest value.
    if (pivotIndex === targetIndex) {
      // Step 3: Stop immediately once the pivot lands on the target because that value is the answer.
      return arr[pivotIndex];
    }
    if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return -1;
}

function partition(arr: number[], left: number, right: number): number {
  const pivotValue = arr[right];
  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] <= pivotValue) {
      [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
      storeIndex++;
    }
  }

  [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
  return storeIndex;
}

function kthLargestEasy(nums: number[], k: number): number {
  // Step 1: Sort descending because the kth largest item then sits at index k - 1.
  const sorted = [...nums].sort((a, b) => b - a);

  // Step 2: Pick the target index because the order has already been fully established.
  const result = sorted[k - 1];

  // Step 3: Return the selected value because it is the requested kth largest element.
  return result;
}

function runDemo(): void {
  console.log("Q18: Kth Largest Element in an Array");
  const cases = [
    { nums: [3, 2, 1, 5, 6, 4], k: 2 },
    { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 },
    { nums: [1], k: 1 },
  ];

  for (const { nums, k } of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}, k=${k}`);
    console.log("  BEST:", kthLargestBest(nums, k));
    console.log("  EASY:", kthLargestEasy(nums, k));
  }
}

runDemo();

export {};
