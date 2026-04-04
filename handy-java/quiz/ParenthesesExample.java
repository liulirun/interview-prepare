import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;

/**
 * BALANCED PARENTHESES
 *
 * Pro tip:
 * Explain that stack order matters because this is a nested-structure problem,
 * not just counting open/close symbols.
 */
public class ParenthesesExample {
    static boolean isBalanced(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> mapping = Map.of(
                ')', '(',
                '}', '{',
                ']', '['
        );

        for (char ch : s.toCharArray()) {
            if (mapping.containsValue(ch)) {
                stack.push(ch);
            } else if (mapping.containsKey(ch)) {
                if (stack.isEmpty() || stack.pop() != mapping.get(ch)) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("{[()]}"));
    }
}
