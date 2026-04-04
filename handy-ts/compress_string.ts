/**
 * COMPRESS STRING
 *
 * Example: "aabcccccaaa" -> "a2b1c5a3"
 */
function compressString(s: string): string {
  if (!s) return "";

  const chunks: string[] = [];
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    count += 1;
    if (i + 1 === s.length || s[i] !== s[i + 1]) {
      chunks.push(`${s[i]}${count}`);
      count = 0;
    }
  }

  const result = chunks.join("");
  return result.length < s.length ? result : s;
}

console.log(compressString("aabcccccaaa"));

export {};

