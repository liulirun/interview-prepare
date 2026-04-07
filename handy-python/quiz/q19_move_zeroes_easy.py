"""
Q19) Move Zeroes

AI-BEST:
- Compact non-zero values with a write pointer, then fill the tail with zeros.
- Time: O(n), Space: O(1)
"""


def move_zeroes_best(nums: list[int]) -> list[int]:
    # Step 1: Keep a write pointer for the next non-zero position.
    # Why: This lets us overwrite zeros in place without losing ordering.
    write = 0

    # Step 2: Copy each non-zero value forward as we scan.
    # Why: Every non-zero should keep its original relative order.
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1

    # Step 3: Fill the remaining positions with zeros.
    # Why: Once all non-zeros are compacted, the tail must become zero-filled.
    for i in range(write, len(nums)):
        nums[i] = 0

    return nums


def run_demo() -> None:
    print("Q19: Move Zeroes")
    samples = [
        [0, 1, 0, 3, 12],
        [0, 0, 1],
        [1, 2, 3],
        [],
    ]
    for nums in samples:
        working = nums[:]
        print(f"Input: nums={nums}")
        print("  BEST:", move_zeroes_best(working))


if __name__ == "__main__":
    run_demo()
