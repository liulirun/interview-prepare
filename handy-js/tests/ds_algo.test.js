const test = require("node:test");
const assert = require("node:assert/strict");

const {
  LinkedList,
  insertAt,
  removeAt,
  HashTable,
  BinarySearchTree,
} = require("../data_structures");

const {
  linearSearch,
  binarySearch,
  bubbleSort,
  mergeSort,
  factorialRecursive,
} = require("../algorithms");

test("linked list: append/prepend/find/remove", () => {
  const list = new LinkedList();
  list.append(2).append(3).prepend(1);
  assert.deepEqual(list.toArray(), [1, 2, 3]);
  assert.equal(list.find(2).value, 2);
  list.remove(2);
  assert.deepEqual(list.toArray(), [1, 3]);
});

test("array helpers: insert and remove at index", () => {
  assert.deepEqual(insertAt([1, 3], 1, 2), [1, 2, 3]);
  assert.deepEqual(removeAt([1, 2, 3], 1), [1, 3]);
});

test("hash table: set/get/remove", () => {
  const map = new HashTable(8);
  map.set("lang", "js");
  map.set("level", "practice");
  assert.equal(map.get("lang"), "js");
  assert.equal(map.remove("lang"), true);
  assert.equal(map.get("lang"), undefined);
});

test("binary search tree: insert/contains/inorder", () => {
  const bst = new BinarySearchTree();
  bst.insert(8).insert(3).insert(10).insert(6);
  assert.equal(bst.contains(6), true);
  assert.equal(bst.contains(99), false);
  assert.deepEqual(bst.inOrder(), [3, 6, 8, 10]);
});

test("search algorithms", () => {
  assert.equal(linearSearch([7, 2, 9], 9), 2);
  assert.equal(linearSearch([7, 2, 9], 1), -1);
  assert.equal(binarySearch([1, 3, 5, 7, 9], 7), 3);
  assert.equal(binarySearch([1, 3, 5, 7, 9], 8), -1);
});

test("sort algorithms", () => {
  const input = [5, 1, 4, 2, 8];
  assert.deepEqual(bubbleSort(input), [1, 2, 4, 5, 8]);
  assert.deepEqual(mergeSort(input), [1, 2, 4, 5, 8]);
});

test("recursion: factorial", () => {
  assert.equal(factorialRecursive(0), 1);
  assert.equal(factorialRecursive(5), 120);
  assert.throws(() => factorialRecursive(-1), /non-negative integer/);
});
