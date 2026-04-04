import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * DATA STRUCTURES EXAMPLES (JAVA)
 *
 * Topics:
 * - Linked List
 * - Arrays (common operations)
 * - Hash Table
 * - Binary Search Tree
 *
 * Big-O quick notes:
 * - Linked list append/prepend: O(1), contains/remove: O(n)
 * - Array insert/remove by index: O(n)
 * - Hash table put/get/remove: average O(1), worst O(n)
 * - Binary search tree insert/contains: average O(log n), worst O(n)
 *
 * Pro tips:
 * - Explain why your structure fits the operation pattern you need.
 * - For each operation, mention both average and worst-case Big-O.
 */
public class DataStructuresExamples {
    static class LinkedListNode {
        int value;
        LinkedListNode next;

        LinkedListNode(int value) {
            this.value = value;
        }
    }

    static class LinkedList {
        private LinkedListNode head;
        private LinkedListNode tail;
        private int size;

        // O(1)
        void append(int value) {
            LinkedListNode node = new LinkedListNode(value);
            if (head == null) {
                head = node;
                tail = node;
            } else {
                tail.next = node;
                tail = node;
            }
            size++;
        }

        // O(1)
        void prepend(int value) {
            LinkedListNode node = new LinkedListNode(value);
            if (head == null) {
                head = node;
                tail = node;
            } else {
                node.next = head;
                head = node;
            }
            size++;
        }

        // O(n)
        boolean contains(int value) {
            LinkedListNode cur = head;
            while (cur != null) {
                if (cur.value == value) {
                    return true;
                }
                cur = cur.next;
            }
            return false;
        }

        // O(n)
        boolean removeFirst(int value) {
            if (head == null) {
                return false;
            }
            if (head.value == value) {
                head = head.next;
                if (head == null) {
                    tail = null;
                }
                size--;
                return true;
            }

            LinkedListNode cur = head;
            while (cur.next != null) {
                if (cur.next.value == value) {
                    if (cur.next == tail) {
                        tail = cur;
                    }
                    cur.next = cur.next.next;
                    size--;
                    return true;
                }
                cur = cur.next;
            }
            return false;
        }

        int size() {
            return size;
        }

        List<Integer> toList() {
            List<Integer> out = new ArrayList<>();
            LinkedListNode cur = head;
            while (cur != null) {
                out.add(cur.value);
                cur = cur.next;
            }
            return out;
        }
    }

    // Arrays are contiguous memory blocks, so middle insertion/removal shifts items.
    static int[] insertAt(int[] input, int index, int value) {
        int[] out = new int[input.length + 1];
        System.arraycopy(input, 0, out, 0, index);
        out[index] = value;
        System.arraycopy(input, index, out, index + 1, input.length - index);
        return out; // O(n)
    }

    static int[] removeAt(int[] input, int index) {
        int[] out = new int[input.length - 1];
        System.arraycopy(input, 0, out, 0, index);
        System.arraycopy(input, index + 1, out, index, input.length - index - 1);
        return out; // O(n)
    }

    static class HashTable {
        static class Entry {
            String key;
            String value;

            Entry(String key, String value) {
                this.key = key;
                this.value = value;
            }
        }

        private final List<Entry>[] buckets;

        @SuppressWarnings("unchecked")
        HashTable(int size) {
            buckets = (List<Entry>[]) new List[size];
            for (int i = 0; i < size; i++) {
                buckets[i] = new ArrayList<>();
            }
        }

        private int hash(String key) {
            int hash = 0;
            for (int i = 0; i < key.length(); i++) {
                hash = 31 * hash + key.charAt(i);
            }
            return Math.floorMod(hash, buckets.length);
        }

        // Average O(1), worst O(n) with collisions.
        void put(String key, String value) {
            int idx = hash(key);
            for (Entry entry : buckets[idx]) {
                if (entry.key.equals(key)) {
                    entry.value = value;
                    return;
                }
            }
            buckets[idx].add(new Entry(key, value));
        }

        // Average O(1), worst O(n).
        String get(String key) {
            int idx = hash(key);
            for (Entry entry : buckets[idx]) {
                if (entry.key.equals(key)) {
                    return entry.value;
                }
            }
            return null;
        }

        // Average O(1), worst O(n).
        boolean remove(String key) {
            int idx = hash(key);
            for (int i = 0; i < buckets[idx].size(); i++) {
                if (buckets[idx].get(i).key.equals(key)) {
                    buckets[idx].remove(i);
                    return true;
                }
            }
            return false;
        }
    }

    static class BinarySearchTree {
        static class Node {
            int value;
            Node left;
            Node right;

            Node(int value) {
                this.value = value;
            }
        }

        private Node root;

        // Average O(log n), worst O(n) if the tree is skewed.
        void insert(int value) {
            root = insertRec(root, value);
        }

        private Node insertRec(Node node, int value) {
            if (node == null) {
                return new Node(value);
            }
            if (value < node.value) {
                node.left = insertRec(node.left, value);
            } else if (value > node.value) {
                node.right = insertRec(node.right, value);
            }
            return node;
        }

        // Average O(log n), worst O(n).
        boolean contains(int value) {
            Node cur = root;
            while (cur != null) {
                if (value == cur.value) {
                    return true;
                }
                cur = value < cur.value ? cur.left : cur.right;
            }
            return false;
        }

        // O(n)
        List<Integer> inOrder() {
            List<Integer> out = new ArrayList<>();
            inOrderRec(root, out);
            return out;
        }

        private void inOrderRec(Node node, List<Integer> out) {
            if (node == null) {
                return;
            }
            inOrderRec(node.left, out);
            out.add(node.value);
            inOrderRec(node.right, out);
        }
    }

    public static void main(String[] args) {
        // Quick smoke demo; full coverage is in DataStructuresAlgorithmsTest.
        LinkedList list = new LinkedList();
        list.append(2);
        list.prepend(1);
        list.append(3);
        System.out.println("LinkedList: " + list.toList());
        System.out.println("InsertAt: " + Arrays.toString(insertAt(new int[] {1, 3}, 1, 2)));
    }
}
