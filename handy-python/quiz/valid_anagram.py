"""
Q9) Valid Anagram

AI-BEST:
- Character frequency counting.
- Time: O(n), Space: O(k)

AI-EASY:
- Sort and compare.
- Time: O(n log n), Space: depends on runtime
"""


def is_anagram_best(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    counts: dict[str, int] = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1

    for ch in t:
        next_count = counts.get(ch, 0) - 1
        if next_count < 0:
            return False
        counts[ch] = next_count

    return all(count == 0 for count in counts.values())


def is_anagram_easy(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return sorted(s) == sorted(t)


def run_demo() -> None:
    print("Q9: Valid Anagram")
    cases = [("anagram", "nagaram"), ("rat", "car"), ("listen", "silent")]
    for s, t in cases:
        print(f'Input: s="{s}", t="{t}"')
        print("  BEST:", is_anagram_best(s, t))
        print("  EASY:", is_anagram_easy(s, t))


if __name__ == "__main__":
    run_demo()
