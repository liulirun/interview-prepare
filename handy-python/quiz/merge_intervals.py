"""
Q10) Merge Intervals

AI-BEST:
- Sort by start and sweep once.
- Time: O(n log n), Space: O(n) output

AI-EASY:
- Repeated pairwise merge until stable.
- Time: O(n^2) or worse, Space: O(n)
"""


def merge_intervals_best(intervals: list[list[int]]) -> list[list[int]]:
    if len(intervals) <= 1:
        return [x[:] for x in intervals]

    sorted_intervals = sorted((x[:] for x in intervals), key=lambda x: x[0])
    merged = [sorted_intervals[0]]

    for current in sorted_intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    return merged


def merge_intervals_easy(intervals: list[list[int]]) -> list[list[int]]:
    arr = [x[:] for x in intervals]
    changed = True
    while changed:
        changed = False
        i = 0
        while i < len(arr):
            j = i + 1
            while j < len(arr):
                if _overlap(arr[i], arr[j]):
                    arr[i] = [min(arr[i][0], arr[j][0]), max(arr[i][1], arr[j][1])]
                    arr.pop(j)
                    changed = True
                    i = -1
                    break
                j += 1
            if i == -1:
                break
            i += 1
    return sorted(arr, key=lambda x: x[0])


def _overlap(a: list[int], b: list[int]) -> bool:
    return a[0] <= b[1] and b[0] <= a[1]


def run_demo() -> None:
    print("Q10: Merge Intervals")
    cases = [
        [[1, 3], [2, 6], [8, 10], [15, 18]],
        [[1, 4], [4, 5]],
        [[1, 4], [0, 2], [3, 5]],
    ]
    for intervals in cases:
        print(f"Input: {intervals}")
        print("  BEST:", merge_intervals_best(intervals))
        print("  EASY:", merge_intervals_easy(intervals))


if __name__ == "__main__":
    run_demo()
