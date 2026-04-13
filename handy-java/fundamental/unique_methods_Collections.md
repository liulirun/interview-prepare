# Unique Collections Methods

## Table 1: data `-->` Collections

| From                   | Example                              | When to use this                                                                  | Protip                                                                                     |
| ---------------------- | ------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Array**              | `Arrays.asList(arr)`                 | Quickly turning an array into a List for searching/sorting.                       | This creates a **fixed-size** list; you can't `.add()` to it, but you can `.set()` values. |
| **Loose Items**        | `List.of(1, 2, 3)`                   | Modern initialization of a small, constant set of data.                           | These are **immutable**; wrap in `new ArrayList<>(...)` if you need to modify them later.  |
| **Existing Map**       | `Collections.newSetFromMap(map)`     | When you need a Set that behaves like a specific Map (e.g., `ConcurrentHashMap`). | This is a great way to create a high-performance thread-safe Set.                          |
| **Thread-Unsafe List** | `Collections.synchronizedList(list)` | When multiple threads need to access the same list.                               | Use this for legacy code; for modern high-concurrency, use `CopyOnWriteArrayList` instead. |
| **Mutable List**       | `Collections.unmodifiableList(list)` | To "lock" a list before passing it to another method or API.                      | If you change the **original** list, the "unmodifiable" view will also change!             |
| **Enumeration**        | `Collections.list(enumeration)`      | Converting old legacy types (like `Vector` or `Header` enums) to modern Lists.    | This is an essential bridge for working with very old Java libraries or network APIs.      |
| **A Single Object**    | `Collections.singletonList(obj)`     | When an API requires a `List` but you only have one single item.                  | This is much more memory-efficient than creating a full `ArrayList` for just one thing.    |
| **Nothing**            | `Collections.emptyList()`            | To return a "safe" empty result instead of returning `null`.                      | This returns a shared, cached object, saving memory compared to `new ArrayList<>()`.       |

## Table 2: Collections `-->` Data Types

| To                | Example                                        | When to use this                                                                | Protip                                                                                                       |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Array**         | `list.toArray(new String[0])`                  | When you need to pass data to legacy APIs or fixed-length structures.           | Passing `new String[0]` is modern practice; the JVM handles the sizing more efficiently than pre-allocating. |
| **Single Value**  | `Collections.max(list)`                        | Finding the "best," highest, or latest item in a collection.                    | For custom objects, provide a `Comparator` to define what "maximum" actually means.                          |
| **Stream**        | `list.stream()`                                | The entry point for filtering, mapping, or any functional processing.           | Use `.parallelStream()` for large collections to leverage multi-core processors.                             |
| **Map**           | `list.stream().collect(Collectors.toMap(...))` | When your list items have IDs and you want a searchable lookup table.           | Ensure IDs are unique, or use a "merge function" to handle key collisions.                                   |
| **Enumeration**   | `Collections.enumeration(list)`                | When you must interface with ancient legacy code that expects an `Enumeration`. | This is effectively the "reverse" of `Collections.list()` for backward compatibility.                        |
| **String**        | `list.toString()`                              | For logging or debugging the contents of the collection.                        | Standard format is `[item1, item2]`. For custom formatting, use `String.join()` or `Collectors.joining()`.   |
| **Reversed View** | `Collections.reverse(list)`                    | When you need to flip the order of items in place.                              | This **mutates** the original list. If you need a copy, duplicate the list before reversing.                 |
| **Checked View**  | `Collections.checkedList(list, String.class)`  | When working with raw types to ensure only specific types are added.            | This throws a `ClassCastException` at runtime the moment an invalid type is inserted.                        |


## Table 2: Frequent & General Purpose Methods

These are the standard tools used for sorting, modifying, and creating safe versions of your collections.

| Method            | Description                  | Return Type | Example                           |
| ----------------- | ---------------------------- | ----------- | --------------------------------- |
| `sort`            | Sorts a List                 | `void`      | `Collections.sort(list)`          |
| `reverse`         | Reverses list order          | `void`      | `Collections.reverse(list)`       |
| `shuffle`         | Randomizes elements          | `void`      | `Collections.shuffle(list)`       |
| `copy`            | Copies src to dest list      | `void`      | `Collections.copy(dest, src)`     |
| `fill`            | Overwrites all elements      | `void`      | `Collections.fill(list, val)`     |
| `max` / `min`     | Finds extreme values         | `T`         | `Collections.max(list)`           |
| `frequency`       | Counts occurrences           | `int`       | `Collections.frequency(l, x)`     |
| `unmodifiable...` | Makes list/map read-only     | `List/Map`  | `Collections.unmodifiableList(l)` |
| `empty...`        | Returns cached empty list    | `List/Map`  | `Collections.emptyList()`         |
| `singleton...`    | Creates a 1-item list        | `List/Map`  | `Collections.singletonList(x)`    |
| `binarySearch`    | Finds index (must be sorted) | `int`       | `Collections.binarySearch(l, x)`  |
| `addAll`          | Adds multiple elements       | `boolean`   | `Collections.addAll(list, 1, 2)`  |

## Table 3: Specialized, Thread-Safe & Internal Methods

These include synchronization wrappers, type-checking, and internal algorithm variations.

| Method                | Description                   | Category    | Usage Context                              |
| --------------------- | ----------------------------- | ----------- | ------------------------------------------ |
| `synchronized...`     | Makes collection thread-safe  | Concurrency | `Collections.synchronizedList(l)`          |
| `checked...`          | Forces type-safety at runtime | Safety      | `Collections.checkedList(l, String.class)` |
| `nCopies`             | Immutable list of N items     | Utility     | `Collections.nCopies(10, "A")`             |
| `disjoint`            | True if no common items       | Logic       | `Collections.disjoint(c1, c2)`             |
| `rotate`              | Shifts elements by distance   | Logic       | `Collections.rotate(list, 2)`              |
| `replaceAll`          | Replaces all old with new     | Logic       | `Collections.replaceAll(l, old, new)`      |
| `asLifoQueue`         | Treats Deque as a Stack       | Wrapper     | `Collections.asLifoQueue(deque)`           |
| `reverseOrder`        | Comparator for descending     | Utility     | `list.sort(Collections.reverseOrder())`    |
| `indexOfSubList`      | Finds start of a sequence     | Search      | `Collections.indexOfSubList(l, sub)`       |
| `indexed/iterator...` | Internal search logic         | Internal    | Helper for `binarySearch`                  |
| `rotate1 / rotate2`   | Internal rotation logic       | Internal    | Algorithmic implementations                |
| `newSetFromMap`       | Set backed by a Map           | Wrapper     | Creating a Set from a ConcurrentMap        |

**Note:** The `unmodifiable` and `synchronized` methods are actually wrappers. They don't copy the data; they just control access to the original collection.

Would you like to see why **unmodifiableList** is safer than just using a final variable?