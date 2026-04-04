/**
 * COMPRESS STRING
 *
 * Pro tip:
 * Mention time O(n) and that you use a mutable buffer (`StringBuilder`) to avoid
 * repeated string allocations.
 */
import java.lang.reflect.Method;


public class CompressString {
    static String compressString(String s) {
        if (s == null || s.isEmpty()) return "";

        StringBuilder res = new StringBuilder();
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            count++;
            if (i + 1 == s.length() || s.charAt(i) != s.charAt(i + 1)) {
                res.append(s.charAt(i)).append(count);
                count = 0;
            }
        }

        String result = res.toString();
        return result.length() < s.length() ? result : s;
    }

    public static void main(String[] args) {
        Method[] methods = String.class.getMethods();

        System.out.println("All public String methods:");
        for (Method method : methods) {
            System.out.println(method.getName());
        }

        System.out.println(compressString("aabcccccaaa"));
    }
}
