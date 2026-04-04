import java.util.Arrays;

/**
 * ALGORITHMS EXAMPLES (JAVA)
 *
 * Topics:
 * - Search: linear, binary
 * - Sort: bubble, merge
 * - Recursion: factorial
 *
 * Big-O quick notes:
 * - Linear search: O(n)
 * - Binary search: O(log n), sorted input required
 * - Bubble sort: O(n^2)
 * - Merge sort: O(n log n)
 * - Recursive factorial: O(n) time, O(n) stack
 *
 * Pro tips:
 * - State assumptions first (binary search needs sorted input).
 * - Walk edge cases before jumping to optimization.
 */
public class AlgorithmExamples {
    // O(n)
    static int linearSearch(int[] input, int target) {
        for (int i = 0; i < input.length; i++) {
            if (input[i] == target) {
                return i;
            }
        }
        return -1;
    }

    // O(log n), requires sorted input.
    static int binarySearch(int[] sortedInput, int target) {
        int left = 0;
        int right = sortedInput.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (sortedInput[mid] == target) {
                return mid;
            }
            if (sortedInput[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    // O(n^2), easy to explain, usually too slow for big input.
    static int[] bubbleSort(int[] input) {
        int[] out = Arrays.copyOf(input, input.length);
        for (int i = 0; i < out.length; i++) {
            boolean swapped = false;
            for (int j = 0; j < out.length - 1 - i; j++) {
                if (out[j] > out[j + 1]) {
                    int tmp = out[j];
                    out[j] = out[j + 1];
                    out[j + 1] = tmp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
        return out;
    }

    // O(n log n)
    static int[] mergeSort(int[] input) {
        if (input.length <= 1) {
            return Arrays.copyOf(input, input.length);
        }
        int mid = input.length / 2;
        int[] left = Arrays.copyOfRange(input, 0, mid);
        int[] right = Arrays.copyOfRange(input, mid, input.length);
        return merge(mergeSort(left), mergeSort(right));
    }

    private static int[] merge(int[] left, int[] right) {
        int[] out = new int[left.length + right.length];
        int i = 0;
        int j = 0;
        int k = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                out[k++] = left[i++];
            } else {
                out[k++] = right[j++];
            }
        }
        while (i < left.length) {
            out[k++] = left[i++];
        }
        while (j < right.length) {
            out[k++] = right[j++];
        }
        return out;
    }

    // O(n) time, O(n) stack.
    static long factorialRecursive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        if (n <= 1) {
            return 1L;
        }
        return n * factorialRecursive(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("Merge sort demo: " + Arrays.toString(mergeSort(new int[] {5, 1, 4, 2})));
        System.out.println("Factorial(5): " + factorialRecursive(5));
    }
}
