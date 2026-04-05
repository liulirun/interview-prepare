"""
Q13) Product of Array Except Self

AI-BEST:
- Prefix products from the left and suffix products from the right.
- Time: O(n), Space: O(1) extra if output array is excluded

AI-EASY:
- Recompute the product for each index with a nested loop.
- Time: O(n^2), Space: O(1)
"""


def product_except_self_best(nums: list[int]) -> list[int]:
    # Step 1: Build prefix products into the output array.
    # Why: Each position should know the product of everything to its left.
    result = [1] * len(nums)
    prefix = 1
    for i, value in enumerate(nums):
        result[i] = prefix
        prefix *= value

    # Step 2: Multiply in suffix products while scanning from the right.
    # Why: Combining left and right contributions gives the full product except self.
    suffix = 1
    for i in range(len(nums) - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]

    # Step 3: Return the finished product array.
    # Why: The output now contains both prefix and suffix information for each index.
    return result


def product_except_self_easy(nums: list[int]) -> list[int]:
    # Step 1: Visit each index independently.
    # Why: This keeps the logic very direct and easy to trace.
    result: list[int] = []
    for i in range(len(nums)):
        product = 1

        # Step 2: Multiply every element except the current one.
        # Why: This matches the problem statement literally, even if it is slower.
        for j in range(len(nums)):
            if i != j:
                product *= nums[j]
        result.append(product)

    # Step 3: Return all per-index products.
    # Why: Each nested-loop pass has produced one answer slot.
    return result


def run_demo() -> None:
    print("Q13: Product of Array Except Self")
    samples = [
        [1, 2, 3, 4],
        [-1, 1, 0, -3, 3],
        [2, 3],
    ]
    for nums in samples:
        print(f"Input: nums={nums}")
        print("  BEST:", product_except_self_best(nums))
        print("  EASY:", product_except_self_easy(nums))


if __name__ == "__main__":
    run_demo()
