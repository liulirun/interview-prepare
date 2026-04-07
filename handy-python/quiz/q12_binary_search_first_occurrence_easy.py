"""
Q12) Binary Search (Find First Occurrence)

AI-BEST:
- Modified binary search, continue left on match.
- Time: O(log n), Space: O(1)
"""


def first_occurrence_best(nums: list[int], target: int) -> int:
    # Step 1: Run binary search over the sorted array.
    # Why: We want the logarithmic-time search that keeps the problem efficient.
    left, right = 0, len(nums) - 1
    answer = -1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            # Step 2: Record the match and keep searching left.
            # Why: Earlier matches could exist, and we need the first occurrence.
            answer = mid
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    # Step 3: Return the stored leftmost answer.
    # Why: The best candidate may have been found before the loop ended.
    return answer


def run_demo() -> None:
    print("Q12: Binary Search First Occurrence")
    cases = [
        ([1, 2, 2, 2, 3, 4], 2),
        ([1, 3, 5, 7], 4),
        ([8, 8, 8, 8], 8),
    ]
    for nums, target in cases:
        print(f"Input: nums={nums}, target={target}")
        print("  BEST:", first_occurrence_best(nums, target))


if __name__ == "__main__":
    run_demo()
