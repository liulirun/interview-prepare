"""
Q8) Two Sum

AI-BEST:
- One pass hash map value -> index.
- Time: O(n), Space: O(n)

AI-EASY:
- Nested loops over all pairs.
- Time: O(n^2), Space: O(1)
"""


def two_sum_best(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for i, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], i]
        seen[value] = i
    return [-1, -1]


def two_sum_easy(nums: list[int], target: int) -> list[int]:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return [-1, -1]


def run_demo() -> None:
    print("Q8: Two Sum")
    cases = [
        ([2, 7, 11, 15], 9),
        ([3, 2, 4], 6),
        ([3, 3], 6),
    ]
    for nums, target in cases:
        print(f"Input: nums={nums}, target={target}")
        print("  BEST:", two_sum_best(nums, target))
        print("  EASY:", two_sum_easy(nums, target))


if __name__ == "__main__":
    run_demo()
