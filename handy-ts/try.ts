/**
 * Returns the index of the first non-repeating character, or -1 if none.
 */
function firstUniqueCharIndex(input: string): number {
  const counts = new Map<string, number>();
  for (const char of input) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (let i = 0; i < input.length; i++) {
    if ((counts.get(input[i]) ?? 0) === 1) {
      return i;
    }
  }
  return -1;
}

console.log(firstUniqueCharIndex("aabcc"));
console.log(firstUniqueCharIndex("aacc"));

export {};

