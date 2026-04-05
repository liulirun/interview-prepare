/**
 * Q2) Compress String (Run-Length Encoding)
 *
 * AI-BEST:
 * Build chunks in an array and join once.
 * Time: O(n), Space: O(n)
 */

function compressStringBest(s) {
  // Step 1 (BEST): fast exit for empty input.
  if (!s) return "";

  const chunks = [];
  let count = 1;

  // Step 2 (BEST): scan once and build chunk list.
  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      chunks.push(`${s[i - 1]}${count}`);
      count = 1;
    }
  }

  // Step 3 (BEST): join once and return the shorter representation.
  const compressed = chunks.join("");
  return compressed.length < s.length ? compressed : s;
}

function runDemo() {
  console.log("Q2: Compress String");
  const samples = ["aabcccccaaa", "abc", "", "aaAA"];

  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", compressStringBest(s));
  }
}

runDemo();
