"""
Q12) Binary Search (Find First Occurrence)

AI-BEST:
- Modified binary search, continue left on match.
- Time: O(log n), Space: O(1)

AI-EASY:
- Binary search for any target, then walk left.
- Time: O(log n + m), worst O(n), Space: O(1)
"""


def first_occurrence_best(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    answer = -1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            answer = mid
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return answer


def first_occurrence_easy(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    found = -1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            found = mid
            break
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    if found == -1:
        return -1

    while found > 0 and nums[found - 1] == target:
        found -= 1
    return found


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
        print("  EASY:", first_occurrence_easy(nums, target))


if __name__ == "__main__":
    run_demo()
