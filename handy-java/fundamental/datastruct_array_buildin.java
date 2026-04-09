import java.util.Arrays;

public class datastruct_array_buildin {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 9, 1, 2};
        System.out.println("original: " + Arrays.toString(numbers));

        // length read: O(1)
        System.out.println("length: " + numbers.length);

        // index access / update: O(1)
        System.out.println("numbers[0]: " + numbers[0]);
        numbers[1] = 7;
        System.out.println("after numbers[1]=7: " + Arrays.toString(numbers));

        // clone full array: O(n)
        int[] cloned = numbers.clone();
        System.out.println("clone: " + Arrays.toString(cloned));

        // copy full / range: O(n)
        int[] copyFull = Arrays.copyOf(numbers, numbers.length + 2);
        int[] copyRange = Arrays.copyOfRange(numbers, 1, 4);
        System.out.println("copyOf (+2): " + Arrays.toString(copyFull));
        System.out.println("copyOfRange(1,4): " + Arrays.toString(copyRange));

        // fill whole / range: O(n)
        Arrays.fill(copyFull, 99);
        Arrays.fill(copyFull, 0, 2, -1);
        System.out.println("after fill: " + Arrays.toString(copyFull));

        // sort: O(n log n)
        int[] sortable = numbers.clone();
        Arrays.sort(sortable);
        System.out.println("sorted: " + Arrays.toString(sortable));

        // binarySearch on sorted array: O(log n)
        int index = Arrays.binarySearch(sortable, 7);
        System.out.println("binarySearch(7): " + index);

        // equals / mismatch / compare: O(n)
        int[] sameAsSortable = {1, 2, 2, 5, 7};
        System.out.println("equals: " + Arrays.equals(sortable, sameAsSortable));
        System.out.println("mismatch index: " + Arrays.mismatch(sortable, sameAsSortable));
        System.out.println("compare result: " + Arrays.compare(sortable, sameAsSortable));

        // stream sum example: O(n)
        int sum = Arrays.stream(numbers).sum();
        System.out.println("sum via stream: " + sum);

        // linear scan search (unsorted array): O(n)
        int firstTwoAt = -1;
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == 2) {
                firstTwoAt = i;
                break;
            }
        }
        System.out.println("first index of value 2 (linear scan): " + firstTwoAt);
    }
}
