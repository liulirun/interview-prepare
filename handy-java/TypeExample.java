import java.util.List;
import java.util.Map;

/**
 * TYPE EXAMPLES
 *
 * Pro tip:
 * TypeScript union types often map to Java `enum` when the values are finite.
 * Mentioning this mapping in interviews shows language-transfer strength.
 */
public class TypeExample {
    enum UserRole {
        STUDENT,
        PARENT
    }

    record User(String name, int id) {}

    static String formatSummary(String name, int lessons, boolean beginner) {
        return name + " has " + lessons + " lessons. Beginner friendly: " + beginner;
    }

    public static void main(String[] args) {
        String courseName = "Java Basics";
        int lessonCount = 4;
        boolean beginnerFriendly = true;

        UserRole role = UserRole.PARENT;

        System.out.println(formatSummary(courseName, lessonCount, beginnerFriendly));
        System.out.println("Current role: " + role);

        User user = new User("Hayes", 0);
        Map<String, Object> userAsMap = Map.of(
                "name", user.name(),
                "id", user.id()
        );

        for (Map.Entry<String, Object> entry : userAsMap.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }

        for (String key : userAsMap.keySet()) {
            System.out.println(key + ": " + userAsMap.get(key));
        }

        List<User> users = List.of(
                new User("Alice", 1),
                new User("Bob", 2),
                new User("Charlie", 3)
        );
        System.out.println("User count: " + users.size());
    }
}
