/**
 * LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS (simple window-string style)
 *
 * Pro tip:
 * Start with this readable approach, then mention the index-map sliding window
 * optimization for strict O(n) on very long inputs.
 */
public class LongestSubstring {
    static String getLongestSubstringSimple(String s) {
        String currentWindow = "";
        String longestFound = "";

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            int duplicateIndex = currentWindow.indexOf(ch);

            if (duplicateIndex >= 0) {
                currentWindow = currentWindow.substring(duplicateIndex + 1) + ch;
            } else {
                currentWindow += ch;
            }

            if (currentWindow.length() > longestFound.length()) {
                longestFound = currentWindow;
            }
        }
        return longestFound;
    }

    public static void main(String[] args) {
        System.out.println(getLongestSubstringSimple("abcdbcabcbb"));
    }
}
