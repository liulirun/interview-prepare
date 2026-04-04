/**
 * SET: common operations for interview practice
 */

const assert = require("node:assert/strict");

const COMMON_SET_BUILTINS = [
  "add",
  "has",
  "delete",
  "clear",
  "keys",
  "values",
  "entries",
  "forEach",
];

const COMMON_SET_BUILTIN_EXAMPLES = [
  { method: "add", example: "const s = new Set([1]); s.add(2);", result: "s -> Set { 1, 2 }" },
  { method: "has", example: "new Set([1, 2]).has(2);", result: "returns true" },
  {
    method: "delete",
    example: "const s = new Set([1, 2]); s.delete(2);",
    result: "returns true, s -> Set { 1 }",
  },
  {
    method: "clear",
    example: "const s = new Set([1, 2]); s.clear();",
    result: "s -> empty Set",
  },
  {
    method: "keys",
    example: "Array.from(new Set([1, 2]).keys());",
    result: "returns [1, 2]",
  },
  {
    method: "values",
    example: "Array.from(new Set([1, 2]).values());",
    result: "returns [1, 2]",
  },
  {
    method: "entries",
    example: "Array.from(new Set([1, 2]).entries());",
    result: "returns [[1, 1], [2, 2]]",
  },
  {
    method: "forEach",
    example: "const out = []; new Set([1, 2]).forEach((v) => out.push(v * 2));",
    result: "out -> [2, 4]",
  },
];

// Returns a curated list of common Set built-in methods used in interviews.
function listCommonSetBuiltins() {
  return [...COMMON_SET_BUILTINS];
}

// Returns example snippets for common Set built-ins.
function listCommonSetBuiltinExamples() {
  return COMMON_SET_BUILTIN_EXAMPLES.map((item) => ({ ...item }));
}

// Self-test: listCommonSetBuiltins
function testListCommonSetBuiltins() {
  const methods = listCommonSetBuiltins();
  assert.equal(methods.includes("add"), true);
  assert.equal(methods.includes("has"), true);
}

// Self-test: listCommonSetBuiltinExamples
function testListCommonSetBuiltinExamples() {
  const examples = listCommonSetBuiltinExamples();
  assert.equal(examples.length, COMMON_SET_BUILTINS.length);
  assert.equal(examples.some((item) => item.method === "entries"), true);
}

// Returns a set containing values from both sets.
// O(n + m) time, O(n + m) space.
function union(a, b) {
  return new Set([...a, ...b]);
}

// Self-test: union
function testUnion() {
  assert.deepEqual([...union(new Set([1, 2]), new Set([2, 3]))], [1, 2, 3]);
}

// Returns only values that appear in both sets.
// O(n + m) time, O(min(n, m)) output space.
function intersection(a, b) {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  const out = new Set();
  for (const item of small) {
    if (large.has(item)) out.add(item);
  }
  return out;
}

// Self-test: intersection
function testIntersection() {
  assert.deepEqual([...intersection(new Set([1, 2, 3]), new Set([3, 4]))], [3]);
}

// Returns true when every subset value is present in superset.
// O(n) time where n is subset size.
function isSubset(subset, superset) {
  for (const item of subset) {
    if (!superset.has(item)) return false;
  }
  return true;
}

// Self-test: isSubset
function testIsSubset() {
  assert.equal(isSubset(new Set([1, 3]), new Set([1, 2, 3])), true);
  assert.equal(isSubset(new Set([1, 9]), new Set([1, 2, 3])), false);
}

// Returns values present in a but not in b.
// O(n) time where n is left-set size.
function difference(a, b) {
  const out = new Set();
  for (const item of a) {
    if (!b.has(item)) out.add(item);
  }
  return out;
}

// Self-test: difference
function testDifference() {
  assert.deepEqual([...difference(new Set([1, 2, 3]), new Set([3, 4]))], [1, 2]);
}

// Returns values that appear in exactly one of the two sets.
// O(n + m) time, O(n + m) space.
function symmetricDifference(a, b) {
  const out = new Set();
  for (const item of a) {
    if (!b.has(item)) out.add(item);
  }
  for (const item of b) {
    if (!a.has(item)) out.add(item);
  }
  return out;
}

// Self-test: symmetricDifference
function testSymmetricDifference() {
  const out = [...symmetricDifference(new Set([1, 2, 3]), new Set([3, 4, 5]))].sort(
    (x, y) => x - y
  );
  assert.deepEqual(out, [1, 2, 4, 5]);
}

function runSelfTests() {
  testListCommonSetBuiltins();
  testListCommonSetBuiltinExamples();
  testUnion();
  testIntersection();
  testIsSubset();
  testDifference();
  testSymmetricDifference();
}

if (require.main === module) {
  runSelfTests();
  console.log("Common Set built-ins:", listCommonSetBuiltins().join(", "));
  console.log("Set built-in examples:");
  for (const item of listCommonSetBuiltinExamples()) {
    console.log(`- ${item.method}: ${item.example} // ${item.result}`);
  }
  console.log("datastruct_set_builtin_interview.js self-tests passed");
}

module.exports = {
  listCommonSetBuiltins,
  listCommonSetBuiltinExamples,
  union,
  intersection,
  isSubset,
  difference,
  symmetricDifference,
};
