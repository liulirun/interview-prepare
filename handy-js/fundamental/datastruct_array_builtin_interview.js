/**
 * ARRAY: common operations for interview practice
 */

const assert = require("node:assert/strict");

const COMMON_ARRAY_BUILTINS = [
  "push",
  "pop",
  "shift",
  "unshift",
  "slice",
  "splice",
  "map",
  "filter",
  "reduce",
  "find",
  "findIndex",
  "some",
  "every",
  "includes",
  "indexOf",
  "sort",
  "flat",
  "flatMap",
  "join",
];

const COMMON_ARRAY_BUILTIN_EXAMPLES = [
  { method: "push", example: "const a = [1, 2]; a.push(3);", result: "a -> [1, 2, 3], returns 3" },
  { method: "pop", example: "const a = [1, 2, 3]; a.pop();", result: "a -> [1, 2], returns 3" },
  { method: "shift", example: "const a = [1, 2, 3]; a.shift();", result: "a -> [2, 3], returns 1" },
  {
    method: "unshift",
    example: "const a = [2, 3]; a.unshift(1);",
    result: "a -> [1, 2, 3], returns 3",
  },
  { method: "slice", example: "[1, 2, 3, 4].slice(1, 3);", result: "returns [2, 3]" },
  {
    method: "splice",
    example: "const a = [1, 2, 3, 4]; a.splice(1, 2, 9);",
    result: "a -> [1, 9, 4], returns [2, 3]",
  },
  { method: "map", example: "[1, 2, 3].map((n) => n * 2);", result: "returns [2, 4, 6]" },
  { method: "filter", example: "[1, 2, 3, 4].filter((n) => n % 2 === 0);", result: "returns [2, 4]" },
  { method: "reduce", example: "[1, 2, 3].reduce((sum, n) => sum + n, 0);", result: "returns 6" },
  { method: "find", example: "[4, 7, 9].find((n) => n > 5);", result: "returns 7" },
  { method: "findIndex", example: "[4, 7, 9].findIndex((n) => n > 5);", result: "returns 1" },
  { method: "some", example: "[1, 3, 4].some((n) => n % 2 === 0);", result: "returns true" },
  { method: "every", example: "[2, 4, 6].every((n) => n % 2 === 0);", result: "returns true" },
  { method: "includes", example: "[1, 2, 3].includes(2);", result: "returns true" },
  { method: "indexOf", example: "[1, 2, 3].indexOf(3);", result: "returns 2" },
  { method: "sort", example: "[3, 1, 2].sort((a, b) => a - b);", result: "returns [1, 2, 3]" },
  { method: "flat", example: "[1, [2, [3]]].flat(2);", result: "returns [1, 2, 3]" },
  {
    method: "flatMap",
    example: "[1, 2, 3].flatMap((n) => [n, n * 10]);",
    result: "returns [1, 10, 2, 20, 3, 30]",
  },
  { method: "join", example: "['a', 'b', 'c'].join('-');", result: "returns 'a-b-c'" },
];

// Returns a curated list of common Array built-in methods used in interviews.
function listCommonArrayBuiltins() {
  return [...COMMON_ARRAY_BUILTINS];
}

// Returns example snippets for common Array built-ins.
function listCommonArrayBuiltinExamples() {
  return COMMON_ARRAY_BUILTIN_EXAMPLES.map((item) => ({ ...item }));
}

// Self-test: listCommonArrayBuiltins
function testListCommonArrayBuiltins() {
  const methods = listCommonArrayBuiltins();
  assert.equal(methods.includes("map"), true);
  assert.equal(methods.includes("reduce"), true);
}

// Self-test: listCommonArrayBuiltinExamples
function testListCommonArrayBuiltinExamples() {
  const examples = listCommonArrayBuiltinExamples();
  assert.equal(examples.length, COMMON_ARRAY_BUILTINS.length);
  assert.equal(examples.some((item) => item.method === "flatMap"), true);
}

// Returns a new array with duplicates removed while preserving original order.
// O(n) time, O(n) space. Keeps first occurrence order.
function dedupeStable(items) {
  return [...new Set(items)];
}

// Self-test: dedupeStable
function testDedupeStable() {
  assert.deepEqual(dedupeStable([1, 2, 1, 3, 2]), [1, 2, 3]);
}

// Splits an array into fixed-size chunks and keeps the remainder as the last chunk.
// O(n) time, O(n) space.
function chunk(items, size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("size must be a positive integer");
  }

  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

// Self-test: chunk
function testChunk() {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.throws(() => chunk([1, 2], 0), /positive integer/);
}

// Splits items into two arrays: first for predicate-pass, second for predicate-fail.
// O(n) time, O(n) space.
function partition(items, predicate) {
  const pass = [];
  const fail = [];

  for (const item of items) {
    if (predicate(item)) pass.push(item);
    else fail.push(item);
  }

  return [pass, fail];
}

// Self-test: partition
function testPartition() {
  const [even, odd] = partition([1, 2, 3, 4], (n) => n % 2 === 0);
  assert.deepEqual(even, [2, 4]);
  assert.deepEqual(odd, [1, 3]);
}

// Rotates an array to the right by k steps and returns a new array.
// O(n) time, O(n) space.
function rotateRight(items, k) {
  if (items.length === 0) return [];
  const step = ((k % items.length) + items.length) % items.length;
  if (step === 0) return [...items];
  return [...items.slice(-step), ...items.slice(0, -step)];
}

// Self-test: rotateRight
function testRotateRight() {
  assert.deepEqual(rotateRight([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]);
  assert.deepEqual(rotateRight([1, 2, 3], -1), [2, 3, 1]);
}

// Finds indices of two numbers that add up to target, or [-1, -1] if not found.
// O(n) time, O(n) space.
function twoSumIndices(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }

  return [-1, -1];
}

// Self-test: twoSumIndices
function testTwoSumIndices() {
  assert.deepEqual(twoSumIndices([2, 7, 11, 15], 9), [0, 1]);
  assert.deepEqual(twoSumIndices([1, 2, 3], 100), [-1, -1]);
}

function runSelfTests() {
  testListCommonArrayBuiltins();
  testListCommonArrayBuiltinExamples();
  testDedupeStable();
  testChunk();
  testPartition();
  testRotateRight();
  testTwoSumIndices();
}

if (require.main === module) {
  runSelfTests();
  console.log("Common Array built-ins:", listCommonArrayBuiltins().join(", "));
  console.log("Array built-in examples:");
  for (const item of listCommonArrayBuiltinExamples()) {
    console.log(`- ${item.method}: ${item.example} // ${item.result}`);
  }
  console.log("datastruct_array_builtin_interview.js self-tests passed");
}

module.exports = {
  listCommonArrayBuiltins,
  listCommonArrayBuiltinExamples,
  dedupeStable,
  chunk,
  partition,
  rotateRight,
  twoSumIndices,
};
