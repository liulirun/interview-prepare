import java.time.Instant;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Topic: static keyword in Java
 *
 * Pro tip:
 * Explain static as "class-level state/behavior" and discuss tradeoffs:
 * easy access vs hidden coupling/test complexity.
 */
public class StaticKeywordInterview {
    static class RequestIdGenerator {
        /**
         * WHY static field:
         * - One sequence shared by every instance.
         * - AtomicLong for thread-safe increments.
         */
        private static final AtomicLong SEQ = new AtomicLong(1000);

        /**
         * WHY static method:
         * - No per-instance data required.
         * - Call site reads as utility behavior: RequestIdGenerator.nextId()
         */
        static String nextId() {
            return "REQ-" + SEQ.incrementAndGet();
        }
    }

    static class UserSession {
        private final String userId;
        private final String requestId;

        UserSession(String userId) {
            this.userId = userId;
            this.requestId = RequestIdGenerator.nextId();
        }

        @Override
        public String toString() {
            return "UserSession{userId='" + userId + "', requestId='" + requestId + "'}";
        }
    }

    /**
     * Static nested class does NOT capture outer instance.
     * WHY useful:
     * - Avoids hidden reference to outer class.
     * - Better memory behavior than non-static inner class for helper types.
     */
    static class AuditEvent {
        private final String requestId;
        private final Instant timestamp;

        AuditEvent(String requestId) {
            this.requestId = requestId;
            this.timestamp = Instant.now();
        }

        @Override
        public String toString() {
            return "AuditEvent{requestId='" + requestId + "', timestamp=" + timestamp + "}";
        }
    }

    public static void main(String[] args) {
        UserSession a = new UserSession("alice");
        UserSession b = new UserSession("bob");
        System.out.println(a);
        System.out.println(b);
        System.out.println(new AuditEvent(RequestIdGenerator.nextId()));
    }
}
