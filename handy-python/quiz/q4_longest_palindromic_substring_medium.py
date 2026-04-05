"""
Q4) Longest Palindromic Substring

AI-BEST:
- Manacher's algorithm.
- Time: O(n), Space: O(n)

AI-EASY:
- Expand around center (odd + even).
- Time: O(n^2), Space: O(1) extra
"""


def longest_palindrome_best(s: str) -> str:
    if not s:
        return ""

    # Transform "abba" -> "^#a#b#b#a#$" to unify odd/even centers.
    t = "^#" + "#".join(s) + "#$"
    p = [0] * len(t)
    center = 0
    right = 0

    for i in range(1, len(t) - 1):
        mirror = 2 * center - i
        if i < right:
            p[i] = min(right - i, p[mirror])

        while t[i + 1 + p[i]] == t[i - 1 - p[i]]:
            p[i] += 1

        if i + p[i] > right:
            center = i
            right = i + p[i]

    max_len = 0
    center_index = 0
    for i in range(1, len(p) - 1):
        if p[i] > max_len:
            max_len = p[i]
            center_index = i

    start = (center_index - max_len) // 2
    return s[start:start + max_len]


def longest_palindrome_easy(s: str) -> str:
    if not s:
        return ""

    best = ""
    for i in range(len(s)):
        odd = _expand(s, i, i)
        even = _expand(s, i, i + 1)
        if len(odd) > len(best):
            best = odd
        if len(even) > len(best):
            best = even
    return best


def _expand(s: str, left: int, right: int) -> str:
    l, r = left, right
    while l >= 0 and r < len(s) and s[l] == s[r]:
        l -= 1
        r += 1
    return s[l + 1:r]


def run_demo() -> None:
    print("Q4: Longest Palindromic Substring")
    samples = ["baabad", "babad", "cbbd", "a", ""]
    for s in samples:
        print(f'Input: "{s}"')
        print("  BEST:", longest_palindrome_best(s))
        print("  EASY:", longest_palindrome_easy(s))


if __name__ == "__main__":
    run_demo()
