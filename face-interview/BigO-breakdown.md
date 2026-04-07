Array (`[]`)

| Method                     | Description            | Big O `O()`  |
| -------------------------- | ---------------------- | ------------ |
| `push()` / `pop()`         | Add/remove from end    | `O(1)`       |
| `shift()` / `unshift()`    | Add/remove from start  | `O(n)`       |
| `splice()`                 | Insert/remove at index | `O(n)`       |
| `slice()`                  | Copy part of array     | `O(n)`       |
| `indexOf()` / `includes()` | Search for value       | `O(n)`       |
| `forEach()` / `map()`      | Iterate all items      | `O(n)`       |
| `sort()`                   | Sort elements          | `O(n log n)` |

**Pro-tip:** Use `push`/`pop` instead of `shift`/`unshift` whenever possible. Shifting requires re-indexing the entire array, making it much slower as the list grows.

Object (`{}`) / Map

| Method                             | Description   | Big O `O()` |
| ---------------------------------- | ------------- | ----------- |
| `obj[key]` / `map.get()`           | Access/Lookup | `O(1)`      |
| `obj[key] = val` / `map.set()`     | Insertion     | `O(1)`      |
| `delete obj[key]` / `map.delete()` | Deletion      | `O(1)`      |
| `Object.keys(obj)`                 | Get all keys  | `O(n)`      |

**Pro-tip:** Objects and Maps are your "speed hacks." If you find yourself nesting loops to find data, convert your data into an Object/Map first to turn `O(n)` searches into `O(1)` lookups.

`Sort`:
the JavaScript **`Map`** object does **not** have a built-in `.sort()` method.

By default, a `Map` remembers the **original insertion order** of the keys. If you need it sorted, you must convert it to an array, sort that array, and (optionally) build a new Map.

How to Sort a Map

| Step           | Method                      | Big O `O()`  |
| -------------- | --------------------------- | ------------ |
| **1. Convert** | `Array.from(map.entries())` | `O(n)`       |
| **2. Sort**    | `array.sort((a, b) => ...)` | `O(n log n)` |
| **3. Rebuild** | `new Map(sortedArray)`      | `O(n)`       |

Pro-Tip

If you find yourself sorting a Map frequently, ask if you actually need a Map.

- **Use Map** if you need unique keys and `O(1)` fast lookups.
- **Use Array of Objects** if the primary requirement is keeping data in a specific, sorted order.

When to Use

- **Sort once:** If you receive unsorted data and need to display it once in alphabetical or numerical order.
- **Don't sort:** If you are performing high-frequency insertions and lookups. Re-sorting a Map on every insertion turns an `O(1)` operation into `O(n log n)`, killing performance.

Set (`new Set()`)

| Method     | Description     | Big O `O()` |
| ---------- | --------------- | ----------- |
| `add()`    | Insert value    | `O(1)`      |
| `has()`    | Check if exists | `O(1)`      |
| `delete()` | Remove value    | `O(1)`      |
| `size`     | Get count       | `O(1)`      |

**Pro-tip:** Use a Set instead of an Array if you need to ensure uniqueness or perform frequent "contains" checks (`.has()`). It is significantly faster than `array.includes()`.

String (`""`)

| Method                     | Description        | Big O `O()`  |
| -------------------------- | ------------------ | ------------ |
| `charAt()` / `[index]`     | Access character   | `O(1)`       |
| `substring()` / `slice()`  | Get part of string | `O(n)`       |
| `indexOf()` / `includes()` | Search string      | `O(n * m)`\* |
| `split()`                  | Convert to array   | `O(n)`       |

**Pro-tip:** In JavaScript, strings are immutable. Every time you "change" or concatenate a string with `+`, a brand new string is created in memory (`O(n)`). For massive string building, consider pushing parts into an array and using `.join('')` at the end.

*\*Note: `n` is string length, `m` is search term length.*
Big O Notation `O()` Breakdown

| Notation     | Name         | Method / Example                                          | When to Use                                              |
| ------------ | ------------ | --------------------------------------------------------- | -------------------------------------------------------- |
| `O(1)`       | Constant     | Accessing array index `arr[i]`, object property `obj.key` | Use for instant lookups or fixed-size operations.        |
| `O(log n)`   | Logarithmic  | Binary Search (splitting data in half each step)          | Best for searching in large, sorted datasets.            |
| `O(n)`       | Linear       | A single `for` loop, `Array.find()`, `Array.includes()`   | Standard for processing every item in a list once.       |
| `O(n log n)` | Linearithmic | `Array.sort()`, MergeSort, QuickSort                      | The "gold standard" for efficient sorting algorithms.    |
| `O(n²)`      | Quadratic    | Nested loops, Bubble Sort                                 | Avoid for large datasets; okay for small, simple checks. |
| `O(2ⁿ)`      | Exponential  | Simple recursive Fibonacci, power set generation          | Avoid where possible; performance drops off instantly.   |

Sorting Algorithm Efficiency (Average Case)

| Algorithm          | Best         | Average      | Worst        | Space      |
| ------------------ | ------------ | ------------ | ------------ | ---------- |
| **Quick Sort**     | `O(n log n)` | `O(n log n)` | `O(n²)`      | `O(log n)` |
| **Merge Sort**     | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)`     |
| **Heap Sort**      | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)`     |
| **Bubble Sort**    | `O(n)`       | `O(n²)`      | `O(n²)`      | `O(1)`     |
| **Insertion Sort** | `O(n)`       | `O(n²)`      | `O(n²)`      | `O(1)`     |

Pro-Tips

- **JavaScript `sort()`**: Most modern engines (like V8) use **Timsort**, which is a hybrid of Merge and Insertion sort. It averages `O(n log n)`.
- **Stability**: If you need to keep items with the same value in their original relative order, use **Merge Sort**.
- **Space Matters**: **Merge Sort** is fast but memory-heavy (`O(n)`). If you are low on RAM, **Heap Sort** or **Quick Sort** are better choices.

When to Use What?

- **Already Sorted Data**: Use **Insertion Sort**. It is nearly `O(n)` in this specific case.
- **General Purpose**: Use the built-in `.sort()`. It's highly optimized for the average developer's needs.
- **Strict Memory Limits**: Use **Heap Sort** to keep space at `O(1)`.

Pro-Tips

- **Ignore Constants:** `O(2n)` or `O(n + 100)` is just `O(n)`. We only care about the fastest-growing term as  hits infinity.
- **The "Worst-Case" Rule:** Big O usually describes the worst-case scenario. If you're searching a list, assume the item is at the very end.
- **Space-Time Tradeoff:** You can often make code faster (`O(n)` time) by using more memory (an extra `O(n)` Map or Set). This is the "cheat code" for most coding interviews.

When to Use What?

- **Small Data:** Don't over-engineer. An `O(n²)` loop is easier to read and perfectly fine if is small (e.g., < 100).
- **Frequent Lookups:** Use a **Hash Table** (JavaScript `Map` or `Object`). It turns slow `O(n)` searches into instant `O(1)` access.
- **Massive Lists:** If you need to search millions of items, they **must** be sorted so you can use `O(log n)` Binary Search.