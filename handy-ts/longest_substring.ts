/**
 * LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS (simple window string version)
 */
function getLongestSubstringSimple(s: string): string {
  let currentWindow = "";
  let longestFound = "";

  for (const char of s) {
    const duplicateIndex = currentWindow.indexOf(char);
    if (duplicateIndex >= 0) {
      currentWindow = currentWindow.slice(duplicateIndex + 1) + char;
    } else {
      currentWindow += char;
    }

    if (currentWindow.length > longestFound.length) {
      longestFound = currentWindow;
    }
  }

  return longestFound;
}

console.log(getLongestSubstringSimple("abcdbcabcbb"));

export {};

