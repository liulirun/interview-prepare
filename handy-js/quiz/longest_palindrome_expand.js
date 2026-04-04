/**
 * Q4) Longest Palindromic Substring
 *
 * AI-BEST:
 * Manacher's algorithm (linear time).
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Expand around every center.
 * Time: O(n^2), Space: O(1) extra
 */

function longestPalindromeBest(s) {
  if (!s) return "";

  // Transform: "abba" -> "^#a#b#b#a#$"
  // This unifies odd/even palindromes into one format.
  const transformed = ["^"];
  for (const ch of s) {
    transformed.push("#", ch);
  }
  transformed.push("#", "$");

  const t = transformed.join("");
  const p = new Array(t.length).fill(0); // palindrome radius at each center
  let center = 0;
  let right = 0;

  for (let i = 1; i < t.length - 1; i++) {
    const mirror = 2 * center - i;
    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }

    while (t[i + 1 + p[i]] === t[i - 1 - p[i]]) {
      p[i]++;
    }

    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < p.length - 1; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }

  const start = Math.floor((centerIndex - maxLen) / 2);
  return s.slice(start, start + maxLen);
}

function longestPalindromeEasy(s) {
  if (!s) return "";
  let best = "";

  for (let i = 0; i < s.length; i++) {
    const odd = expandAroundCenter(s, i, i);
    const even = expandAroundCenter(s, i, i + 1);
    if (odd.length > best.length) best = odd;
    if (even.length > best.length) best = even;
  }

  return best;
}

function expandAroundCenter(s, left, right) {
  let l = left;
  let r = right;
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return s.slice(l + 1, r);
}

function runDemo() {
  console.log("Q4: Longest Palindromic Substring");
  const samples = ["baabad", "babad", "cbbd", "a", ""];

  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", longestPalindromeBest(s));
    console.log("  EASY:", longestPalindromeEasy(s));
  }
}

runDemo();
