"""
Q22) Daily Temperatures

AI-BEST:
- Monotonic decreasing stack of indices.
- Time: O(n), Space: O(n)

AI-EASY:
- For each day, scan forward until a warmer day appears.
- Time: O(n^2), Space: O(1)
"""


def daily_temperatures_best(temperatures: list[int]) -> list[int]:
    result = [0] * len(temperatures)
    stack: list[int] = []

    # Step 1: Keep unresolved days on a decreasing stack.
    # Why: The stack tells us which earlier days are still waiting for a warmer temperature.
    for i, temp in enumerate(temperatures):
        # Step 2: Resolve any earlier day that is cooler than the current one.
        # Why: The current day is the first warmer day for every popped index.
        while stack and temperatures[stack[-1]] < temp:
            prev = stack.pop()
            result[prev] = i - prev

        # Step 3: Push the current day for future comparisons.
        # Why: Today may be waiting for some warmer day later on.
        stack.append(i)

    return result


def daily_temperatures_easy(temperatures: list[int]) -> list[int]:
    result = [0] * len(temperatures)

    # Step 1: Examine each day independently.
    # Why: A simple forward scan is the easiest baseline to reason about.
    for i in range(len(temperatures)):
        # Step 2: Search forward until a warmer day is found.
        # Why: The first warmer day determines the answer for this index.
        for j in range(i + 1, len(temperatures)):
            if temperatures[j] > temperatures[i]:
                result[i] = j - i
                break

        # Step 3: Leave zero when no warmer day exists.
        # Why: The initialized value already represents "no future warmer temperature".

    return result


def run_demo() -> None:
    print("Q22: Daily Temperatures")
    samples = [
        [73, 74, 75, 71, 69, 72, 76, 73],
        [30, 40, 50, 60],
        [30, 60, 90],
    ]
    for temperatures in samples:
        print(f"Input: temperatures={temperatures}")
        print("  BEST:", daily_temperatures_best(temperatures))
        print("  EASY:", daily_temperatures_easy(temperatures))


if __name__ == "__main__":
    run_demo()
