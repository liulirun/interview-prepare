"""
Q1) Minimum Window Substring

AI-BEST:
- Sliding window + frequency maps.
- Time: O(n + m), Space: O(k)

AI-EASY:
- Check every substring and validate against required chars.
- Time: O(n^3) naive, Space: O(k)
"""

from collections import Counter


def min_window_best(s: str, t: str) -> str:
    if not s or not t:
        return ""

    need = Counter(t)
    required = len(need)

    formed = 0
    left = 0
    window_counts: dict[str, int] = {}
    best_len = float("inf")
    best_l = 0
    best_r = 0

    for right, ch in enumerate(s):
        window_counts[ch] = window_counts.get(ch, 0) + 1
        if ch in need and window_counts[ch] == need[ch]:
            formed += 1

        # Shrink while the window remains valid.
        while left <= right and formed == required:
            current_len = right - left + 1
            if current_len < best_len:
                best_len = current_len
                best_l = left
                best_r = right

            left_char = s[left]
            window_counts[left_char] -= 1
            if left_char in need and window_counts[left_char] < need[left_char]:
                formed -= 1
            left += 1

    if best_len == float("inf"):
        return ""
    return s[best_l:best_r + 1]


def min_window_easy(s: str, t: str) -> str:
    if not s or not t or len(t) > len(s):
        return ""

    best = ""
    for start in range(len(s)):
        for end in range(start, len(s)):
            candidate = s[start:end + 1]
            if _covers_all(candidate, t):
                if best == "" or len(candidate) < len(best):
                    best = candidate
    return best


def _covers_all(candidate: str, t: str) -> bool:
    counts = Counter(candidate)
    for ch in t:
        counts[ch] -= 1
        if counts[ch] < 0:
            return False
    return True


def run_demo() -> None:
    print("Q1: Minimum Window Substring")
    samples = [
        ("ADOBECODEBANC", "ABC"),
        ("a", "a"),
        ("a", "aa"),
    ]
    for s, t in samples:
        print(f'Input: s="{s}", t="{t}"')
        print("  BEST:", min_window_best(s, t))
        print("  EASY:", min_window_easy(s, t))


if __name__ == "__main__":
    run_demo()
