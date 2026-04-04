import java.util.Objects;

/**
 * Topic: Immutability + Value Object semantics
 *
 * Pro tip:
 * Talk about why immutable objects reduce bugs in concurrent and layered systems:
 * no shared mutable state, easier reasoning, safer caching.
 */
public class ImmutabilityValueObjectInterview {
    /**
     * WHY final class + final fields:
     * - Prevent subclass mutation tricks.
     * - State cannot change after construction.
     *
     * WHY validate in constructor:
     * - Guarantees every instance is always valid.
     */
    static final class Money {
        private final String currency;
        private final long cents;

        Money(String currency, long cents) {
            if (currency == null || currency.isBlank()) {
                throw new IllegalArgumentException("currency required");
            }
            this.currency = currency;
            this.cents = cents;
        }

        public String currency() {
            return currency;
        }

        public long cents() {
            return cents;
        }

        /**
         * WHY return new instance:
         * - Preserves immutability.
         * - Existing references remain unchanged.
         */
        public Money plus(Money other) {
            if (!currency.equals(other.currency)) {
                throw new IllegalArgumentException("currency mismatch");
            }
            return new Money(currency, cents + other.cents);
        }

        /**
         * Value semantics:
         * Two Money objects with same data are equal, even if not same reference.
         */
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Money money)) return false;
            return cents == money.cents && currency.equals(money.currency);
        }

        @Override
        public int hashCode() {
            return Objects.hash(currency, cents);
        }

        @Override
        public String toString() {
            return "Money{currency='" + currency + "', cents=" + cents + "}";
        }
    }

    public static void main(String[] args) {
        Money a = new Money("CAD", 2500);
        Money b = new Money("CAD", 500);
        Money total = a.plus(b);

        System.out.println(a);     // unchanged
        System.out.println(total); // new instance
        System.out.println(total.equals(new Money("CAD", 3000))); // true
    }
}
