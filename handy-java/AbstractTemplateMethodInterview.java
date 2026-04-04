import java.util.Map;

/**
 * Topic: Abstract Class + Template Method Pattern
 *
 * Pro tip:
 * In senior interviews, explain "why abstract class here instead of interface":
 * shared state and controlled workflow in one base type.
 */
public class AbstractTemplateMethodInterview {
    /**
     * WHY abstract class:
     * - We want a shared algorithm (parse -> validate -> execute -> audit).
     * - We also want subclasses to fill in variable steps.
     * - This is perfect for Template Method.
     */
    static abstract class CommandHandler {
        /**
         * `final` protects the workflow order.
         * Subclasses cannot accidentally skip validation/auditing.
         */
        public final void handle(String rawInput) {
            Map<String, String> payload = parse(rawInput);
            validate(payload);
            execute(payload);
            audit(payload);
        }

        // Shared default behavior; subclasses can override if needed.
        protected Map<String, String> parse(String rawInput) {
            return Map.of("input", rawInput);
        }

        // Required customization points.
        protected abstract void validate(Map<String, String> payload);
        protected abstract void execute(Map<String, String> payload);

        // Optional hook with default implementation.
        protected void audit(Map<String, String> payload) {
            System.out.println("[AUDIT] payload=" + payload);
        }
    }

    static class CreateUserHandler extends CommandHandler {
        @Override
        protected void validate(Map<String, String> payload) {
            String value = payload.get("input");
            if (value == null || value.isBlank()) {
                throw new IllegalArgumentException("username is required");
            }
        }

        @Override
        protected void execute(Map<String, String> payload) {
            System.out.println("Creating user: " + payload.get("input"));
        }
    }

    public static void main(String[] args) {
        CommandHandler handler = new CreateUserHandler();
        handler.handle("hayes");
    }
}
