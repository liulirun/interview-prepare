/**
 * Q16) Best Time to Buy and Sell Stock
 *
 * AI-BEST:
 * Track min price so far and max profit so far.
 * Time: O(n), Space: O(1)
 */

function maxProfitBest(prices) {
  // Step 1: Track lowest buy price seen so far.
  // Why: best sell profit at day i is always relative to the cheapest earlier day.
  let minPrice = Infinity;
  let bestProfit = 0;

  // Step 2: Scan prices once and update best profit.
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    bestProfit = Math.max(bestProfit, price - minPrice);
  }

  // Step 3: Return max one-transaction profit.
  return bestProfit;
}

function runDemo() {
  console.log("Q16: Best Time to Buy and Sell Stock");
  const cases = [
    [7, 1, 5, 3, 6, 4],
    [7, 6, 4, 3, 1],
    [2, 4, 1],
  ];

  for (const prices of cases) {
    console.log(`Input: prices=${JSON.stringify(prices)}`);
    console.log("  BEST:", maxProfitBest(prices));
  }
}

runDemo();
