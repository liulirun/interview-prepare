/**
 * LONGEST PALINDROME BY EXPANDING AROUND CENTER
 *
 * Pro tip:
 * Interviewers like when you call out both odd and even centers explicitly.
 */
public class LongestPalindromeExpand {
    static String longestPalindromeExpand(String s) {
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
        System.out.println(longestPalindromeExpand("baabad"));
    }
}
