/**
 * Q3) First Non-Repeating Character Index
 *
 * AI-BEST:
 * Two passes with frequency map.
 * Time: O(n), Space: O(k)
 */

function firstUniqueCharIndexBest(input) {
  // Step 1 (BEST): build frequency map.
  const counts = new Map();
  for (const ch of input) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  // Step 2 (BEST): return first index with count 1.
  for (let i = 0; i < input.length; i++) {
    if ((counts.get(input[i]) ?? 0) === 1) return i;
  }
  return -1;
}

function runDemo() {
  console.log("Q3: First Non-Repeating Character Index");
  const samples = ["aabcc", "aacc", "leetcode", "aabbccd"];

  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", firstUniqueCharIndexBest(s));
  }
}

runDemo();
