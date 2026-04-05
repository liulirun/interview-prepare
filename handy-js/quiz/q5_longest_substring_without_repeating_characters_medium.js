/**
 * Q5) Longest Substring Without Repeating Characters
 *
 * AI-BEST:
 * Sliding window + last seen index map.
 * Time: O(n), Space: O(k)
 *
 * AI-EASY:
 * Keep a window string and use indexOf/slice.
 * Time: can degrade to O(n^2), Space: moderate
 */

function longestSubstringBest(s) {
  // Step 1 (BEST): initialize sliding window state.
  // Use 'bestStart' and 'bestLen' to avoid expensive string slicing inside the loop.
  let left = 0;
  let bestStart = 0;
  let bestLen = 0;
  const lastSeen = new Map(); // Store { character: last_seen_index }

  // Step 2 (BEST): expand right pointer and shift left on in-window duplicates.
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    // JUMP LOGIC: If we see a character again, move 'left' past its previous position.
    // The check '>= left' ensures we only care about duplicates WITHIN the current window.
    if (lastSeen.has(ch) && (lastSeen.get(ch) ?? -1) >= left) {
      //To make the window valid again, you have to "kick out" the first dup char
      // To kick out the first dup char, you must also kick out everything that came before it.
      left = (lastSeen.get(ch) ?? 0) + 1;
    }

    // Always update the latest position of the current character.
    lastSeen.set(ch, right);

    // Step 3 (BEST): Update global maximum if current window is larger.
    const currentLen = right - left + 1;
    if (currentLen > bestLen) {
      bestLen = currentLen;
      bestStart = left;
    }
  }

  // Final step: Slice once at the very end (O(N) time/space) to return the result.
  return s.slice(bestStart, bestStart + bestLen);
}
function longestSubstringEasy(s) {
  // Step 1 (EASY): keep mutable current window string.
  let currentWindow = "";
  let longestFound = "";

  // Step 2 (EASY): if duplicate appears, slice window after duplicate index.
  for (const ch of s) {
    const duplicateIndex = currentWindow.indexOf(ch);
    if (duplicateIndex >= 0) {
      currentWindow = currentWindow.slice(duplicateIndex + 1) + ch;
    } else {
      currentWindow += ch;
    }
    // Step 3 (EASY): track best window.
    if (currentWindow.length > longestFound.length) {
      longestFound = currentWindow;
    }
  }

  return longestFound;
}

function runDemo() {
  console.log("Q5: Longest Substring Without Repeating Characters");
  const samples = ["wpwkew"];
  // const samples = ["abcdbcabcbb", "bbbbb", "wpwkew", "", "au"];

  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", longestSubstringBest(s));
    console.log("  EASY:", longestSubstringEasy(s));
  }
}

runDemo();
