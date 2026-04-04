"""
Q5) Longest Substring Without Repeating Characters

AI-BEST:
- Sliding window + last seen index map.
- Time: O(n), Space: O(k)

AI-EASY:
- Keep current window string and use find/slicing.
- Time: can degrade to O(n^2), Space: moderate
"""


def longest_substring_best(s: str) -> str:
    left = 0
    best_start = 0
    best_len = 0
    last_seen: dict[str, int] = {}

    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right

        current_len = right - left + 1
        if current_len > best_len:
            best_len = current_len
            best_start = left

    return s[best_start:best_start + best_len]


def longest_substring_easy(s: str) -> str:
    current_window = ""
    longest_found = ""

    for ch in s:
        duplicate_index = current_window.find(ch)
        if duplicate_index >= 0:
            current_window = current_window[duplicate_index + 1:] + ch
        else:
            current_window += ch

        if len(current_window) > len(longest_found):
            longest_found = current_window

    return longest_found


def run_demo() -> None:
    print("Q5: Longest Substring Without Repeating Characters")
    samples = ["abcdbcabcbb", "bbbbb", "pwwkew", "", "au"]
    for s in samples:
        print(f'Input: "{s}"')
        print("  BEST:", longest_substring_best(s))
        print("  EASY:", longest_substring_easy(s))


if __name__ == "__main__":
    run_demo()
