/**
 * Q10) Merge Intervals
 *
 * AI-BEST:
 * Sort by start and sweep once.
 * Time: O(n log n), Space: O(n)
 *
 * AI-EASY:
 * Repeated pairwise merge until stable.
 * Time: O(n^2) or worse, Space: O(n)
 */

type Interval = [number, number];

function mergeIntervalsBest(intervals: Interval[]): Interval[] {
  if (intervals.length <= 1) return intervals.map((x) => [...x] as Interval);

  const sorted = intervals.map((x) => [...x] as Interval).sort((a, b) => a[0] - b[0]);
  const merged: Interval[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}

function mergeIntervalsEasy(intervals: Interval[]): Interval[] {
  const arr = intervals.map((x) => [...x] as Interval);
  let changed = true;

  while (changed) {
    changed = false;
    outer: for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (overlap(arr[i], arr[j])) {
          arr[i] = [Math.min(arr[i][0], arr[j][0]), Math.max(arr[i][1], arr[j][1])];
          arr.splice(j, 1);
          changed = true;
          break outer;
        }
      }
    }
  }
  return arr.sort((a, b) => a[0] - b[0]);
}

function overlap(a: Interval, b: Interval): boolean {
  return a[0] <= b[1] && b[0] <= a[1];
}

function runDemo(): void {
  console.log("Q10: Merge Intervals");
  const cases: Interval[][] = [
    [[1, 3], [2, 6], [8, 10], [15, 18]],
    [[1, 4], [4, 5]],
    [[1, 4], [0, 2], [3, 5]],
  ];

  for (const intervals of cases) {
    console.log(`Input: ${JSON.stringify(intervals)}`);
    console.log("  BEST:", JSON.stringify(mergeIntervalsBest(intervals)));
    console.log("  EASY:", JSON.stringify(mergeIntervalsEasy(intervals)));
  }
}

runDemo();

export {};
