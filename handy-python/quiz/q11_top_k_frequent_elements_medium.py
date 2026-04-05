"""
Q11) Top K Frequent Elements

AI-BEST:
- Frequency map + bucket sort by frequency.
- Time: O(n) average, Space: O(n)

AI-EASY:
- Frequency map + sort by frequency descending.
- Time: O(n log n), Space: O(n)
"""


def top_k_frequent_best(nums: list[int], k: int) -> list[int]:
    freq: dict[int, int] = {}
    for n in nums:
        freq[n] = freq.get(n, 0) + 1

    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    for value, count in freq.items():
        buckets[count].append(value)

    result: list[int] = []
    for count in range(len(buckets) - 1, -1, -1):
        for value in buckets[count]:
            result.append(value)
            if len(result) == k:
                return result
    return result


def top_k_frequent_easy(nums: list[int], k: int) -> list[int]:
    freq: dict[int, int] = {}
    for n in nums:
        freq[n] = freq.get(n, 0) + 1
    return [x[0] for x in sorted(freq.items(), key=lambda item: item[1], reverse=True)[:k]]


def run_demo() -> None:
    print("Q11: Top K Frequent Elements")
    cases = [
        ([1, 1, 1, 2, 2, 3], 2),
        ([1], 1),
        ([4, 4, 2, 2, 2, 3, 3], 2),
    ]
    for nums, k in cases:
        print(f"Input: nums={nums}, k={k}")
        print("  BEST:", top_k_frequent_best(nums, k))
        print("  EASY:", top_k_frequent_easy(nums, k))


if __name__ == "__main__":
    run_demo()
