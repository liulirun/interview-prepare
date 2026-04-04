/**
 * LONGEST PALINDROME (expand around center), O(n^2)
 */
function longestPalindromeExpand(s: string): string {
  let best = "";

  for (let i = 0; i < s.length; i++) {
    const odd = expandAroundCenter(s, i, i);
    const even = expandAroundCenter(s, i, i + 1);
    if (odd.length > best.length) best = odd;
    if (even.length > best.length) best = even;
  }

  return best;
}

function expandAroundCenter(s: string, left: number, right: number): string {
  let l = left;
  let r = right;
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return s.slice(l + 1, r);
}

console.log(longestPalindromeExpand("baabad"));

export {};

