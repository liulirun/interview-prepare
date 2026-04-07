/**
 * Q16) Best Time to Buy and Sell Stock
 *
 * AI-BEST:
 * Track the minimum price so far and the best profit so far.
 * Time: O(n), Space: O(1)
 */

function maxProfitBest(prices: number[]): number {
  // Step 1: Track the cheapest price seen so far because any good sale depends on a prior buy.
  let minPrice = Number.POSITIVE_INFINITY;
  let bestProfit = 0;

  // Step 2: Evaluate profit at each day because selling today only depends on the cheapest earlier day.
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    bestProfit = Math.max(bestProfit, price - minPrice);
  }

  // Step 3: Return the largest spread because that is the best single transaction allowed.
  return bestProfit;
}

function runDemo(): void {
  console.log("Q16: Best Time to Buy and Sell Stock");
  const cases = [
    [7, 1, 5, 3, 6, 4],
    [7, 6, 4, 3, 1],
    [1, 2, 3, 4, 5],
  ];

  for (const prices of cases) {
    console.log(`Input: prices=${JSON.stringify(prices)}`);
    console.log("  BEST:", maxProfitBest(prices));
  }
}

runDemo();

export {};
