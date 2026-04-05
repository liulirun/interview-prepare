"""
Q15) Maximum Subarray

AI-BEST:
- Kadane's algorithm with current and global best sums.
- Time: O(n), Space: O(1)
"""


def maximum_subarray_best(nums: list[int]) -> int:
    if not nums:
        return 0

    # Step 1: Initialize the running sum and best sum from the first value.
    # Why: This protects the all-negative case and avoids biasing the answer toward zero.
    current_sum = nums[0]
    best_sum = nums[0]

    # Step 2: At each position, either extend the previous subarray or restart here.
    # Why: The best subarray ending at this index depends only on the previous one.
    for value in nums[1:]:
        current_sum = max(value, current_sum + value)

        # Step 3: Update the global best whenever the current window improves.
        # Why: We only care about the best sum seen anywhere in the array.
        best_sum = max(best_sum, current_sum)

    return best_sum


def run_demo() -> None:
    print("Q15: Maximum Subarray")
    samples = [
        [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        [1],
        [-3, -2, -5],
        [],
    ]
    for nums in samples:
        print(f"Input: nums={nums}")
        print("  BEST:", maximum_subarray_best(nums))


if __name__ == "__main__":
    run_demo()
