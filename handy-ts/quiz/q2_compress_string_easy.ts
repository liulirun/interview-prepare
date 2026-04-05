/**
 * Q2) Compress String (Run-Length Encoding)
 *
 * AI-BEST:
 * Build chunks in array and join once.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Build result by direct string concatenation.
 * Time: can degrade to O(n^2), Space: O(n)
 */

function compressStringBest(s: string): string {
  if (!s) return "";

  const chunks: string[] = [];
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      chunks.push(`${s[i - 1]}${count}`);
      count = 1;
    }
  }

  const compressed = chunks.join("");
  return compressed.length < s.length ? compressed : s;
}

function compressStringEasy(s: string): string {
  if (!s) return "";

  let result = "";
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      result += `${s[i - 1]}${count}`;
      count = 1;
    }
  }

  return result.length < s.length ? result : s;
}

function runDemo(): void {
  console.log("Q2: Compress String");
  const samples = ["aabcccccaaa", "abc", "", "aaAA"];
  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", compressStringBest(s));
    console.log("  EASY:", compressStringEasy(s));
  }
}

runDemo();

export {};
