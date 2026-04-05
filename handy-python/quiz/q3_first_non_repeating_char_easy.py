"""
Q3) First Non-Repeating Character Index

AI-BEST:
- Two passes with frequency dictionary.
- Time: O(n), Space: O(k)

AI-EASY:
- For each char, scan entire string to count.
- Time: O(n^2), Space: O(1) extra
"""


def first_unique_index_best(s: str) -> int:
    counts: dict[str, int] = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1

    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1


def first_unique_index_easy(s: str) -> int:
    for i, ch in enumerate(s):
        count = 0
        for c in s:
            if c == ch:
                count += 1
        if count == 1:
            return i
    return -1


def run_demo() -> None:
    print("Q3: First Non-Repeating Character Index")
    samples = ["aabcc", "aacc", "leetcode", "aabbccd"]
    for s in samples:
        print(f'Input: "{s}"')
        print("  BEST:", first_unique_index_best(s))
        print("  EASY:", first_unique_index_easy(s))


if __name__ == "__main__":
    run_demo()
