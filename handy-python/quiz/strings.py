is the max string length. For very long strings, replacing the sort with a frequency array tuple `(0, 1, 0...)` of size 26 can reduce complexity to

3\. Minimum Window Substring

**Question:** Given two strings `s` and `t`, return the minimum window in `s` which will contain all the characters in `t`.

**Answer & Code:**\
This requires a **Two-Pointer Sliding Window**. We expand the right pointer until the condition is met, then contract the left pointer to find the "minimum."

```python
from collections import Counter

def min_window(s: str, t: str) -> str:
    if not t or not s: return ""

    dict_t = Counter(t)
    required = len(dict_t)
    l, r = 0, 0
    formed = 0
    window_counts = {}
    ans = float("inf"), None, None # (length, left, right)

    while r < len(s):
        char = s[r]
        window_counts[char] = window_counts.get(char, 0) + 1
        if char in dict_t and window_counts[char] == dict_t[char]:
            formed += 1

        while l <= r and formed == required:
            char = s[l]
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)

            window_counts[char] -= 1
            if char in dict_t and window_counts[char] < dict_t[char]:
                formed -= 1
            l += 1    
        r += 1

    return "" if ans[0] == float("inf") else s[ans[1] : ans[2] + 1]
```


**Senior Note:** This is a classic "Hard" problem. Mentioning the "contracting window" logic demonstrates an understanding of optimizing search spaces.

**Senior Note:** Discussing **Manacher’s Algorithm** (


time) is a great way to show deep theoretical knowledge, even if you implement the
version for readability.

5\. String Compression (Run-Length Encoding)

**Question:** Implement a function to perform basic string compression using the counts of repeated characters (e.g., "aabcccccaaa" -> "a2b1c5a3"). If the compressed string is not smaller, return the original.

**Answer & Code:**\
In Python, avoid repeated string concatenation (which is

due to immutability). Use a list and `.join()`.

```python
def compress_string(s: str) -> str:
    if not s: return ""

    res = []
    count = 0

    for i in range(len(s)):
        count += 1
        # If next char is different or we reached the end
        if i + 1 == len(s) or s[i] != s[i+1]:
            res.append(s[i] + str(count))
            count = 0

    result = "".join(res)
    return result if len(result) < len(s) else s

# Example: "aabcccccaaa" -> "a2b1c5a3"
```


**Senior Note:** Emphasize that strings in Python are **immutable**. Building a string in a loop using `+` creates a new string object every time. Using a list buffer is the industry standard for performance.