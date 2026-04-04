/**
 * ALGORITHMS EXAMPLES (JS)
 *
 * Topics:
 * - Search: linear, binary
 * - Sort: bubble, merge
 * - Recursion: factorial
 *
 * Big-O quick notes:
 * - Linear search: O(n)
 * - Binary search: O(log n), sorted input required
 * - Bubble sort: O(n^2)
 * - Merge sort: O(n log n)
 * - Recursive factorial: O(n) time, O(n) call stack
 *
 * Pro tips:
 * - State assumptions before coding (binary search needs sorted input).
 * - Compare simple vs optimal approaches and explain tradeoffs.
 */

// O(n)
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) return i;
  }
  return -1;
}

// O(log n), input must be sorted.
function binarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = sortedArray[mid];

    if (value === target) return mid;
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(n^2), simple but not ideal for large arrays.
function bubbleSort(array) {
  const out = [...array];
  for (let i = 0; i < out.length; i++) {
    let swapped = false;
    for (let j = 0; j < out.length - 1 - i; j++) {
      if (out[j] > out[j + 1]) {
        [out[j], out[j + 1]] = [out[j + 1], out[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return out;
}

// O(n log n)
function mergeSort(array) {
  if (array.length <= 1) return [...array];
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const out = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }

  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}

// O(n) time, O(n) call stack.
function factorialRecursive(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

module.exports = {
  linearSearch,
  binarySearch,
  bubbleSort,
  mergeSort,
  factorialRecursive,
};
