/**
 * Q9) Valid Anagram
 *
 * AI-BEST:
 * Count chars from s, subtract with t, verify zero counts.
 * Time: O(n), Space: O(k)
 *
 * AI-EASY:
 * Sort both strings and compare.
 * Time: O(n log n), Space: depends on sort/runtime
 */

function isAnagramBest(s, t) {
  if (s.length !== t.length) return false;

  const counts = new Map();
  for (const ch of s) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  for (const ch of t) {
    const next = (counts.get(ch) ?? 0) - 1;
    if (next < 0) return false;
    counts.set(ch, next);
  }

  for (const v of counts.values()) {
    if (v !== 0) return false;
  }
  return true;
}

function isAnagramEasy(s, t) {
  if (s.length !== t.length) return false;
  const sortedS = s.split("").sort().join("");
  const sortedT = t.split("").sort().join("");
  return sortedS === sortedT;
}

function runDemo() {
  console.log("Q9: Valid Anagram");
  const cases = [
    ["anagram", "nagaram"],
    ["rat", "car"],
    ["listen", "silent"],
  ];

  for (const [s, t] of cases) {
    console.log(`Input: s="${s}", t="${t}"`);
    console.log("  BEST:", isAnagramBest(s, t));
    console.log("  EASY:", isAnagramEasy(s, t));
  }
}

runDemo();
