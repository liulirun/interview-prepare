/**
 * Q22) Daily Temperatures
 *
 * AI-BEST:
 * Monotonic decreasing stack of indices.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Scan forward from each day until a warmer temperature appears.
 * Time: O(n^2), Space: O(1)
 */

function dailyTemperaturesBest(temperatures: number[]): number[] {
  const result = new Array<number>(temperatures.length).fill(0);
  const stack: number[] = [];

  // Step 1: Keep indices in a decreasing stack because unresolved colder days need a future warmer day.
  for (let day = 0; day < temperatures.length; day++) {
    const currentTemp = temperatures[day];

    // Step 2: Resolve previous colder days now because the current temperature is the first warmer day for them.
    while (stack.length > 0 && currentTemp > temperatures[stack[stack.length - 1]]) {
      const previousDay = stack.pop()!;
      result[previousDay] = day - previousDay;
    }

    stack.push(day);
  }

  // Step 3: Return the result because any index left in the stack never found a warmer future day and stays zero.
  return result;
}

function dailyTemperaturesEasy(temperatures: number[]): number[] {
  const result = new Array<number>(temperatures.length).fill(0);

  // Step 1: Check each day independently because the easy version prioritizes readability over speed.
  for (let day = 0; day < temperatures.length; day++) {
    // Step 2: Scan forward until a warmer temperature appears because that is the first day that matters.
    for (let next = day + 1; next < temperatures.length; next++) {
      if (temperatures[next] > temperatures[day]) {
        result[day] = next - day;
        break;
      }
    }
  }

  // Step 3: Return the waiting-time array because every day now has its final answer.
  return result;
}

function runDemo(): void {
  console.log("Q22: Daily Temperatures");
  const cases = [
    [73, 74, 75, 71, 69, 72, 76, 73],
    [30, 40, 50, 60],
    [30, 60, 90],
  ];

  for (const temperatures of cases) {
    console.log(`Input: temperatures=${JSON.stringify(temperatures)}`);
    console.log("  BEST:", dailyTemperaturesBest(temperatures));
    console.log("  EASY:", dailyTemperaturesEasy(temperatures));
  }
}

runDemo();

export {};
