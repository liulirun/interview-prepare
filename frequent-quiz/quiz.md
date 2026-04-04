# Frequent Quiz Summary

## 1) Minimum Window Substring
**Question**  
Given two strings `s` and `t`, return the smallest substring in `s` that contains every character in `t` (including duplicates).

### [AI-BEST:]
Use a sliding window with two maps: required counts from `t` and current counts in the window. Expand right pointer, and once valid, shrink from left to keep the smallest valid window.

[AI-ANALYZE:]
- Time: `O(n + m)` where `n = s.length`, `m = t.length`.
- Space: `O(k)` for distinct tracked characters.
- Tradeoff: Slightly harder logic, but best real-world performance.

### [AI-EASY:]
Generate all substrings, check whether each covers all chars in `t`, and keep the shortest valid one.

[AI-ANALYZE:]
- Time: up to `O(n^3)` naive.
- Space: depends on checking method, usually low to moderate.
- Tradeoff: Very easy to explain, but too slow for large inputs.

---

## 2) Compress String (Run-Length Encoding)
**Question**  
Convert `aabcccccaaa` into `a2b1c5a3`, and return original string if compressed result is not shorter.

### [AI-BEST:]
Scan once, count consecutive repeated chars, append `char + count` to a list/builder, join once at the end, then compare lengths.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)`.
- Tradeoff: Slightly more code, but stable and scalable.

### [AI-EASY:]
Use the same counting idea, but concatenate directly into a result string on each step.

[AI-ANALYZE:]
- Time: can degrade to `O(n^2)` due to repeated string reallocation.
- Space: `O(n)`.
- Tradeoff: Short and readable, but less predictable performance.

---

## 3) First Non-Repeating Character Index
**Question**  
Return the index of the first character that appears exactly once; return `-1` if none.

### [AI-BEST:]
Do two passes: first build frequency map, second scan original string and return first index with count `1`.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(k)`.
- Tradeoff: Best balance of clarity and performance.

### [AI-EASY:]
For each character, scan the full string to count occurrences; return first index whose count is `1`.

[AI-ANALYZE:]
- Time: `O(n^2)`.
- Space: `O(1)` extra (ignoring charset assumptions).
- Tradeoff: Very straightforward but does not scale well.

---

## 4) Longest Palindromic Substring
**Question**  
Find the longest substring that reads the same forward and backward.

### [AI-BEST:]
Use Manacher's algorithm to compute palindrome radii in linear time.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)`.
- Tradeoff: Optimal performance, but high implementation complexity and bug risk.

### [AI-EASY:]
Expand around each center (odd and even), grow while chars match, and track the longest palindrome.

[AI-ANALYZE:]
- Time: `O(n^2)`.
- Space: `O(1)` extra.
- Tradeoff: Much easier and usually preferred unless strict linear-time is required.

---

## 5) Longest Substring Without Repeating Characters
**Question**  
Return the longest substring with no repeated characters.

### [AI-BEST:]
Use sliding window with a map of last seen index. On duplicate inside the window, move left pointer past the previous duplicate index.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(k)`.
- Tradeoff: Standard high-performance solution for production and interviews.

### [AI-EASY:]
Maintain current window string, detect duplicates with `indexOf`, slice window when duplicate appears, and continue.

[AI-ANALYZE:]
- Time: can degrade to `O(n^2)`.
- Space: moderate due to repeated slicing.
- Tradeoff: Easy to write and explain, weaker scalability.

---

## 6) Balanced Parentheses
**Question**  
Check whether `()`, `{}`, and `[]` are balanced and correctly nested.

### [AI-BEST:]
Use a stack: push opening brackets, pop and validate on closing brackets, and ensure stack is empty at the end.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)` worst case.
- Tradeoff: Industry-standard and robust parser pattern.

### [AI-EASY:]
Repeatedly remove `()`, `{}`, and `[]` pairs until no more changes; valid if final string is empty.

[AI-ANALYZE:]
- Time: usually `O(n^2)` or worse.
- Space: `O(n)` from repeated string rebuilds.
- Tradeoff: Easy mental model, inefficient for long strings.

---

## 7) Parking Lot Spot Allocation (OOP Simulation)
**Question**  
Design parking logic where vehicle types require different spot counts (for example, truck needs 3 contiguous spots).

### [AI-BEST:]
Track free contiguous intervals and allocate from interval structures. On park/unpark, split and merge intervals.

[AI-ANALYZE:]
- Time: often around `O(log n)` per operation (depends on structure).
- Space: `O(n)`.
- Tradeoff: Higher implementation complexity, better at scale.

### [AI-EASY:]
Represent lot as array; linearly scan for contiguous free segment of required size and fill it.

[AI-ANALYZE:]
- Time: `O(n)` park in worst case.
- Space: `O(n)`.
- Tradeoff: Best for small/medium systems, simple and maintainable.
