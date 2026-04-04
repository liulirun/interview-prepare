import java.util.HashMap;
import java.util.Map;

/**
 * Q3) First Non-Repeating Character Index
 *
 * AI-BEST:
 * Two pass frequency map.
 * Time: O(n), Space: O(k)
 *
 * AI-EASY:
 * Nested loops count per char.
 * Time: O(n^2), Space: O(1) extra
 */
public class FirstNonRepeatingCharQuiz {
    static int firstUniqueIndexBest(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char ch : s.toCharArray()) {
            counts.put(ch, counts.getOrDefault(ch, 0) + 1);
        }
        for (int i = 0; i < s.length(); i++) {
            if (counts.getOrDefault(s.charAt(i), 0) == 1) return i;
        }
        return -1;
    }

    static int firstUniqueIndexEasy(String s) {
        for (int i = 0; i < s.length(); i++) {
            int count = 0;
            for (int j = 0; j < s.length(); j++) {
                if (s.charAt(i) == s.charAt(j)) count++;
            }
            if (count == 1) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println("Q3: First Non-Repeating Character Index");
        String[] samples = {"aabcc", "aacc", "leetcode", "aabbccd"};
        for (String s : samples) {
            System.out.println("Input: \"" + s + "\"");
            System.out.println("  BEST: " + firstUniqueIndexBest(s));
            System.out.println("  EASY: " + firstUniqueIndexEasy(s));
        }
    }
}
