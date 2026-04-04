/**
 * Topic: Composition over Inheritance
 *
 * Pro tip:
 * In interviews, say "inheritance models 'is-a'; composition models 'has-a'".
 * Then explain why composition usually keeps coupling lower.
 */
public class CompositionOverInherit {
    interface DiscountPolicy {
        int apply(int originalCents);
    }

    static class NoDiscount implements DiscountPolicy {
        @Override
        public int apply(int originalCents) {
            return originalCents;
        }
    }

    static class PercentageDiscount implements DiscountPolicy {
        private final int percent;

        PercentageDiscount(int percent) {
            if (percent < 0 || percent > 100) {
                throw new IllegalArgumentException("percent must be 0..100");
            }
            this.percent = percent;
        }

        @Override
        public int apply(int originalCents) {
            return originalCents - (originalCents * percent / 100);
        }
    }

    static class Checkout {
        private final DiscountPolicy discountPolicy;

        Checkout(DiscountPolicy discountPolicy) {
            this.discountPolicy = discountPolicy;
        }

        int total(int subtotalCents) {
            return discountPolicy.apply(subtotalCents);
        }
    }

    public static void main(String[] args) {
        Checkout regular = new Checkout(new NoDiscount());
        Checkout promo = new Checkout(new PercentageDiscount(15));

        System.out.println("Regular total: " + regular.total(10000));
        System.out.println("Promo total: " + promo.total(10000));
    }
}
