import java.util.List;

/**
 * FLOW EXAMPLES
 *
 * Pro tip:
 * In interviews, narrate loop intent before coding:
 * "I continue on invalid input and break once I hit a stop condition."
 */
public class FlowExample {
    record User(String name, int id) {}

    public static void main(String[] args) {
        int[] scores = {70, 85, 92, 58, 100};

        for (int score : scores) {
            if (score < 60) {
                System.out.println("Skipping failing score: " + score);
                continue;
            }

            if (score == 100) {
                System.out.println("Perfect score found, stop early.");
                break;
            }
        }

        int countdown = 3;
        while (countdown > 0) {
            System.out.println("Countdown: " + countdown);
            countdown--;
        }

        List<User> users = List.of(
                new User("Alice", 1),
                new User("Bob", 2),
                new User("Charlie", 3)
        );

        for (User user : users) {
            System.out.println(user.name() + " -> " + user.id());
        }
    }
}
