import java.util.Arrays;
import java.util.List;

/**
 * Test runner for data structures and algorithms examples.
 *
 * How to run:
 * 1) javac -d out DataStructuresExamples.java AlgorithmExamples.java DataStructuresAlgorithmsTest.java
 * 2) java -cp out DataStructuresAlgorithmsTest
 */
public class DataStructuresAlgorithmsTest {
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args) {
        testLinkedList();
        testArrayHelpers();
        testHashTable();
        testBinarySearchTree();
        testSearchAlgorithms();
        testSortAlgorithms();
        testRecursion();

        System.out.println();
        System.out.println("Passed: " + passed + ", Failed: " + failed);
        if (failed > 0) {
            throw new AssertionError("Some tests failed.");
        }
    }

    private static void testLinkedList() {
        DataStructuresExamples.LinkedList list = new DataStructuresExamples.LinkedList();
        list.append(2);
        list.append(3);
        list.prepend(1);
        assertEquals(Arrays.asList(1, 2, 3), list.toList(), "LinkedList append/prepend");
        assertTrue(list.contains(2), "LinkedList contains existing value");
        assertTrue(list.removeFirst(2), "LinkedList remove existing value");
        assertEquals(Arrays.asList(1, 3), list.toList(), "LinkedList remove result");
    }

    private static void testArrayHelpers() {
        int[] inserted = DataStructuresExamples.insertAt(new int[] {1, 3}, 1, 2);
        assertArrayEquals(new int[] {1, 2, 3}, inserted, "Array insertAt");

        int[] removed = DataStructuresExamples.removeAt(new int[] {1, 2, 3}, 1);
        assertArrayEquals(new int[] {1, 3}, removed, "Array removeAt");
    }

    private static void testHashTable() {
        DataStructuresExamples.HashTable table = new DataStructuresExamples.HashTable(8);
        table.put("lang", "java");
        table.put("level", "practice");
        assertEquals("java", table.get("lang"), "HashTable get");
        assertTrue(table.remove("lang"), "HashTable remove existing key");
        assertEquals(null, table.get("lang"), "HashTable get missing key");
    }

    private static void testBinarySearchTree() {
        DataStructuresExamples.BinarySearchTree bst = new DataStructuresExamples.BinarySearchTree();
        bst.insert(8);
        bst.insert(3);
        bst.insert(10);
        bst.insert(6);
        assertTrue(bst.contains(6), "BST contains");
        assertTrue(!bst.contains(99), "BST does not contain missing value");
        assertEquals(Arrays.asList(3, 6, 8, 10), bst.inOrder(), "BST in-order traversal");
    }

    private static void testSearchAlgorithms() {
        assertEquals(2, AlgorithmExamples.linearSearch(new int[] {7, 2, 9}, 9), "Linear search found");
        assertEquals(-1, AlgorithmExamples.linearSearch(new int[] {7, 2, 9}, 1), "Linear search missing");
        assertEquals(3, AlgorithmExamples.binarySearch(new int[] {1, 3, 5, 7, 9}, 7), "Binary search found");
        assertEquals(-1, AlgorithmExamples.binarySearch(new int[] {1, 3, 5, 7, 9}, 8), "Binary search missing");
    }

    private static void testSortAlgorithms() {
        int[] input = new int[] {5, 1, 4, 2, 8};
        assertArrayEquals(new int[] {1, 2, 4, 5, 8}, AlgorithmExamples.bubbleSort(input), "Bubble sort");
        assertArrayEquals(new int[] {1, 2, 4, 5, 8}, AlgorithmExamples.mergeSort(input), "Merge sort");
    }

    private static void testRecursion() {
        assertEquals(1L, AlgorithmExamples.factorialRecursive(0), "Factorial 0");
        assertEquals(120L, AlgorithmExamples.factorialRecursive(5), "Factorial 5");
        try {
            AlgorithmExamples.factorialRecursive(-1);
            fail("Factorial negative input should throw");
        } catch (IllegalArgumentException expected) {
            pass("Factorial negative input throws");
        }
    }

    private static void assertTrue(boolean condition, String name) {
        if (condition) {
            pass(name);
        } else {
            fail(name);
        }
    }

    private static void assertEquals(Object expected, Object actual, String name) {
        if ((expected == null && actual == null) || (expected != null && expected.equals(actual))) {
            pass(name);
        } else {
            fail(name + " (expected " + expected + ", got " + actual + ")");
        }
    }

    private static void assertArrayEquals(int[] expected, int[] actual, String name) {
        if (Arrays.equals(expected, actual)) {
            pass(name);
        } else {
            fail(name + " (expected " + Arrays.toString(expected) + ", got " + Arrays.toString(actual) + ")");
        }
    }

    private static void pass(String name) {
        passed++;
        System.out.println("[PASS] " + name);
    }

    private static void fail(String name) {
        failed++;
        System.out.println("[FAIL] " + name);
    }
}
