/**
 * Q4) Longest Palindromic Substring
 *
 * AI-BEST:
 * Manacher's algorithm.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Expand around center (odd/even).
 * Time: O(n^2), Space: O(1) extra
 */
public class q4_longest_palindromic_substring_medium {
    static String longestPalindromeBest(String s) {
        if (s == null || s.isEmpty()) return "";

        StringBuilder transformed = new StringBuilder("^");
        for (int i = 0; i < s.length(); i++) {
            transformed.append('#').append(s.charAt(i));
        }
        transformed.append("#$");

        String t = transformed.toString();
        int[] p = new int[t.length()];
        int center = 0;
        int right = 0;

        for (int i = 1; i < t.length() - 1; i++) {
            int mirror = 2 * center - i;
            if (i < right) p[i] = Math.min(right - i, p[mirror]);

            while (t.charAt(i + 1 + p[i]) == t.charAt(i - 1 - p[i])) {
                p[i]++;
            }

            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }
        }

        int maxLen = 0;
        int centerIndex = 0;
        for (int i = 1; i < p.length - 1; i++) {
            if (p[i] > maxLen) {
                maxLen = p[i];
                centerIndex = i;
            }
        }

        int start = (centerIndex - maxLen) / 2;
        return s.substring(start, start + maxLen);
    }

    static String longestPalindromeEasy(String s) {
        if (s == null || s.isEmpty()) return "";

        String best = "";
        for (int i = 0; i < s.length(); i++) {
            String odd = expandAroundCenter(s, i, i);
            String even = expandAroundCenter(s, i, i + 1);
            if (odd.length() > best.length()) best = odd;
            if (even.length() > best.length()) best = even;
        }
        return best;
    }

    static String expandAroundCenter(String s, int left, int right) {
        int l = left;
        int r = right;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--;
            r++;
        }
        return s.substring(l + 1, r);
    }

    public static void main(String[] args) {
        System.out.println("Q4: Longest Palindromic Substring");
        String[] samples = {"baabad", "babad", "cbbd", "a", ""};
        for (String s : samples) {
            System.out.println("Input: \"" + s + "\"");
            System.out.println("  BEST: " + longestPalindromeBest(s));
            System.out.println("  EASY: " + longestPalindromeEasy(s));
        }
    }
}


