import java.util.Arrays;

/**
 * Q12) Binary Search (Find First Occurrence)
 *
 * AI-BEST:
 * Modified binary search that continues left after match.
 * Time: O(log n), Space: O(1)
 *
 * AI-EASY:
 * Find any match, then walk left.
 * Time: O(log n + m), worst O(n), Space: O(1)
 */
public class BinarySearchFirstOccurrenceQuiz {
    static int firstOccurrenceBest(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        int answer = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                answer = mid;
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return answer;
    }

    static int firstOccurrenceEasy(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        int found = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                found = mid;
                break;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (found == -1) return -1;
        while (found > 0 && nums[found - 1] == target) found--;
        return found;
    }

    public static void main(String[] args) {
        System.out.println("Q12: Binary Search First Occurrence");
        int[][] numsCases = {
                {1, 2, 2, 2, 3, 4},
                {1, 3, 5, 7},
                {8, 8, 8, 8}
        };
        int[] targets = {2, 4, 8};

        for (int i = 0; i < numsCases.length; i++) {
            int[] nums = numsCases[i];
            int target = targets[i];
            System.out.println("Input: nums=" + Arrays.toString(nums) + ", target=" + target);
            System.out.println("  BEST: " + firstOccurrenceBest(nums, target));
            System.out.println("  EASY: " + firstOccurrenceEasy(nums, target));
        }
    }
}
