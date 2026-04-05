/**
 * Q12) Binary Search (Find First Occurrence)
 *
 * AI-BEST:
 * Modified binary search that keeps moving left on match.
 * Time: O(log n), Space: O(1)
 *
 * AI-EASY:
 * Find any match with binary search, then walk left.
 * Time: O(log n + m), worst O(n), Space: O(1)
 */

function firstOccurrenceBest(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      answer = mid;
      right = mid - 1; // keep searching left side
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return answer;
}

function firstOccurrenceEasy(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let found = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      found = mid;
      break;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (found === -1) return -1;
  while (found > 0 && nums[found - 1] === target) {
    found--;
  }
  return found;
}

function runDemo() {
  console.log("Q12: Binary Search First Occurrence");
  const cases = [
    { nums: [1, 2, 2, 2, 3, 4], target: 2 },
    { nums: [1, 3, 5, 7], target: 4 },
    { nums: [8, 8, 8, 8], target: 8 },
  ];

  for (const { nums, target } of cases) {
    console.log(`Input: nums=${JSON.stringify(nums)}, target=${target}`);
    console.log("  BEST:", firstOccurrenceBest(nums, target));
    console.log("  EASY:", firstOccurrenceEasy(nums, target));
  }
}

runDemo();
