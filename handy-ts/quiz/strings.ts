/**
 * MINIMUM WINDOW SUBSTRING
 */
function minWindow(s: string, t: string): string {
  if (!s || !t) return "";

  const need = new Map<string, number>();
  for (const char of t) {
    need.set(char, (need.get(char) ?? 0) + 1);
  }

  const required = need.size;
  let formed = 0;
  let left = 0;
  const windowCounts = new Map<string, number>();
  let bestLength = Number.POSITIVE_INFINITY;
  let bestL = 0;
  let bestR = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) ?? 0) + 1);

    if (need.has(char) && windowCounts.get(char) === need.get(char)) {
      formed++;
    }

    while (left <= right && formed === required) {
      if (right - left + 1 < bestLength) {
        bestLength = right - left + 1;
        bestL = left;
        bestR = right;
      }

      const leftChar = s[left];
      windowCounts.set(leftChar, (windowCounts.get(leftChar) ?? 0) - 1);
      if (need.has(leftChar) && (windowCounts.get(leftChar) ?? 0) < (need.get(leftChar) ?? 0)) {
        formed--;
      }
      left++;
    }
  }

  return bestLength === Number.POSITIVE_INFINITY ? "" : s.slice(bestL, bestR + 1);
}

console.log(minWindow("ADOBECODEBANC", "ABC"));

export {};

