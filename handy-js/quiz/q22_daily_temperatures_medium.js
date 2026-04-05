/**
 * Q22) Daily Temperatures
 *
 * AI-BEST:
 * Monotonic decreasing stack of indices.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * For each day, scan ahead to find first warmer day.
 * Time: O(n^2), Space: O(1) extra
 */

function dailyTemperaturesBest(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);
  const stack = [];

  // Step 1: Walk through days once.
  // Why: stack tracks unresolved days waiting for a warmer temperature.
  for (let i = 0; i < n; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      answer[prevIndex] = i - prevIndex;
    }

    // Step 2: Push current day as unresolved.
    stack.push(i);
  }

  // Step 3: Remaining indices already default to 0.
  return answer;
}

function dailyTemperaturesEasy(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);

  // Step 1: Try each day as starting point.
  for (let i = 0; i < n; i++) {
    // Step 2: Scan forward for first warmer day.
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j] > temperatures[i]) {
        answer[i] = j - i;
        break;
      }
    }
  }

  // Step 3: Return computed waits.
  return answer;
}

function runDemo() {
  console.log("Q22: Daily Temperatures");
  const cases = [
    [73, 74, 75, 71, 69, 72, 76, 73],
    [30, 40, 50, 60],
    [30, 60, 90],
  ];

  for (const temps of cases) {
    console.log(`Input: temperatures=${JSON.stringify(temps)}`);
    console.log("  BEST:", JSON.stringify(dailyTemperaturesBest(temps)));
    console.log("  EASY:", JSON.stringify(dailyTemperaturesEasy(temps)));
  }
}

runDemo();
