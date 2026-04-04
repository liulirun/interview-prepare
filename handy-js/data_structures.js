/**
 * DATA STRUCTURES EXAMPLES (JS)
 *
 * Topics:
 * - Linked List
 * - Arrays (common operations)
 * - Hash Table
 * - Binary Search Tree
 *
 * Big-O quick notes:
 * - Linked list append/prepend: O(1), find/remove: O(n)
 * - Array insert/remove at index: O(n)
 * - Hash table set/get/remove: average O(1), worst O(n)
 * - Binary search tree insert/contains: average O(log n), worst O(n)
 *
 * Pro tips:
 * - Pair implementation choices with time/space tradeoffs.
 * - Explain why this structure matches your access/update pattern.
 */

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // O(1): with a tail pointer, append only rewires last node once.
  append(value) {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // O(1): prepend only creates one node and repoints head.
  prepend(value) {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // O(n): may scan every node until value is found (or list ends).
  find(value) {
    let cur = this.head;
    while (cur) {
      if (cur.value === value) return cur;
      cur = cur.next;
    }
    return null;
  }

  // O(n): to remove all matches, we may need to walk the whole list once.
  remove(value) {
    if (!this.head) return false;

    while (this.head && this.head.value === value) {
      this.head = this.head.next;
      this.length--;
    }

    let cur = this.head;
    while (cur && cur.next) {
      if (cur.next.value === value) {
        cur.next = cur.next.next;
        this.length--;
      } else {
        cur = cur.next;
      }
    }

    if (this.tail && this.tail.value === value) {
      this.tail = cur;
    }

    if (!this.head) this.tail = null;
    return true;
  }

  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}

// Arrays are already dynamic in JS; this section shows useful operations.
function insertAt(array, index, value) {
  const copy = [...array];
  copy.splice(index, 0, value); // O(n): elements after index shift right.
  return copy;
}

function removeAt(array, index) {
  const copy = [...array];
  copy.splice(index, 1); // O(n): elements after index shift left.
  return copy;
}

class HashTable {
  constructor(size = 16) {
    this.buckets = Array.from({ length: size }, () => []);
  }

  // O(k): hashes each key character once (k = key length).
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash % this.buckets.length;
  }

  // Average O(1), worst O(n): direct bucket access is constant on average; collisions can force bucket scan.
  set(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const pair = bucket.find((entry) => entry[0] === key);
    if (pair) {
      pair[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  // Average O(1), worst O(n): expected short bucket lookup; heavy collisions degrade to linear scan.
  get(key) {
    const idx = this._hash(key);
    const pair = this.buckets[idx].find((entry) => entry[0] === key);
    return pair ? pair[1] : undefined;
  }

  // Average O(1), worst O(n): finding/removing in one bucket is usually constant, but can be linear with collisions.
  remove(key) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const pairIndex = bucket.findIndex((entry) => entry[0] === key);
    if (pairIndex < 0) return false;
    bucket.splice(pairIndex, 1);
    return true;
  }
}

class BinarySearchTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Average O(log n), worst O(n): work follows tree height (balanced ~log n, skewed ~n).
  insert(value) {
    const node = new BinarySearchTreeNode(value);
    if (!this.root) {
      this.root = node;
      return this;
    }

    let cur = this.root;
    while (true) {
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = node;
          return this;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = node;
          return this;
        }
        cur = cur.right;
      }
    }
  }

  // Average O(log n), worst O(n): search path length equals tree height.
  contains(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  // O(n): traversal visits each node exactly once.
  inOrder() {
    const out = [];
    const walk = (node) => {
      if (!node) return;
      walk(node.left);
      out.push(node.value);
      walk(node.right);
    };
    walk(this.root);
    return out;
  }
}

module.exports = {
  LinkedList,
  insertAt,
  removeAt,
  HashTable,
  BinarySearchTree,
};
