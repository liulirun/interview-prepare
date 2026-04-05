"""
Q16) Best Time to Buy and Sell Stock

AI-BEST:
- Track the minimum price so far and the best profit.
- Time: O(n), Space: O(1)
"""


def max_profit_best(prices: list[int]) -> int:
    if not prices:
        return 0

    # Step 1: Track the cheapest price seen so far.
    # Why: The best sell decision on any day depends on the cheapest earlier buy.
    min_price = prices[0]
    best_profit = 0

    # Step 2: Compute the profit for selling on each day.
    # Why: Every day is a candidate sell day once we know the best prior buy.
    for price in prices[1:]:
        best_profit = max(best_profit, price - min_price)
        min_price = min(min_price, price)

    # Step 3: Return the best profit found.
    # Why: We have already checked every buy/sell pairing implicitly.
    return best_profit


def run_demo() -> None:
    print("Q16: Best Time to Buy and Sell Stock")
    samples = [
        [7, 1, 5, 3, 6, 4],
        [7, 6, 4, 3, 1],
        [1, 2],
        [],
    ]
    for prices in samples:
        print(f"Input: prices={prices}")
        print("  BEST:", max_profit_best(prices))


if __name__ == "__main__":
    run_demo()
