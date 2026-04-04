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

---

## Interview Prep Topics (What to Prepare to Pass)

### Core patterns to master
- Hash map / set: counting, lookup, deduplication.
- Two pointers + sliding window: substring/subarray optimization.
- Stack / queue: validation, monotonic structures, traversal order.
- Binary search: on sorted arrays and on answer space.
- Recursion / backtracking: subsets, permutations, combination search.
- Linked list basics: reverse, detect cycle, fast-slow pointer.
- Trees / graphs: DFS, BFS, level order, shortest path intuition.
- Intervals: merge, insert, overlap detection.
- Heap / priority queue: top-k, streaming min/max.
- Dynamic programming: 1D DP, 2D DP, state transitions.

### Interview execution skills
- Clarify constraints before coding (`n`, duplicates, sorted?, negative numbers?).
- Start with brute force, then optimize step by step.
- Speak complexity for every solution.
- Write clean edge-case handling (empty input, one item, all duplicates).
- Test with 3 cases: normal, edge, stress.

---

## 8) Two Sum
**Question**  
Given an array of integers and a target, return indices of two numbers that add up to target.

### [AI-BEST:]
Scan once with a hash map of `value -> index`. For each number, check if `target - current` already exists in the map; if yes, return the pair.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)`.
- Tradeoff: Fast and standard; uses extra memory.

### [AI-EASY:]
Use nested loops and test every pair until sum equals target.

[AI-ANALYZE:]
- Time: `O(n^2)`.
- Space: `O(1)`.
- Tradeoff: Very simple, fine for tiny arrays only.

---

## 9) Valid Anagram
**Question**  
Given two strings, determine whether one is an anagram of the other.

### [AI-BEST:]
If lengths differ, return false. Build character frequency counts from first string, decrement using second string, and verify all counts end at zero.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(k)`.
- Tradeoff: Efficient and robust for large strings.

### [AI-EASY:]
Sort both strings and compare the sorted results.

[AI-ANALYZE:]
- Time: `O(n log n)`.
- Space: depends on sort implementation.
- Tradeoff: Easy to implement and reason about, but slower than counting.

---

## 10) Merge Intervals
**Question**  
Given intervals `[start, end]`, merge all overlapping intervals.

### [AI-BEST:]
Sort intervals by start time, then iterate once, merging into a result list when overlap exists.

[AI-ANALYZE:]
- Time: `O(n log n)` because of sorting.
- Space: `O(n)` for output (or less if in-place style is used).
- Tradeoff: Standard production approach and easy to maintain.

### [AI-EASY:]
Repeatedly compare every interval pair and merge overlaps until no more changes happen.

[AI-ANALYZE:]
- Time: can be `O(n^2)` or worse depending on repeated passes.
- Space: moderate due to repeated list rebuild.
- Tradeoff: Conceptually simple, poor scalability.

---

## 11) Top K Frequent Elements
**Question**  
Given an array, return the `k` most frequent elements.

### [AI-BEST:]
Count with hash map, then use bucket sort by frequency (array of lists indexed by frequency), and collect from highest bucket down until `k` elements.

[AI-ANALYZE:]
- Time: `O(n)` average.
- Space: `O(n)`.
- Tradeoff: Excellent performance, slightly more setup code.

### [AI-EASY:]
Count with hash map, convert to list of pairs, sort by frequency descending, then take first `k`.

[AI-ANALYZE:]
- Time: `O(n log n)` from sorting.
- Space: `O(n)`.
- Tradeoff: Very readable and often acceptable in interviews unless strict time bound is expected.

---

## 12) Binary Search (Find First Occurrence)
**Question**  
Given a sorted array and target, return the first index of target, else `-1`.

### [AI-BEST:]
Use modified binary search: when `mid == target`, store answer and continue searching left half to find earliest occurrence.

[AI-ANALYZE:]
- Time: `O(log n)`.
- Space: `O(1)` iterative.
- Tradeoff: Fast and interview-classic; off-by-one bugs are the main risk.

### [AI-EASY:]
Use normal binary search to find any occurrence, then linearly move left to first position.

[AI-ANALYZE:]
- Time: `O(log n + m)` where `m` is duplicate run length; worst case `O(n)`.
- Space: `O(1)`.
- Tradeoff: Easier to reason about at first, but weaker worst-case guarantees.
