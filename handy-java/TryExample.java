import java.util.HashMap;
import java.util.Map;

/**
 * FIRST UNIQUE CHARACTER INDEX
 *
 * Pro tip:
 * Explain why two passes are still O(n): one to count, one to find.
 */
public class TryExample {
    static int firstUniqueCharIndex(String input) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : input.toCharArray()) {
            counts.put(c, counts.getOrDefault(c, 0) + 1);
        }

        for (int i = 0; i < input.length(); i++) {
            if (counts.get(input.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(firstUniqueCharIndex("aabcc"));
        System.out.println(firstUniqueCharIndex("aacc"));
    }
}
