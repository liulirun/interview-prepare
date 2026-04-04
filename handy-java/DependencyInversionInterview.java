import java.math.BigDecimal;

/**
 * Topic: Dependency Inversion + Program to Interface
 *
 * Pro tip:
 * Senior-level answer should include testability:
 * interface-based dependencies let you swap in fakes/mocks without rewriting service logic.
 */
public class DependencyInversionInterview {
    interface PaymentGateway {
        boolean charge(String customerId, BigDecimal amount);
    }

    static class StripeGateway implements PaymentGateway {
        @Override
        public boolean charge(String customerId, BigDecimal amount) {
            System.out.println("Stripe charge -> customer=" + customerId + ", amount=" + amount);
            return true;
        }
    }

    static class CheckoutService {
        private final PaymentGateway gateway;

        /**
         * WHY constructor injection:
         * - Dependency is explicit.
         * - Object is valid after construction.
         * - Easy to substitute implementations in tests.
         */
        CheckoutService(PaymentGateway gateway) {
            this.gateway = gateway;
        }

        boolean checkout(String customerId, BigDecimal amount) {
            if (amount.compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("amount must be > 0");
            }
            return gateway.charge(customerId, amount);
        }
    }

    // Lightweight fake for tests/interview demo.
    static class FakeGateway implements PaymentGateway {
        boolean called;
        BigDecimal lastAmount;

        @Override
        public boolean charge(String customerId, BigDecimal amount) {
            called = true;
            lastAmount = amount;
            return true;
        }
    }

    public static void main(String[] args) {
        CheckoutService prod = new CheckoutService(new StripeGateway());
        prod.checkout("cust-01", new BigDecimal("59.99"));

        FakeGateway fake = new FakeGateway();
        CheckoutService testLike = new CheckoutService(fake);
        testLike.checkout("test-customer", new BigDecimal("10.00"));
        System.out.println("Fake called? " + fake.called + ", amount=" + fake.lastAmount);
    }
}
