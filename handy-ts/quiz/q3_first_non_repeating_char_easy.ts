/**
 * Q3) First Non-Repeating Character Index
 *
 * AI-BEST:
 * Two pass frequency map.
 * Time: O(n), Space: O(k)
 *
 * AI-EASY:
 * Nested loops for counting each char.
 * Time: O(n^2), Space: O(1) extra
 */

function firstUniqueCharIndexBest(input: string): number {
  const counts = new Map<string, number>();
  for (const char of input) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (let i = 0; i < input.length; i++) {
    if ((counts.get(input[i]) ?? 0) === 1) return i;
  }
  return -1;
}

function firstUniqueCharIndexEasy(input: string): number {
  for (let i = 0; i < input.length; i++) {
    let count = 0;
    for (let j = 0; j < input.length; j++) {
      if (input[i] === input[j]) count++;
    }
    if (count === 1) return i;
  }
  return -1;
}

function runDemo(): void {
  console.log("Q3: First Non-Repeating Character Index");
  const samples = ["aabcc", "aacc", "leetcode", "aabbccd"];
  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", firstUniqueCharIndexBest(s));
    console.log("  EASY:", firstUniqueCharIndexEasy(s));
  }
}

runDemo();

export {};

