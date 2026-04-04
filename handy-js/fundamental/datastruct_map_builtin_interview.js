/**
 * MAP: common operations for interview practice
 */

const assert = require("node:assert/strict");

const COMMON_MAP_BUILTINS = [
  "set",
  "get",
  "has",
  "delete",
  "clear",
  "keys",
  "values",
  "entries",
  "forEach",
];

const COMMON_MAP_BUILTIN_EXAMPLES = [
  {
    method: "set",
    example: "const m = new Map(); m.set('a', 1);",
    result: "m -> Map { 'a' => 1 }",
  },
  { method: "get", example: "new Map([['a', 1]]).get('a');", result: "returns 1" },
  { method: "has", example: "new Map([['a', 1]]).has('a');", result: "returns true" },
  {
    method: "delete",
    example: "const m = new Map([['a', 1]]); m.delete('a');",
    result: "returns true, m -> empty Map",
  },
  {
    method: "clear",
    example: "const m = new Map([['a', 1], ['b', 2]]); m.clear();",
    result: "m -> empty Map",
  },
  {
    method: "keys",
    example: "Array.from(new Map([['a', 1], ['b', 2]]).keys());",
    result: "returns ['a', 'b']",
  },
  {
    method: "values",
    example: "Array.from(new Map([['a', 1], ['b', 2]]).values());",
    result: "returns [1, 2]",
  },
  {
    method: "entries",
    example: "Array.from(new Map([['a', 1], ['b', 2]]).entries());",
    result: "returns [['a', 1], ['b', 2]]",
  },
  {
    method: "forEach",
    example: "const out = []; new Map([['a', 1]]).forEach((v, k) => out.push([k, v]));",
    result: "out -> [['a', 1]]",
  },
];

// Returns a curated list of common Map built-in methods used in interviews.
function listCommonMapBuiltins() {
  return [...COMMON_MAP_BUILTINS];
}

// Returns example snippets for common Map built-ins.
function listCommonMapBuiltinExamples() {
  return COMMON_MAP_BUILTIN_EXAMPLES.map((item) => ({ ...item }));
}

// Self-test: listCommonMapBuiltins
function testListCommonMapBuiltins() {
  const methods = listCommonMapBuiltins();
  assert.equal(methods.includes("set"), true);
  assert.equal(methods.includes("get"), true);
}

// Self-test: listCommonMapBuiltinExamples
function testListCommonMapBuiltinExamples() {
  const examples = listCommonMapBuiltinExamples();
  assert.equal(examples.length, COMMON_MAP_BUILTINS.length);
  assert.equal(examples.some((item) => item.method === "entries"), true);
}

// Counts how many items fall under each computed key.
// O(n) time, O(k) space where k is unique keys.
function countBy(items, keySelector) {
  const counts = new Map();
  for (const item of items) {
    const key = keySelector(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

// Self-test: countBy
function testCountBy() {
  const counts = countBy(["a", "ab", "b"], (s) => s.length);
  assert.equal(counts.get(1), 2);
  assert.equal(counts.get(2), 1);
}

// Groups items into arrays keyed by the keySelector output.
// O(n) time, O(n) space.
function groupByToMap(items, keySelector) {
  const groups = new Map();
  for (const item of items) {
    const key = keySelector(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

// Self-test: groupByToMap
function testGroupByToMap() {
  const groups = groupByToMap([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd"));
  assert.deepEqual(groups.get("even"), [2, 4]);
  assert.deepEqual(groups.get("odd"), [1, 3]);
}

// Inverts key/value pairs and collects duplicate original keys in arrays.
// O(n) time, O(n) space. Handles duplicate values by collecting keys in arrays.
function invertMap(input) {
  const inverted = new Map();
  for (const [key, value] of input.entries()) {
    if (!inverted.has(value)) inverted.set(value, []);
    inverted.get(value).push(key);
  }
  return inverted;
}

// Self-test: invertMap
function testInvertMap() {
  const out = invertMap(
    new Map([
      ["x", 1],
      ["y", 1],
      ["z", 2],
    ])
  );
  assert.deepEqual(out.get(1), ["x", "y"]);
  assert.deepEqual(out.get(2), ["z"]);
}

// Creates a new map by applying transform(value, key) to each entry value.
// O(n) time, O(n) space.
function mapValues(input, transform) {
  const out = new Map();
  for (const [key, value] of input.entries()) {
    out.set(key, transform(value, key));
  }
  return out;
}

// Self-test: mapValues
function testMapValues() {
  const out = mapValues(new Map([["a", 2], ["b", 3]]), (v) => v * 10);
  assert.equal(out.get("a"), 20);
  assert.equal(out.get("b"), 30);
}

// Merges two frequency maps by summing counts for matching keys.
// O(n) time, O(n) space.
function mergeFrequencyMaps(left, right) {
  const merged = new Map(left);
  for (const [key, value] of right.entries()) {
    merged.set(key, (merged.get(key) || 0) + value);
  }
  return merged;
}

// Self-test: mergeFrequencyMaps
function testMergeFrequencyMaps() {
  const merged = mergeFrequencyMaps(
    new Map([
      ["a", 2],
      ["b", 1],
    ]),
    new Map([
      ["a", 3],
      ["c", 5],
    ])
  );
  assert.equal(merged.get("a"), 5);
  assert.equal(merged.get("b"), 1);
  assert.equal(merged.get("c"), 5);
}

function runSelfTests() {
  testListCommonMapBuiltins();
  testListCommonMapBuiltinExamples();
  testCountBy();
  testGroupByToMap();
  testInvertMap();
  testMapValues();
  testMergeFrequencyMaps();
}

if (require.main === module) {
  runSelfTests();
  console.log("Common Map built-ins:", listCommonMapBuiltins().join(", "));
  console.log("Map built-in examples:");
  for (const item of listCommonMapBuiltinExamples()) {
    console.log(`- ${item.method}: ${item.example} // ${item.result}`);
  }
  console.log("datastruct_map_builtin_interview.js self-tests passed");
}

module.exports = {
  listCommonMapBuiltins,
  listCommonMapBuiltinExamples,
  countBy,
  groupByToMap,
  invertMap,
  mapValues,
  mergeFrequencyMaps,
};
