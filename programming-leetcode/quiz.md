# Frequent Quiz Summary

## 1) Minimum Window Substring - HARD
**Question**  
Given two strings `s` and `t`, return the smallest substring in `s` that contains every character in `t` (including duplicates).

### [AI-BEST:]
- Step 1: Build a required frequency map from `t`.
- Step 2: Expand a sliding window with a right pointer over `s`.
- Step 3: When all required chars are satisfied, shrink from the left.
- Step 4: Track and return the smallest valid window.

[AI-ANALYZE:]
- Time: `O(n + m)` where `n = s.length`, `m = t.length`.
- Space: `O(k)` for distinct tracked characters.
- Tradeoff: Slightly harder logic, but best real-world performance.

### [AI-EASY:]
- Step 1: Generate every possible substring of `s`.
- Step 2: For each substring, check if it covers all chars in `t`.
- Step 3: Keep the shortest valid substring.

[AI-ANALYZE:]
- Time: up to `O(n^3)` naive.
- Space: depends on checking method, usually low to moderate.
- Tradeoff: Easy to explain, but too slow for large inputs.

---

## 2) Compress String (Run-Length Encoding) - EASY
**Question**  
Convert `aabcccccaaa` into `a2b1c5a3`, and return original string if compressed result is not shorter.

### [AI-BEST:]
- Step 1: Scan the string once and count repeated consecutive chars.
- Step 2: Append `char + count` to a list/builder.
- Step 3: Join once at the end and compare lengths.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)`.
- Tradeoff: Slightly more code, but stable and scalable.

---

## 3) First Non-Repeating Character Index - EASY
**Question**  
Return the index of the first character that appears exactly once; return `-1` if none.

### [AI-BEST:]
- Step 1: Build a frequency map of all characters.
- Step 2: Scan string from left to right.
- Step 3: Return first index whose count is `1`.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(k)`.
- Tradeoff: Best balance of clarity and performance.

---

## 4) Longest Palindromic Substring - HARD
**Question**  
Find the longest substring that reads the same forward and backward.

### [AI-BEST:]
- Step 1: Transform the string into Manacher format to unify centers.
- Step 2: Compute palindrome radius at each index.
- Step 3: Track max radius and map it back to original string indices.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)`.
- Tradeoff: Optimal performance, but high implementation complexity and bug risk.

### [AI-EASY:]
- Step 1: Treat each index as odd center and each gap as even center.
- Step 2: Expand while left/right chars match.
- Step 3: Track the longest palindrome found.

[AI-ANALYZE:]
- Time: `O(n^2)`.
- Space: `O(1)` extra.
- Tradeoff: Easier to implement, slower for very large input.

---

## 5) Longest Substring Without Repeating Characters - HARD
**Question**  
Return the longest substring with no repeated characters.

### [AI-BEST:]
- Step 1: Keep a sliding window and a map of last seen index per char.
- Step 2: If duplicate is inside current window, move left pointer.
- Step 3: Update best window bounds when a longer window appears.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(k)`.
- Tradeoff: Standard high-performance solution for production and interviews.

### [AI-EASY:]
- Step 1: Keep a current window string.
- Step 2: Use `indexOf` to detect duplicates.
- Step 3: Slice window after duplicate and continue.

[AI-ANALYZE:]
- Time: can degrade to `O(n^2)`.
- Space: moderate due to repeated slicing.
- Tradeoff: Easy to write, weaker scalability.

---

## 6) Balanced Parentheses - EASY
**Question**  
Check whether `()`, `{}`, and `[]` are balanced and correctly nested.

### [AI-BEST:]
- Step 1: Push opening brackets to a stack.
- Step 2: On closing bracket, pop and validate type.
- Step 3: Return valid only if stack is empty at end.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)` worst case.
- Tradeoff: Industry-standard and robust parser pattern.

---

## 7) Parking Lot Spot Allocation (OOP Simulation) - HARD
**Question**  
Design parking logic where vehicle types require different spot counts (for example, truck needs 3 contiguous spots).

### [AI-BEST:]
- Step 1: Track free space as contiguous intervals.
- Step 2: On park, allocate from a large enough interval and split it.
- Step 3: On unpark, insert released interval and merge neighbors.

[AI-ANALYZE:]
- Time: often around `O(log n)` per operation (depends on structure).
- Space: `O(n)`.
- Tradeoff: Higher implementation complexity, better at scale.

### [AI-EASY:]
- Step 1: Represent lot as an array of spots.
- Step 2: Linearly scan for contiguous free block.
- Step 3: Fill that block with vehicle ID.

[AI-ANALYZE:]
- Time: `O(n)` park in worst case.
- Space: `O(n)`.
- Tradeoff: Simple baseline, less scalable.

---

## 8) Two Sum - EASY
**Question**  
Given an array of integers and a target, return indices of two numbers that add up to target.

### [AI-BEST:]
- Step 1: Iterate once and store `value -> index` in map.
- Step 2: For each value, check if complement `target - value` exists.
- Step 3: Return matching pair immediately.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(n)`.
- Tradeoff: Fast and standard; uses extra memory.

---

## 9) Valid Anagram - EASY
**Question**  
Given two strings, determine whether one is an anagram of the other.

### [AI-BEST:]
- Step 1: If lengths differ, return false.
- Step 2: Count chars in first string.
- Step 3: Decrement counts with second string and verify all zero.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(k)`.
- Tradeoff: Efficient and robust for large strings.

---

## 10) Merge Intervals - HARD
**Question**  
Given intervals `[start, end]`, merge all overlapping intervals.

### [AI-BEST:]
- Step 1: Sort intervals by start.
- Step 2: Sweep once and merge overlaps into result.
- Step 3: Append non-overlapping intervals directly.

[AI-ANALYZE:]
- Time: `O(n log n)` because of sorting.
- Space: `O(n)` for output (or less if in-place style is used).
- Tradeoff: Standard production approach and easy to maintain.

### [AI-EASY:]
- Step 1: Compare interval pairs for overlap.
- Step 2: Merge any overlapping pair.
- Step 3: Repeat passes until no changes happen.

[AI-ANALYZE:]
- Time: can be `O(n^2)` or worse depending on repeated passes.
- Space: moderate due to repeated list rebuild.
- Tradeoff: Conceptually simple, poor scalability.

---

## 11) Top K Frequent Elements - HARD
**Question**  
Given an array, return the `k` most frequent elements.

### [AI-BEST:]
- Step 1: Build value frequency map.
- Step 2: Place values into buckets by frequency.
- Step 3: Collect from highest-frequency bucket down until `k` values.

[AI-ANALYZE:]
- Time: `O(n)` average.
- Space: `O(n)`.
- Tradeoff: Excellent performance, slightly more setup code.

### [AI-EASY:]
- Step 1: Build value frequency map.
- Step 2: Convert to pairs and sort by frequency descending.
- Step 3: Take first `k` values.

[AI-ANALYZE:]
- Time: `O(n log n)` from sorting.
- Space: `O(n)`.
- Tradeoff: Readable, but slower at scale.

---

## 12) Binary Search (Find First Occurrence) - EASY
**Question**  
Given a sorted array and target, return the first index of target, else `-1`.

### [AI-BEST:]
- Step 1: Run binary search.
- Step 2: On match, store answer and continue left half.
- Step 3: Return stored leftmost answer.

[AI-ANALYZE:]
- Time: `O(log n)`.
- Space: `O(1)` iterative.
- Tradeoff: Fast and interview-classic; off-by-one bugs are the main risk.

---

## 13) Product of Array Except Self - MEDIUM
**Question**  
Given an integer array `nums`, return an array where `answer[i]` is the product of all values except `nums[i]`, without using division.

### [AI-BEST:]
- Step 1: Build prefix products where each position stores product of elements to the left.
- Step 2: Build suffix products on the fly from right to left.
- Step 3: Multiply prefix and suffix contribution for each index.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(1)` extra if output array is excluded.
- Tradeoff: Best performance and handles zeros correctly, but needs careful index handling.

### [AI-EASY:]
- Step 1: For each index `i`, iterate the full array again.
- Step 2: Multiply every element except `i`.
- Step 3: Store the result for `i`.

[AI-ANALYZE:]
- Time: `O(n^2)`.
- Space: `O(1)` extra (excluding output).
- Tradeoff: Very easy to reason about, but too slow for large input.

---

## 14) Group Anagrams - MEDIUM
**Question**  
Given an array of strings, group anagrams together.

### [AI-BEST:]
- Step 1: For each word, sort its characters to create a canonical key.
- Step 2: Use a hash map from key to list of original words.
- Step 3: Return all grouped lists.

[AI-ANALYZE:]
- Time: `O(n * k log k)` where `k` is average word length.
- Space: `O(n * k)` for groups and keys.
- Tradeoff: Standard and reliable; sorting each word is the main cost.

### [AI-EASY:]
- Step 1: Compare each word with existing groups using character counts.
- Step 2: If it matches a group's signature, append it there.
- Step 3: If no match, create a new group.

[AI-ANALYZE:]
- Time: often `O(n^2 * k)` in worst case.
- Space: `O(n * k)`.
- Tradeoff: Conceptually straightforward, but scales poorly as group count grows.

---

## 15) Maximum Subarray - EASY
**Question**  
Find the contiguous subarray with the largest sum and return that sum.

### [AI-BEST:]
- Step 1: Use Kadane's approach with `currentSum` and `bestSum`.
- Step 2: At each value, either start new subarray at current value or extend previous one.
- Step 3: Update global best on every step.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(1)`.
- Tradeoff: Optimal and concise, but easy to mis-handle all-negative arrays if initialized incorrectly.

---

## 16) Best Time to Buy and Sell Stock - EASY
**Question**  
Given stock prices by day, return the maximum profit from one buy and one sell.

### [AI-BEST:]
- Step 1: Track the minimum price seen so far while scanning left to right.
- Step 2: For each day, compute potential profit `price - minPrice`.
- Step 3: Keep the maximum profit found.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(1)`.
- Tradeoff: Fast and clean; assumes only one transaction is allowed.

---

## 17) Number of Islands - MEDIUM
**Question**  
Given a 2D grid of `'1'` (land) and `'0'` (water), count how many islands exist (connected horizontally/vertically).

### [AI-BEST:]
- Step 1: Scan each cell.
- Step 2: When land is found, increment island count and run DFS/BFS to mark all connected land as visited.
- Step 3: Continue until full grid is processed.

[AI-ANALYZE:]
- Time: `O(rows * cols)`.
- Space: `O(rows * cols)` in worst-case recursion/queue usage.
- Tradeoff: Industry-standard flood-fill pattern; recursion depth can be a risk on very large grids.

### [AI-EASY:]
- Step 1: For each land cell, check neighbors and attempt to assign or merge island IDs manually.
- Step 2: Track label equivalences with extra bookkeeping.
- Step 3: Count unique final island labels.

[AI-ANALYZE:]
- Time: usually `O(rows * cols * alpha(n))` or worse depending on merge strategy.
- Space: `O(rows * cols)` for labels/maps.
- Tradeoff: Can work, but is more bookkeeping-heavy and easier to get wrong than flood-fill.

---

## 18) Kth Largest Element in an Array - MEDIUM
**Question**  
Given an unsorted array and integer `k`, return the `k`th largest element.

### [AI-BEST:]
- Step 1: Use Quickselect to partition around a pivot.
- Step 2: Recurse/iterate only into the side that contains the target index.
- Step 3: Stop when pivot lands on the target.

[AI-ANALYZE:]
- Time: `O(n)` average, `O(n^2)` worst case.
- Space: `O(1)` extra for iterative in-place partition.
- Tradeoff: Excellent average performance; worst-case can degrade without good pivot strategy.

### [AI-EASY:]
- Step 1: Sort array in descending order.
- Step 2: Return value at index `k - 1`.

[AI-ANALYZE:]
- Time: `O(n log n)`.
- Space: depends on sort implementation (`O(1)` to `O(n)`).
- Tradeoff: Very easy and stable to implement, slower than selection-focused methods.

---

## 19) Move Zeroes - EASY
**Question**  
Move all zeros in an array to the end while keeping the relative order of non-zero elements.

### [AI-BEST:]
- Step 1: Keep a write pointer for the next non-zero position.
- Step 2: Scan array and copy each non-zero to write pointer, then increment pointer.
- Step 3: Fill remaining positions with zeros.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(1)`.
- Tradeoff: In-place and production-friendly; clear two-pointer pattern.

---

## 20) Linked List Cycle - EASY
**Question**  
Determine if a singly linked list has a cycle.

### [AI-BEST:]
- Step 1: Use two pointers, slow moves 1 step and fast moves 2 steps.
- Step 2: If they ever meet, cycle exists.
- Step 3: If fast reaches null, no cycle.

[AI-ANALYZE:]
- Time: `O(n)`.
- Space: `O(1)`.
- Tradeoff: Best-known approach; avoids extra memory compared to visited-set method.

---

## 21) Coin Change - MEDIUM
**Question**  
Given coin denominations and an amount, return the minimum number of coins needed to make that amount, or `-1` if impossible.

### [AI-BEST:]
- Step 1: Use bottom-up dynamic programming where `dp[x]` is min coins for amount `x`.
- Step 2: Initialize `dp[0] = 0`, others as infinity.
- Step 3: For each amount and coin, relax `dp[x] = min(dp[x], dp[x - coin] + 1)`.

[AI-ANALYZE:]
- Time: `O(amount * numberOfCoins)`.
- Space: `O(amount)`.
- Tradeoff: Deterministic and easy to test; memory grows with target amount.

### [AI-EASY:]
- Step 1: Try greedy pick of largest coin first repeatedly.
- Step 2: Reduce remaining amount until zero or stuck.
- Step 3: Count selected coins.

[AI-ANALYZE:]
- Time: often around `O(amount)` or `O(amount / minCoin)`.
- Space: `O(1)`.
- Tradeoff: Very simple, but incorrect for many coin systems (for example, `[1,3,4]` with amount `6`).

---

## 22) Daily Temperatures - MEDIUM
**Question**  
Given daily temperatures, return an array where each index stores how many days until a warmer temperature (or `0` if none).

### [AI-BEST:]
- Step 1: Use a monotonic decreasing stack of indices.
- Step 2: While current temperature is warmer than top-of-stack index, pop and compute distance.
- Step 3: Push current index and continue.

[AI-ANALYZE:]
- Time: `O(n)` because each index is pushed and popped at most once.
- Space: `O(n)` worst case.
- Tradeoff: Best runtime for this pattern, but requires understanding monotonic stack behavior.

### [AI-EASY:]
- Step 1: For each day, scan forward day by day.
- Step 2: Stop at first warmer temperature and record distance.
- Step 3: If none found, record `0`.

[AI-ANALYZE:]
- Time: `O(n^2)` worst case.
- Space: `O(1)` extra.
- Tradeoff: Very intuitive and interview-friendly baseline, but slower for long arrays.

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
