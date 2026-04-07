/**
 * Q14) Group Anagrams
 *
 * AI-BEST:
 * Sort each word into a canonical key and bucket by that key.
 * Time: O(n * k log k), Space: O(n * k)
 *
 * AI-EASY:
 * Compare each word against existing groups using a character-count signature.
 * Time: O(n^2 * k) worst case, Space: O(n * k)
 */

function groupAnagramsBest(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  // Step 1: Turn each word into a sorted key because anagrams share the same letter order after sorting.
  for (const word of strs) {
    const key = word.split("").sort().join("");

    // Step 2: Bucket by key because equal signatures should live in the same group.
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(word);
  }

  // Step 3: Return all buckets because each bucket already represents one anagram family.
  return [...groups.values()];
}

function groupAnagramsEasy(strs: string[]): string[][] {
  type Group = { signature: string; words: string[] };
  const groups: Group[] = [];

  // Step 1: Build a character-count signature for each word because we want a comparison that reflects letter frequency.
  for (const word of strs) {
    const signature = countSignature(word);
    let matchedGroup: Group | undefined;

    // Step 2: Compare against existing groups because the easy version makes the grouping decision by scanning what we already have.
    for (const group of groups) {
      if (group.signature === signature) {
        matchedGroup = group;
        break;
      }
    }

    if (matchedGroup) {
      matchedGroup.words.push(word);
    } else {
      groups.push({ signature, words: [word] });
    }
  }

  // Step 3: Return only the grouped words because the helper signatures are just temporary bookkeeping.
  return groups.map((group) => group.words);
}

function countSignature(word: string): string {
  const counts = new Map<string, number>();
  for (const ch of word) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ch, count]) => `${ch}:${count}`)
    .join("|");
}

function runDemo(): void {
  console.log("Q14: Group Anagrams");
  const cases = [
    ["eat", "tea", "tan", "ate", "nat", "bat"],
    [""],
    ["a"],
  ];

  for (const strs of cases) {
    console.log(`Input: strs=${JSON.stringify(strs)}`);
    console.log("  BEST:", groupAnagramsBest(strs));
    console.log("  EASY:", groupAnagramsEasy(strs));
  }
}

runDemo();

export {};
