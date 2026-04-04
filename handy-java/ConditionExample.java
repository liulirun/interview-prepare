/**
 * CONDITION EXAMPLES
 *
 * Pro tip:
 * Use `if` for ranges and `switch` for fixed known values.
 * Saying this clearly in interviews shows good control-flow judgment.
 */
public class ConditionExample {
    static String gradeLabel(int score) {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        return "Needs improvement";
    }

    static String dayType(String day) {
        String normalized = day.toLowerCase();
        return switch (normalized) {
            case "saturday", "sunday" -> "Weekend";
            case "monday", "tuesday", "wednesday", "thursday", "friday" -> "Weekday";
            default -> "Unknown day";
        };
    }

    public static void main(String[] args) {
        int score = 88;
        String passMessage = score >= 60 ? "Pass" : "Fail";

        System.out.println("Score " + score + ": " + gradeLabel(score));
        System.out.println("Result: " + passMessage);
        System.out.println("Saturday is a: " + dayType("Saturday"));
    }
}
