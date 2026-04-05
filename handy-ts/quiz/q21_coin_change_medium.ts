/**
 * Q21) Coin Change
 *
 * AI-BEST:
 * Bottom-up dynamic programming over amounts.
 * Time: O(amount * numberOfCoins), Space: O(amount)
 *
 * AI-EASY:
 * Greedy take-the-largest-coin-first approach.
 * Time: roughly O(amount / minCoin) in practice, Space: O(1)
 */

function coinChangeBest(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1).fill(amount + 1);
  dp[0] = 0;

  // Step 1: Initialize dp because each amount should start as "impossible" until we find a valid combination.
  for (let current = 1; current <= amount; current++) {
    // Step 2: Try every coin because any denomination could be the final coin in an optimal solution.
    for (const coin of coins) {
      if (current >= coin) {
        dp[current] = Math.min(dp[current], dp[current - coin] + 1);
      }
    }
  }

  // Step 3: Translate the sentinel back to -1 because values above amount are our marker for "unreachable".
  return dp[amount] > amount ? -1 : dp[amount];
}

function coinChangeEasy(coins: number[], amount: number): number {
  const sorted = [...coins].sort((a, b) => b - a);
  let remaining = amount;
  let count = 0;

  // Step 1: Pick the largest coin first because this is the simplest human-friendly heuristic.
  for (const coin of sorted) {
    while (remaining >= coin) {
      // Step 2: Use the coin as many times as possible because greedy choice tries to shrink the amount quickly.
      remaining -= coin;
      count++;
    }
  }

  // Step 3: Return the count only if we hit exact zero because leftover amount means the greedy choice got stuck.
  return remaining === 0 ? count : -1;
}

function runDemo(): void {
  console.log("Q21: Coin Change");
  const cases = [
    { coins: [1, 2, 5], amount: 11 },
    { coins: [2], amount: 3 },
    { coins: [1, 3, 4], amount: 6 },
  ];

  for (const { coins, amount } of cases) {
    console.log(`Input: coins=${JSON.stringify(coins)}, amount=${amount}`);
    console.log("  BEST:", coinChangeBest(coins, amount));
    console.log("  EASY:", coinChangeEasy(coins, amount));
  }
}

runDemo();

export {};
