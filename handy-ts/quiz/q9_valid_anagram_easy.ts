/**
 * Q9) Valid Anagram
 *
 * AI-BEST:
 * Frequency counting.
 * Time: O(n), Space: O(k)
 *
 * AI-EASY:
 * Sort and compare.
 * Time: O(n log n), Space: depends on runtime
 */

function isAnagramBest(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);

  for (const ch of t) {
    const next = (counts.get(ch) ?? 0) - 1;
    if (next < 0) return false;
    counts.set(ch, next);
  }

  for (const value of counts.values()) {
    if (value !== 0) return false;
  }
  return true;
}

function isAnagramEasy(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}

function runDemo(): void {
  console.log("Q9: Valid Anagram");
  const samples: Array<[string, string]> = [
    ["anagram", "nagaram"],
    ["rat", "car"],
    ["listen", "silent"],
  ];
  for (const [s, t] of samples) {
    console.log(`Input: s="${s}", t="${t}"`);
    console.log("  BEST:", isAnagramBest(s, t));
    console.log("  EASY:", isAnagramEasy(s, t));
  }
}

runDemo();

export {};
