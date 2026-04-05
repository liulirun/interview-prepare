/**
 * Q21) Coin Change
 *
 * AI-BEST:
 * Bottom-up dynamic programming.
 * Time: O(amount * coins.length), Space: O(amount)
 *
 * AI-EASY:
 * Greedy: repeatedly pick largest possible coin.
 * Time: O(amount / minCoin) roughly, Space: O(1)
 * Note: Greedy is not always correct for arbitrary coin sets.
 */

function coinChangeBest(coins, amount) {
  // Step 1: dp[x] = minimum coins needed to make amount x.
  // Why: this stores reusable subproblem answers.
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  // Step 2: Relax transitions for each amount and coin.
  for (let x = 1; x <= amount; x++) {
    for (const coin of coins) {
      if (x - coin >= 0) {
        dp[x] = Math.min(dp[x], dp[x - coin] + 1);
      }
    }
  }

  // Step 3: Return answer if reachable.
  return Number.isFinite(dp[amount]) ? dp[amount] : -1;
}

function coinChangeEasy(coins, amount) {
  // Step 1: Sort descending and take biggest coin first.
  // Why: simple and intuitive, but not globally optimal in all systems.
  const sorted = [...coins].sort((a, b) => b - a);
  let remaining = amount;
  let used = 0;

  for (const coin of sorted) {
    while (remaining >= coin) {
      remaining -= coin;
      used++;
    }
  }

  // Step 2: If amount fully consumed, return used count.
  // Step 3: Otherwise return -1 (or non-optimal failure case).
  return remaining === 0 ? used : -1;
}

function runDemo() {
  console.log("Q21: Coin Change");
  const cases = [
    { coins: [1, 2, 5], amount: 11 },
    { coins: [2], amount: 3 },
    { coins: [1, 3, 4], amount: 6 }, // Greedy gives 3, optimal is 2
  ];

  for (const { coins, amount } of cases) {
    console.log(`Input: coins=${JSON.stringify(coins)}, amount=${amount}`);
    console.log("  BEST:", coinChangeBest(coins, amount));
    console.log("  EASY:", coinChangeEasy(coins, amount));
  }
}

runDemo();
