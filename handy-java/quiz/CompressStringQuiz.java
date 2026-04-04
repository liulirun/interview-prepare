/**
 * Q2) Compress String (Run-Length Encoding)
 *
 * AI-BEST:
 * Use StringBuilder / chunk appending.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Use direct string concatenation.
 * Time: can degrade to O(n^2), Space: O(n)
 */
public class CompressStringQuiz {
    static String compressBest(String s) {
        if (s == null || s.isEmpty()) return "";

        StringBuilder builder = new StringBuilder();
        int count = 1;

        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                count++;
            } else {
                builder.append(s.charAt(i - 1)).append(count);
                count = 1;
            }
        }

        String compressed = builder.toString();
        return compressed.length() < s.length() ? compressed : s;
    }

    static String compressEasy(String s) {
        if (s == null || s.isEmpty()) return "";

        String result = "";
        int count = 1;

        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                count++;
            } else {
                result += s.charAt(i - 1) + Integer.toString(count);
                count = 1;
            }
        }

        return result.length() < s.length() ? result : s;
    }

    public static void main(String[] args) {
        System.out.println("Q2: Compress String");
        String[] samples = {"aabcccccaaa", "abc", "", "aaAA"};
        for (String s : samples) {
            System.out.println("Input: \"" + s + "\"");
            System.out.println("  BEST: " + compressBest(s));
            System.out.println("  EASY: " + compressEasy(s));
        }
    }
}
