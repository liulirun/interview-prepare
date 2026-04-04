/**
 * Q1) Minimum Window Substring
 *
 * AI-BEST:
 * Sliding window + frequency maps.
 * Time: O(n + m), Space: O(k)
 *
 * AI-EASY:
 * Try all substrings + validate each.
 * Time: O(n^3) naive, Space: O(k)
 */

function minWindowBest(s: string, t: string): string {
  if (!s || !t) return "";

  const need = new Map<string, number>();
  for (const ch of t) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
  }

  const required = need.size;
  let formed = 0;
  let left = 0;
  const windowCounts = new Map<string, number>();

  let bestLen = Number.POSITIVE_INFINITY;
  let bestL = 0;
  let bestR = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    windowCounts.set(ch, (windowCounts.get(ch) ?? 0) + 1);

    if (need.has(ch) && windowCounts.get(ch) === need.get(ch)) {
      formed++;
    }

    while (left <= right && formed === required) {
      const len = right - left + 1;
      if (len < bestLen) {
        bestLen = len;
        bestL = left;
        bestR = right;
      }

      const leftChar = s[left];
      windowCounts.set(leftChar, (windowCounts.get(leftChar) ?? 0) - 1);
      if (need.has(leftChar) && (windowCounts.get(leftChar) ?? 0) < (need.get(leftChar) ?? 0)) {
        formed--;
      }
      left++;
    }
  }

  return bestLen === Number.POSITIVE_INFINITY ? "" : s.slice(bestL, bestR + 1);
}

function minWindowEasy(s: string, t: string): string {
  if (!s || !t || t.length > s.length) return "";

  let best = "";
  for (let start = 0; start < s.length; start++) {
    for (let end = start; end < s.length; end++) {
      const candidate = s.slice(start, end + 1);
      if (coversAll(candidate, t)) {
        if (best === "" || candidate.length < best.length) {
          best = candidate;
        }
      }
    }
  }
  return best;
}

function coversAll(candidate: string, t: string): boolean {
  const counts = new Map<string, number>();
  for (const ch of candidate) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  for (const ch of t) {
    const next = (counts.get(ch) ?? 0) - 1;
    if (next < 0) return false;
    counts.set(ch, next);
  }
  return true;
}

function runDemo(): void {
  console.log("Q1: Minimum Window Substring");
  const samples = [
    { s: "ADOBECODEBANC", t: "ABC" },
    { s: "a", t: "a" },
    { s: "a", t: "aa" },
  ];
  for (const { s, t } of samples) {
    console.log(`Input: s="${s}", t="${t}"`);
    console.log("  BEST:", minWindowBest(s, t));
    console.log("  EASY:", minWindowEasy(s, t));
  }
}

runDemo();

export {};

