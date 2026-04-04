import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * OBJECT EXAMPLES
 *
 * Pro tip:
 * Java has no `Object.freeze`/`Object.seal`.
 * For safe immutable objects, prefer `record`, `final`, and unmodifiable collections.
 */
public class ObjectExample {
    record NewUser(String name, int id) {}

    public static void main(String[] args) {
        List<NewUser> users = List.of(
                new NewUser("Alice", 1),
                new NewUser("Bob", 2),
                new NewUser("Charlie", 3)
        );

        for (NewUser user : users) {
            System.out.println(user.name());
        }

        Map<String, Object> mods = Map.of("name", "Hayes");
        Map<String, Object> extra = Map.of("id", 99, "role", "Admin");

        Map<String, Object> fullUser = new HashMap<>(mods);
        fullUser.putAll(extra);
        System.out.println("Merged map: " + fullUser);

        // Map.copyOf creates an unmodifiable snapshot.
        Map<String, String> settings = new HashMap<>();
        settings.put("theme", "dark");
        Map<String, String> sealedSettings = Map.copyOf(settings);
        System.out.println("Sealed settings: " + sealedSettings);

        Map<String, String> userRoles = Map.of(
                "user1", "Admin",
                "user2", "Editor",
                "user3", "Guest"
        );
        System.out.println("All roles: " + userRoles.values());

        Map<String, String> fromEntries = Map.of("color", "red", "speed", "fast");
        System.out.println("From entries style map: " + fromEntries);

        Map<String, String> car = Map.of("make", "Toyota");
        System.out.println(car.containsKey("make"));     // true
        System.out.println(car.containsKey("toString")); // false
    }
}
