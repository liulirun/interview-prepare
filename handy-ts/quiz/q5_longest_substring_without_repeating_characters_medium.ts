/**
 * Q5) Longest Substring Without Repeating Characters
 *
 * AI-BEST:
 * Sliding window + last seen index map.
 * Time: O(n), Space: O(k)
 *
 * AI-EASY:
 * Maintain current window string with indexOf/slicing.
 * Time: can degrade to O(n^2), Space: moderate
 */

function longestSubstringBest(s: string): string {
  let left = 0;
  let bestStart = 0;
  let bestLen = 0;
  const lastSeen = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && (lastSeen.get(ch) ?? -1) >= left) {
      left = (lastSeen.get(ch) ?? 0) + 1;
    }
    lastSeen.set(ch, right);

    const currentLen = right - left + 1;
    if (currentLen > bestLen) {
      bestLen = currentLen;
      bestStart = left;
    }
  }

  return s.slice(bestStart, bestStart + bestLen);
}

function longestSubstringEasy(s: string): string {
  let currentWindow = "";
  let longestFound = "";

  for (const ch of s) {
    const duplicateIndex = currentWindow.indexOf(ch);
    if (duplicateIndex >= 0) {
      currentWindow = currentWindow.slice(duplicateIndex + 1) + ch;
    } else {
      currentWindow += ch;
    }
    if (currentWindow.length > longestFound.length) {
      longestFound = currentWindow;
    }
  }
  return longestFound;
}

function runDemo(): void {
  console.log("Q5: Longest Substring Without Repeating Characters");
  const samples = ["abcdbcabcbb", "bbbbb", "pwwkew", "", "au"];
  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", longestSubstringBest(s));
    console.log("  EASY:", longestSubstringEasy(s));
  }
}

runDemo();

export {};

