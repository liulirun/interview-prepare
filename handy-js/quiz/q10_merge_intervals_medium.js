/**
 * Q10) Merge Intervals
 *
 * AI-BEST:
 * Sort by start, then sweep and merge in one pass.
 * Time: O(n log n), Space: O(n) output
 *
 * AI-EASY:
 * Repeatedly scan and merge any pair that overlaps until stable.
 * Time: O(n^2) or worse, Space: O(n)
 */

function mergeIntervalsBest(intervals) {
  // Edge Case: If empty or single, return a shallow copy to maintain immutability
  if (intervals.length <= 1) return intervals.map((x) => [...x]);

  // 1. Sort by START time.
  // Crucial: Use map([...x]) to avoid mutating the input (Interviewer favorite!)
  const sorted = intervals.map((x) => [...x]).sort((a, b) => a[0] - b[0]);

  // 2. Initialize the result with the first interval
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    // Always compare 'current' with the 'last' element added to our result
    const last = merged[merged.length - 1];

    // 3. Check for overlap: current start <= last end
    if (current[0] <= last[1]) {
      // Overlap found! Update the end time to the furthest point reached
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap: Push current as a new independent interval
      merged.push(current);
    }
  }
  return merged;
}

function mergeIntervalsEasy(intervals) {
  let list = intervals.map((x) => [...x]);
  let changed = true;

  while (changed) {
    changed = false;
    outer: for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (overlaps(list[i], list[j])) {
          const merged = [
            Math.min(list[i][0], list[j][0]),
            Math.max(list[i][1], list[j][1]),
          ];

          // Replace i with merged and remove j.
          list[i] = merged;
          list.splice(j, 1);
          changed = true;
          break outer;
        }
      }
    }
  }

  return list.sort((a, b) => a[0] - b[0]);
}

function overlaps(a, b) {
  return a[0] <= b[1] && b[0] <= a[1];
}

function runDemo() {
  console.log("Q10: Merge Intervals");
  const cases = [
    [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ],
    [
      [1, 4],
      [4, 5],
    ],
    [
      [1, 4],
      [0, 2],
      [3, 5],
    ],
  ];

  for (const intervals of cases) {
    console.log(`Input: ${JSON.stringify(intervals)}`);
    console.log("  BEST:", JSON.stringify(mergeIntervalsBest(intervals)));
    console.log("  EASY:", JSON.stringify(mergeIntervalsEasy(intervals)));
  }
}

runDemo();
