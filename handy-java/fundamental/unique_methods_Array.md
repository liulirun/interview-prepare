# Unique Array Methods

## Table 1: data `-->` Array (e.g., `String[]` or `int[]`).

| From                   | Example                         | When to use this                                                  | Protip                                                                                                  |
| ---------------------- | ------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **ArrayList / List**   | `list.toArray(new String[0])`   | When an API requires a fixed array instead of a List.             | Using `new String[0]` is the "modern" way; the JVM optimizes this better than passing the actual size.  |
| **Stream (Objects)**   | `stream.toArray(String[]::new)` | To save the results of a Stream pipeline into an array.           | Use the constructor reference (`String[]::new`) to ensure the returned array is the correct type.       |
| **Stream (Primitive)** | `intStream.toArray()`           | Converting an `IntStPream` or `LongStream` to its primitive array. | No arguments needed; primitive streams (like `IntStream`) automatically return the matching array type. |
| **Individual Items**   | `new String[]{"A", "B"}`        | Direct initialization when you know the values at coding time.    | You can omit the `new String[]` part if you declare it on the same line: `String[] s = {"A", "B"};`.    |
| **Another Array**      | `Arrays.copyOf(oldArr, newLen)` | When you need to "resize" or clone an existing array.             | If `newLen` is larger than the original, the extra slots will be filled with `null` or `0`.             |
| **String (Split)**     | `str.split(",")`                | Parsing a comma-separated string into individual parts.           | Use a limit like `str.split(",", -1)` if you want to keep trailing empty strings in the array.          |
| **Collection (Set)**   | `set.toArray(new Integer[0])`   | Turning a unique Set into an indexed array for sorting.           | Remember that Sets have no order, so the array elements will appear in a random sequence.               |
| **Empty Source**       | `new int[10]`                   | Creating a blank container to fill later via a loop.              | All numeric slots are automatically initialized to `0`, booleans to `false`, and objects to `null`.     |

## Table 2: Array `-->` Data Types

| To                    | Example                               | When to use this                                                                | Protip                                                                                       |
| --------------------- | ------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Fixed-Size List**   | `Arrays.asList(arr)`                  | When you need List methods (`contains`, `indexOf`) but don't need to add items. | This "bridges" the array; changes to the array **will** reflect in the list and vice versa.  |
| **Mutable ArrayList** | `new ArrayList<>(Arrays.asList(arr))` | When you need a fully dynamic list that you can `.add()` or `.remove()` from.   | This creates a **copy** of the array data, so the original array remains untouched.          |
| **Stream**            | `Arrays.stream(arr)`                  | The starting point for any modern filtering, mapping, or searching logic.       | For primitive arrays, this returns a specialized stream (e.g., `IntStream`) automatically.   |
| **Set**               | `new HashSet<>(Arrays.asList(arr))`   | The fastest way to remove all duplicate values from an array.                   | If you need to keep the original order, use a `LinkedHashSet` instead.                       |
| **String**            | `Arrays.toString(arr)`                | For quick debugging, logging, or printing the contents to the console.          | For nested or multi-dimensional arrays, use `Arrays.deepToString(arr)` instead.              |
| **Joined String**     | `String.join("-", arr)`               | When you want to turn a `String[]` into one string with a specific separator.   | Only works with object arrays; for primitive arrays, use `Arrays.stream(arr).mapToObj(...)`. |
| **List (Java 9+)**    | `List.of(arr)`                        | To create a truly **immutable** list from your array elements.                  | Unlike `asList`, this is a detached copy; you cannot change the values even with `.set()`.   |
| **Another Array**     | `arr.clone()`                         | When you need a shallow copy of the entire array to modify safely.              | For 2D arrays, `.clone()` only copies the "rows," not the actual elements inside them.       |


## Table 2: Frequent & General Purpose Methods

These are the most common tools used for everyday array manipulation and inspection.

| Method         | Description                  | Return Type | Example                       |
| -------------- | ---------------------------- | ----------- | ----------------------------- |
| `toString`     | Simple array to String       | `String`    | `Arrays.toString(arr)`        |
| `sort`         | Sorts array elements         | `void`      | `Arrays.sort(arr)`            |
| `asList`       | Array to fixed-size List     | `List<T>`   | `Arrays.asList(arr)`          |
| `fill`         | Assigns value to all slots   | `void`      | `Arrays.fill(arr, 0)`         |
| `copyOf`       | Copies/resizes array         | `T[]`       | `Arrays.copyOf(arr, 10)`      |
| `copyOfRange`  | Copies a specific range      | `T[]`       | `Arrays.copyOfRange(a, 1, 4)` |
| `binarySearch` | Finds index (must be sorted) | `int`       | `Arrays.binarySearch(a, val)` |
| `equals`       | Compares two arrays          | `boolean`   | `Arrays.equals(a, b)`         |
| `stream`       | Creates a Stream from array  | `Stream`    | `Arrays.stream(arr)`          |
| `deepToString` | String for nested arrays     | `String`    | `Arrays.deepToString(matrix)` |
| `deepEquals`   | Compares nested arrays       | `boolean`   | `Arrays.deepEquals(m1, m2)`   |
| `mismatch`     | Finds first differing index  | `int`       | `Arrays.mismatch(a, b)`       |

## Table 3: Performance, Internal & Specialized Methods

These include parallel operations, primitive-specific logic, and internal helper functions.

| Method            | Description                | Category    | Usage Context           |
| ----------------- | -------------------------- | ----------- | ----------------------- |
| `parallelSort`    | Fast sort for large data   | Performance | Multi-core processing   |
| `parallelPrefix`  | Cumulative operations      | Performance | Running totals/math     |
| `setAll`          | Fills using a generator    | Functional  | `(i) -> i * 2`          |
| `compare`         | Lexicographical compare    | Logic       | returns `-1, 0, 1`      |
| `compareUnsigned` | Compare as unsigned values | Math        | Byte/Int unsigned logic |
| `spliterator`     | Parallel iteration tool    | Streams     | Internal stream logic   |
| `copyOfRange...`  | Primitive specific copies  | Primitive   | `copyOfRangeInt`, etc.  |
| `binarySearch0`   | Internal search logic      | Internal    | Recursive helper        |
| `rangeCheck`      | Validates index bounds     | Internal    | Exception prevention    |
| `mergeSort`       | Legacy sorting algorithm   | Internal    | Object sorting logic    |
| `hashCode`        | Computes array hash        | Utility     | Collection storage      |
| `lambda$...`      | Stream helper functions    | Internal    | ParallelSetAll logic    |

**Note:** The `copyOfRange[Type]` methods (like `copyOfRangeInt`) are actually the underlying primitive implementations called when you use the generic `copyOfRange` on a primitive array.

Do you want to see a demonstration of **parallelSort** to see how much faster it is for massive arrays?