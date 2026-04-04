/**
 * Q1) Minimum Window Substring
 *
 * AI-BEST:
 * Sliding window + frequency maps.
 * Time: O(n + m), Space: O(k)
 *
 * AI-EASY:
 * Try all substrings and validate each one.
 * Time: O(n^3) naive, Space: O(k)
 */

function minWindowBest(s, t) {
  // Step 0 (BEST - extra): guard invalid input.
  // Reason: not listed in quiz.md Q1 steps, but needed to prevent unnecessary work and edge-case bugs.
  if (!s || !t) return "";

  // Step 1 (BEST): build required frequency map from t. (matches quiz.md Q1)
  const need = new Map();
  for (const ch of t) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
  }

  const required = need.size;
  let formed = 0;
  let left = 0;
  const windowCounts = new Map();

  let bestLen = Number.POSITIVE_INFINITY;
  let bestL = 0;
  let bestR = 0;

  // Step 2 (BEST): expand right pointer over s. (matches quiz.md Q1)
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    windowCounts.set(ch, (windowCounts.get(ch) ?? 0) + 1);

    if (need.has(ch) && windowCounts.get(ch) === need.get(ch)) {
      formed++;
    }

    // Step 3 (BEST): shrink from left while window remains valid. (matches quiz.md Q1)
    while (left <= right && formed === required) {
      // Step 4 (BEST): track the smallest valid window. (matches quiz.md Q1)
      const len = right - left + 1;
      if (len < bestLen) {
        bestLen = len;
        bestL = left;
        bestR = right;
      }

      const leftChar = s[left];
      windowCounts.set(leftChar, (windowCounts.get(leftChar) ?? 0) - 1);
      if (
        need.has(leftChar) &&
        (windowCounts.get(leftChar) ?? 0) < (need.get(leftChar) ?? 0)
      ) {
        formed--;
      }
      left++;
    }
  }

  return bestLen === Number.POSITIVE_INFINITY ? "" : s.slice(bestL, bestR + 1);
}

function minWindowEasy(s, t) {
  // Step 0 (EASY - extra): guard invalid input.
  // Reason: not listed in quiz.md Q1 steps, but needed to avoid invalid brute-force loops.
  if (!s || !t || t.length > s.length) return "";

  let best = "";

  // Step 1 (EASY): generate all substrings of s. (matches quiz.md Q1)
  for (let start = 0; start < s.length; start++) {
    for (let end = start; end < s.length; end++) {
      const candidate = s.slice(start, end + 1);
      // Step 2 (EASY): check if substring covers all chars in t. (matches quiz.md Q1)
      if (coversAll(candidate, t)) {
        // Step 3 (EASY): keep shortest valid candidate. (matches quiz.md Q1)
        if (best === "" || candidate.length < best.length) {
          best = candidate;
        }
      }
    }
  }

  return best;
}

// AI-EASY-HELPER
function coversAll(windowStr, t) {
  // Step 1 (EASY-HELPER): count chars from current substring.
  const counts = new Map();
  for (const ch of windowStr) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  // Step 2 (EASY-HELPER): consume required chars from t.
  for (const ch of t) {
    const chLeft = (counts.get(ch) ?? 0) - 1;
    if (chLeft < 0) return false;
    counts.set(ch, chLeft);
  }
  return true;
}

function runDemo() {
  console.log("Q1: Minimum Window Substring");
  const samples = [
    { s: "ADOBECODEBANC", t: "ABC" },
    { s: "a", t: "a" },
    { s: "a", t: "aa" },
  ];

  for (const { s, t } of samples) {
    console.log(`Input: s="${s}", t="${t}"`);
    // console.log("  BEST:", minWindowBest(s, t));
    console.log("  EASY:", minWindowEasy(s, t));
  }
}

runDemo();
