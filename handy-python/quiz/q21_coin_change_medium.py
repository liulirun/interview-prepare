"""
Q21) Coin Change

AI-BEST:
- Bottom-up dynamic programming for minimum coins per amount.
- Time: O(amount * numberOfCoins), Space: O(amount)

AI-EASY:
- Greedy pick the largest coin repeatedly.
- Time: often around O(amount), Space: O(1)
"""


def coin_change_best(coins: list[int], amount: int) -> int:
    # Step 1: Create a DP table for every amount from 0 through the target.
    # Why: This lets us build the answer from smaller subproblems.
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0

    # Step 2: Relax the table for each amount and each coin.
    # Why: Every coin can improve the best known way to form a larger amount.
    for current in range(1, amount + 1):
        for coin in coins:
            if current - coin >= 0 and dp[current - coin] + 1 < dp[current]:
                dp[current] = dp[current - coin] + 1

    # Step 3: Convert unreachable states to -1 and return the best count.
    # Why: Infinity means no combination could form the target amount.
    return -1 if dp[amount] == float("inf") else dp[amount]


def coin_change_easy(coins: list[int], amount: int) -> int:
    # Step 1: Sort coins from largest to smallest.
    # Why: Greedy choice tries to reduce the remainder as fast as possible.
    ordered = sorted(coins, reverse=True)
    remaining = amount
    count = 0

    # Step 2: Keep taking the largest coin that fits.
    # Why: This is the simplest strategy to explain, even though it is not always correct.
    for coin in ordered:
        while remaining >= coin:
            remaining -= coin
            count += 1

    # Step 3: Return the count when the remainder reaches zero, else -1.
    # Why: A non-zero remainder means the greedy path got stuck.
    return count if remaining == 0 else -1


def run_demo() -> None:
    print("Q21: Coin Change")
    samples = [
        ([1, 2, 5], 11),
        ([2], 3),
        ([1, 3, 4], 6),
    ]
    for coins, amount in samples:
        print(f"Input: coins={coins}, amount={amount}")
        print("  BEST:", coin_change_best(coins, amount))
        print("  EASY:", coin_change_easy(coins, amount))


if __name__ == "__main__":
    run_demo()
