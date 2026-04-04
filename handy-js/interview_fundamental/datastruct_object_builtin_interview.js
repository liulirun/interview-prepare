/**
 * OBJECT: common operations for interview practice
 */

const assert = require("node:assert/strict");

const COMMON_OBJECT_BUILTINS = [
  "keys",
  "values",
  "entries",
  "fromEntries",
  "assign",
  "hasOwn",
  "freeze",
  "seal",
];

const COMMON_OBJECT_BUILTIN_EXAMPLES = [
  {
    method: "keys",
    example: "Object.keys({ a: 1, b: 2 });",
    result: "returns ['a', 'b']",
  },
  {
    method: "values",
    example: "Object.values({ a: 1, b: 2 });",
    result: "returns [1, 2]",
  },
  {
    method: "entries",
    example: "Object.entries({ a: 1, b: 2 });",
    result: "returns [['a', 1], ['b', 2]]",
  },
  {
    method: "fromEntries",
    example: "Object.fromEntries([['a', 1], ['b', 2]]);",
    result: "returns { a: 1, b: 2 }",
  },
  {
    method: "assign",
    example: "Object.assign({ a: 1 }, { b: 2 });",
    result: "returns { a: 1, b: 2 }",
  },
  {
    method: "hasOwn",
    example: "Object.hasOwn({ a: 1 }, 'a');",
    result: "returns true",
  },
  {
    method: "freeze",
    example: "const o = Object.freeze({ a: 1 }); Object.isFrozen(o);",
    result: "returns true",
  },
  {
    method: "seal",
    example: "const o = Object.seal({ a: 1 }); Object.isSealed(o);",
    result: "returns true",
  },
];

// Returns a curated list of common Object built-in methods used in interviews.
function listCommonObjectBuiltins() {
  return [...COMMON_OBJECT_BUILTINS];
}

// Returns example snippets for common Object built-ins.
function listCommonObjectBuiltinExamples() {
  return COMMON_OBJECT_BUILTIN_EXAMPLES.map((item) => ({ ...item }));
}

// Self-test: listCommonObjectBuiltins
function testListCommonObjectBuiltins() {
  const methods = listCommonObjectBuiltins();
  assert.equal(methods.includes("keys"), true);
  assert.equal(methods.includes("assign"), true);
}

// Self-test: listCommonObjectBuiltinExamples
function testListCommonObjectBuiltinExamples() {
  const examples = listCommonObjectBuiltinExamples();
  assert.equal(examples.length, COMMON_OBJECT_BUILTINS.length);
  assert.equal(examples.some((item) => item.method === "fromEntries"), true);
}

// Reads a nested value using dot path; returns defaultValue when missing.
// O(d) time where d is dot-path depth.
function deepGet(source, path, defaultValue) {
  if (!path) return source === undefined ? defaultValue : source;

  const keys = path.split(".");
  let cur = source;
  for (const key of keys) {
    if (cur === null || cur === undefined || !(key in cur)) {
      return defaultValue;
    }
    cur = cur[key];
  }
  return cur;
}

// Self-test: deepGet
function testDeepGet() {
  const source = { user: { profile: { name: "Dev" } } };
  assert.equal(deepGet(source, "user.profile.name", "N/A"), "Dev");
  assert.equal(deepGet(source, "user.profile.city", "N/A"), "N/A");
}

// Builds a new object containing only the requested keys.
// O(k) time where k is number of keys requested.
function pick(source, keys) {
  const out = {};
  for (const key of keys) {
    if (key in source) out[key] = source[key];
  }
  return out;
}

// Self-test: pick
function testPick() {
  const source = { id: 1, name: "Dev", active: true };
  assert.deepEqual(pick(source, ["id", "name"]), { id: 1, name: "Dev" });
}

// Builds a new object excluding the specified keys.
// O(n) time where n is number of source keys.
function omit(source, keysToOmit) {
  const omitSet = new Set(keysToOmit);
  const out = {};
  for (const key of Object.keys(source)) {
    if (!omitSet.has(key)) out[key] = source[key];
  }
  return out;
}

// Self-test: omit
function testOmit() {
  const source = { id: 1, name: "Dev", active: true };
  assert.deepEqual(omit(source, ["active"]), { id: 1, name: "Dev" });
}

// Sets a nested value by dot path and returns a new object without mutating input.
// O(d) time and space where d is dot-path depth. Returns a new object (immutable style).
function deepSet(source, path, value) {
  const keys = path.split(".");
  const out = { ...source };

  let curOut = out;
  let curSrc = source;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextSrc =
      curSrc && typeof curSrc === "object" && curSrc[key] && typeof curSrc[key] === "object"
        ? curSrc[key]
        : {};
    curOut[key] = { ...nextSrc };
    curOut = curOut[key];
    curSrc = nextSrc;
  }

  curOut[keys[keys.length - 1]] = value;
  return out;
}

// Self-test: deepSet
function testDeepSet() {
  const source = { user: { profile: { city: "Toronto" } } };
  const updated = deepSet(source, "user.profile.city", "Vancouver");
  assert.equal(deepGet(updated, "user.profile.city"), "Vancouver");
  assert.equal(deepGet(source, "user.profile.city"), "Toronto");
}

// Compares two objects for one-level key/value equality.
// O(n) time for key count. One-level (shallow) equality check.
function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!(key in b) || a[key] !== b[key]) return false;
  }
  return true;
}

// Self-test: shallowEqual
function testShallowEqual() {
  assert.equal(shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
  assert.equal(shallowEqual({ a: 1 }, { a: 2 }), false);
}

function runSelfTests() {
  testListCommonObjectBuiltins();
  testListCommonObjectBuiltinExamples();
  testDeepGet();
  testPick();
  testOmit();
  testDeepSet();
  testShallowEqual();
}

if (require.main === module) {
  runSelfTests();
  console.log("Common Object built-ins:", listCommonObjectBuiltins().join(", "));
  console.log("Object built-in examples:");
  for (const item of listCommonObjectBuiltinExamples()) {
    console.log(`- ${item.method}: ${item.example} // ${item.result}`);
  }
  console.log("datastruct_object_builtin_interview.js self-tests passed");
}

module.exports = {
  listCommonObjectBuiltins,
  listCommonObjectBuiltinExamples,
  deepGet,
  pick,
  omit,
  deepSet,
  shallowEqual,
};
