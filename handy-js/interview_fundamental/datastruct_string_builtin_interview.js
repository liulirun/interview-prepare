/**
 * STRING: common operations for interview practice
 */

const assert = require("node:assert/strict");

const COMMON_STRING_BUILTINS = [
  "charAt",
  "includes",
  "indexOf",
  "slice",
  "substring",
  "split",
  "replace",
  "replaceAll",
  "toLowerCase",
  "toUpperCase",
  "trim",
  "startsWith",
  "endsWith",
  "repeat",
  "match",
];

const COMMON_STRING_BUILTIN_EXAMPLES = [
  { method: "charAt", example: "'hello'.charAt(1);", result: "returns 'e'" },
  { method: "includes", example: "'interview'.includes('view');", result: "returns true" },
  { method: "indexOf", example: "'banana'.indexOf('na');", result: "returns 2" },
  { method: "slice", example: "'interview'.slice(0, 5);", result: "returns 'inter'" },
  { method: "substring", example: "'interview'.substring(5, 9);", result: "returns 'view'" },
  { method: "split", example: "'a,b,c'.split(',');", result: "returns ['a', 'b', 'c']" },
  { method: "replace", example: "'foo bar'.replace('bar', 'baz');", result: "returns 'foo baz'" },
  { method: "replaceAll", example: "'a-a-a'.replaceAll('-', ':');", result: "returns 'a:a:a'" },
  { method: "toLowerCase", example: "'HeLLo'.toLowerCase();", result: "returns 'hello'" },
  { method: "toUpperCase", example: "'HeLLo'.toUpperCase();", result: "returns 'HELLO'" },
  { method: "trim", example: "'  hello  '.trim();", result: "returns 'hello'" },
  { method: "startsWith", example: "'interview'.startsWith('inter');", result: "returns true" },
  { method: "endsWith", example: "'interview'.endsWith('view');", result: "returns true" },
  { method: "repeat", example: "'ha'.repeat(3);", result: "returns 'hahaha'" },
  { method: "match", example: "'a1b2'.match(/\\d/g);", result: "returns ['1', '2']" },
];

// Returns a curated list of common String built-in methods used in interviews.
function listCommonStringBuiltins() {
  return [...COMMON_STRING_BUILTINS];
}

// Returns example snippets for common String built-ins.
function listCommonStringBuiltinExamples() {
  return COMMON_STRING_BUILTIN_EXAMPLES.map((item) => ({ ...item }));
}

// Self-test: listCommonStringBuiltins
function testListCommonStringBuiltins() {
  const methods = listCommonStringBuiltins();
  assert.equal(methods.includes("split"), true);
  assert.equal(methods.includes("includes"), true);
}

// Self-test: listCommonStringBuiltinExamples
function testListCommonStringBuiltinExamples() {
  const examples = listCommonStringBuiltinExamples();
  assert.equal(examples.length, COMMON_STRING_BUILTINS.length);
  assert.equal(examples.some((item) => item.method === "replaceAll"), true);
}

// Lowercases and removes non-alphanumeric characters for normalized comparisons.
function normalizeAlphaNumLower(input) {
  return input.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Self-test: normalizeAlphaNumLower
function testNormalizeAlphaNumLower() {
  assert.equal(normalizeAlphaNumLower("A man, a plan!"), "amanaplan");
}

// Checks if two strings are anagrams after normalization.
// O(n) time, O(n) space.
function isAnagram(a, b) {
  const left = normalizeAlphaNumLower(a);
  const right = normalizeAlphaNumLower(b);
  if (left.length !== right.length) return false;

  const counts = new Map();
  for (const ch of left) {
    counts.set(ch, (counts.get(ch) || 0) + 1);
  }

  for (const ch of right) {
    const next = (counts.get(ch) || 0) - 1;
    if (next < 0) return false;
    if (next === 0) counts.delete(ch);
    else counts.set(ch, next);
  }

  return counts.size === 0;
}

// Self-test: isAnagram
function testIsAnagram() {
  assert.equal(isAnagram("Dormitory", "dirty room"), true);
  assert.equal(isAnagram("hello", "world"), false);
}

// Finds the longest shared starting substring among all words.
// O(n * m) time where m is prefix length compared each step.
function longestCommonPrefix(words) {
  if (words.length === 0) return "";

  let prefix = words[0];
  for (let i = 1; i < words.length; i++) {
    while (!words[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

// Self-test: longestCommonPrefix
function testLongestCommonPrefix() {
  assert.equal(longestCommonPrefix(["interview", "internet", "internal"]), "inter");
  assert.equal(longestCommonPrefix(["dog", "car"]), "");
}

// Reverses word order and collapses extra spaces.
// O(n) time, O(n) space.
function reverseWords(sentence) {
  return sentence.trim().split(/\s+/).reverse().join(" ");
}

// Self-test: reverseWords
function testReverseWords() {
  assert.equal(reverseWords("  senior   js   interview  "), "interview js senior");
}

// Checks palindrome status after normalization.
// O(n) time, O(1) extra space if ignoring normalized copy.
function isPalindromeNormalized(input) {
  const text = normalizeAlphaNumLower(input);
  let left = 0;
  let right = text.length - 1;

  while (left < right) {
    if (text[left] !== text[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Self-test: isPalindromeNormalized
function testIsPalindromeNormalized() {
  assert.equal(isPalindromeNormalized("A man, a plan, a canal: Panama"), true);
  assert.equal(isPalindromeNormalized("openai"), false);
}

// Returns first character that appears exactly once, or empty string if none.
// O(n) time, O(k) space where k is unique chars.
function firstNonRepeatingChar(input) {
  const counts = new Map();
  for (const ch of input) {
    counts.set(ch, (counts.get(ch) || 0) + 1);
  }
  for (const ch of input) {
    if (counts.get(ch) === 1) return ch;
  }
  return "";
}

// Self-test: firstNonRepeatingChar
function testFirstNonRepeatingChar() {
  assert.equal(firstNonRepeatingChar("swiss"), "w");
  assert.equal(firstNonRepeatingChar("aabbcc"), "");
}

function runSelfTests() {
  testListCommonStringBuiltins();
  testListCommonStringBuiltinExamples();
  testNormalizeAlphaNumLower();
  testIsAnagram();
  testLongestCommonPrefix();
  testReverseWords();
  testIsPalindromeNormalized();
  testFirstNonRepeatingChar();
}

if (require.main === module) {
  runSelfTests();
  console.log("Common String built-ins:", listCommonStringBuiltins().join(", "));
  console.log("String built-in examples:");
  for (const item of listCommonStringBuiltinExamples()) {
    console.log(`- ${item.method}: ${item.example} // ${item.result}`);
  }
  console.log("datastruct_string_builtin_interview.js self-tests passed");
}

module.exports = {
  listCommonStringBuiltins,
  listCommonStringBuiltinExamples,
  isAnagram,
  longestCommonPrefix,
  reverseWords,
  isPalindromeNormalized,
  firstNonRepeatingChar,
};
