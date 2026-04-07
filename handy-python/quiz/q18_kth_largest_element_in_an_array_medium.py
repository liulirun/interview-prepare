"""
Q18) Kth Largest Element in an Array

AI-BEST:
- Quickselect with in-place partitioning around a pivot.
- Time: O(n) average, O(n^2) worst case, Space: O(1) extra

AI-EASY:
- Sort descending and index directly.
- Time: O(n log n), Space: depends on sort implementation
"""


def kth_largest_best(nums: list[int], k: int) -> int:
    values = nums[:]
    target = len(values) - k
    left = 0
    right = len(values) - 1

    def partition(lo: int, hi: int, pivot_index: int) -> int:
        pivot_value = values[pivot_index]
        values[pivot_index], values[hi] = values[hi], values[pivot_index]
        store_index = lo
        for i in range(lo, hi):
            if values[i] < pivot_value:
                values[store_index], values[i] = values[i], values[store_index]
                store_index += 1
        values[store_index], values[hi] = values[hi], values[store_index]
        return store_index

    # Step 1: Partition around a pivot so smaller values land on the left.
    # Why: Quickselect needs a partially ordered array to focus the search.
    while left <= right:
        pivot_index = (left + right) // 2
        pivot_index = partition(left, right, pivot_index)

        # Step 2: Narrow the search to the side that contains the target index.
        # Why: Only one side can contain the kth largest after partitioning.
        if pivot_index == target:
            return values[pivot_index]
        if pivot_index < target:
            left = pivot_index + 1
        else:
            right = pivot_index - 1

    # Step 3: Return the target value once the pivot lands on it.
    # Why: The loop converges when the correct order statistic is isolated.
    return values[target]


def kth_largest_easy(nums: list[int], k: int) -> int:
    # Step 1: Sort the numbers in descending order.
    # Why: The kth largest is then just a direct lookup.
    ordered = sorted(nums, reverse=True)

    # Step 2: Pick the element at position k - 1.
    # Why: Descending order makes the target index easy to compute.
    return ordered[k - 1]


def run_demo() -> None:
    print("Q18: Kth Largest Element in an Array")
    samples = [
        ([3, 2, 1, 5, 6, 4], 2),
        ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4),
        ([1], 1),
    ]
    for nums, k in samples:
        print(f"Input: nums={nums}, k={k}")
        print("  BEST:", kth_largest_best(nums, k))
        print("  EASY:", kth_largest_easy(nums, k))


if __name__ == "__main__":
    run_demo()
