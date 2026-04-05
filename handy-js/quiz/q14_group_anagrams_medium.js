/**
 * Q14) Group Anagrams
 *
 * AI-BEST:
 * Canonical key (sorted characters) + hash map groups.
 * Time: O(n * k log k), Space: O(n * k)
 *
 * AI-EASY:
 * Compare each word with existing groups using character counts.
 * Time: O(n^2 * k), Space: O(n * k)
 */

function groupAnagramsBest(words) {
  // Step 1: Build groups using a canonical key.
  // Why: all anagrams share the same sorted-character representation.
  const groupsByKey = new Map();

  for (const word of words) {
    const key = word.split("").sort().join("");
    if (!groupsByKey.has(key)) groupsByKey.set(key, []);
    groupsByKey.get(key).push(word);
  }

  // Step 2: Return grouped values.
  // Why: map values already represent final grouped anagrams.
  return [...groupsByKey.values()];
}

function groupAnagramsEasy(words) {
  // Step 1: Keep a list of groups and place each word by manual comparison.
  // Why: straightforward mental model, even though it is slower.
  const groups = [];

  for (const word of words) {
    let placed = false;
    for (const group of groups) {
      if (isAnagramByCount(word, group[0])) {
        group.push(word);
        placed = true;
        break;
      }
    }

    // Step 2: If no matching group found, start a new one.
    if (!placed) groups.push([word]);
  }

  // Step 3: Return all groups.
  return groups;
}

function isAnagramByCount(a, b) {
  if (a.length !== b.length) return false;

  const count = new Map();
  for (const ch of a) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (const ch of b) {
    const next = (count.get(ch) ?? 0) - 1;
    if (next < 0) return false;
    count.set(ch, next);
  }

  for (const value of count.values()) {
    if (value !== 0) return false;
  }
  return true;
}

function runDemo() {
  console.log("Q14: Group Anagrams");
  const cases = [
    ["eat", "tea", "tan", "ate", "nat", "bat"],
    [""],
    ["a"],
    ["abc", "bca", "cab", "foo", "ofo"],
  ];

  for (const words of cases) {
    console.log(`Input: words=${JSON.stringify(words)}`);
    console.log("  BEST:", JSON.stringify(groupAnagramsBest(words)));
    console.log("  EASY:", JSON.stringify(groupAnagramsEasy(words)));
  }
}

runDemo();
