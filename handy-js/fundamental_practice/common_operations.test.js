const test = require("node:test");
const assert = require("node:assert/strict");

const {
  listCommonArrayBuiltins,
  listCommonArrayBuiltinExamples,
  dedupeStable,
  chunk,
  partition,
  rotateRight,
  twoSumIndices,
} = require("./datastruct_array_builtin_interview");
const {
  listCommonMapBuiltins,
  listCommonMapBuiltinExamples,
  countBy,
  groupByToMap,
  invertMap,
  mapValues,
  mergeFrequencyMaps,
} = require("./datastruct_map_builtin_interview");
const {
  listCommonStringBuiltins,
  listCommonStringBuiltinExamples,
  isAnagram,
  longestCommonPrefix,
  reverseWords,
  isPalindromeNormalized,
  firstNonRepeatingChar,
} = require("./datastruct_string_builtin_interview");
const {
  listCommonSetBuiltins,
  listCommonSetBuiltinExamples,
  union,
  intersection,
  isSubset,
  difference,
  symmetricDifference,
} = require("./datastruct_set_builtin_interview");
const {
  listCommonObjectBuiltins,
  listCommonObjectBuiltinExamples,
  deepGet,
  pick,
  omit,
  deepSet,
  shallowEqual,
} = require("./datastruct_object_builtin_interview");

test("array: dedupe/chunk/partition/rotate/two-sum", () => {
  assert.equal(listCommonArrayBuiltins().includes("map"), true);
  assert.equal(
    listCommonArrayBuiltinExamples().some((item) => item.method === "map"),
    true,
  );
  assert.deepEqual(dedupeStable([1, 2, 1, 3, 2]), [1, 2, 3]);
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);

  const [even, odd] = partition([1, 2, 3, 4], (n) => n % 2 === 0);
  assert.deepEqual(even, [2, 4]);
  assert.deepEqual(odd, [1, 3]);

  assert.deepEqual(rotateRight([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]);
  assert.deepEqual(twoSumIndices([2, 7, 11, 15], 9), [0, 1]);
});

test("map: count/group/invert/map-values/merge-frequencies", () => {
  assert.equal(listCommonMapBuiltins().includes("set"), true);
  assert.equal(
    listCommonMapBuiltinExamples().some((item) => item.method === "set"),
    true,
  );
  const users = [
    { name: "Ava", team: "qa" },
    { name: "Ben", team: "platform" },
    { name: "Cara", team: "qa" },
  ];

  const counts = countBy(users, (u) => u.team);
  assert.equal(counts.get("qa"), 2);
  assert.equal(counts.get("platform"), 1);

  const groups = groupByToMap(users, (u) => u.team);
  assert.deepEqual(
    groups.get("qa").map((u) => u.name),
    ["Ava", "Cara"],
  );

  const inverted = invertMap(
    new Map([
      ["x", 1],
      ["y", 1],
      ["z", 2],
    ]),
  );
  assert.deepEqual(inverted.get(1), ["x", "y"]);
  assert.deepEqual(inverted.get(2), ["z"]);

  const scaled = mapValues(
    new Map([
      ["a", 2],
      ["b", 3],
    ]),
    (value) => value * 10,
  );
  assert.equal(scaled.get("a"), 20);
  assert.equal(scaled.get("b"), 30);

  const merged = mergeFrequencyMaps(
    new Map([
      ["a", 2],
      ["b", 1],
    ]),
    new Map([
      ["a", 3],
      ["c", 5],
    ]),
  );
  assert.equal(merged.get("a"), 5);
  assert.equal(merged.get("b"), 1);
  assert.equal(merged.get("c"), 5);
});

test("string: anagram/prefix/reverse/palindrome/first unique char", () => {
  assert.equal(listCommonStringBuiltins().includes("split"), true);
  assert.equal(
    listCommonStringBuiltinExamples().some(
      (item) => item.method === "replaceAll",
    ),
    true,
  );
  assert.equal(isAnagram("Dormitory", "dirty room"), true);
  assert.equal(isAnagram("hello", "world"), false);
  assert.equal(
    longestCommonPrefix(["interview", "internet", "internal"]),
    "inter",
  );
  assert.equal(
    reverseWords("  senior   js   interview  "),
    "interview js senior",
  );
  assert.equal(isPalindromeNormalized("A man, a plan, a canal: Panama"), true);
  assert.equal(isPalindromeNormalized("openai"), false);
  assert.equal(firstNonRepeatingChar("swiss"), "w");
  assert.equal(firstNonRepeatingChar("aabbcc"), "");
});

test("set: union/intersection/subset/difference/symmetric difference", () => {
  assert.equal(listCommonSetBuiltins().includes("add"), true);
  assert.equal(
    listCommonSetBuiltinExamples().some((item) => item.method === "add"),
    true,
  );
  const a = new Set([1, 2, 3]);
  const b = new Set([3, 4, 5]);

  assert.deepEqual([...union(a, b)], [1, 2, 3, 4, 5]);
  assert.deepEqual([...intersection(a, b)], [3]);
  assert.equal(isSubset(new Set([1, 3]), a), true);
  assert.equal(isSubset(new Set([1, 9]), a), false);
  assert.deepEqual([...difference(a, b)], [1, 2]);
  assert.deepEqual(
    [...symmetricDifference(a, b)].sort((x, y) => x - y),
    [1, 2, 4, 5],
  );
});

test("object: deepGet/pick/omit/deepSet/shallowEqual", () => {
  assert.equal(listCommonObjectBuiltins().includes("keys"), true);
  assert.equal(
    listCommonObjectBuiltinExamples().some(
      (item) => item.method === "fromEntries",
    ),
    true,
  );
  const profile = {
    id: 7,
    name: "Dev",
    meta: {
      location: {
        city: "Toronto",
      },
    },
    active: true,
  };

  assert.equal(deepGet(profile, "meta.location.city", "N/A"), "Toronto");
  assert.equal(deepGet(profile, "meta.location.country", "N/A"), "N/A");
  assert.deepEqual(pick(profile, ["id", "name"]), { id: 7, name: "Dev" });
  assert.deepEqual(omit(profile, ["meta"]), {
    id: 7,
    name: "Dev",
    active: true,
  });

  const updated = deepSet(profile, "meta.location.city", "Vancouver");
  assert.equal(deepGet(updated, "meta.location.city"), "Vancouver");
  assert.equal(deepGet(profile, "meta.location.city"), "Toronto");

  assert.equal(shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
  assert.equal(shallowEqual({ a: 1 }, { a: 2 }), false);
});
