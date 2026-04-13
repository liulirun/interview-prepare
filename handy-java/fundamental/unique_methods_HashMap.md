# Unique HashMap Methods


## Table 1: data `-->` HashMap

| From                 | Example                                                                           | When to use this                                             | Protip                                                                                      |
| -------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **Loose Pairs**      | `Map.of("K1", "V1", "K2", "V2")`                                                  | Quick, small lookups (up to 10 pairs).                       | `Map.of` creates an **immutable** map; wrap it in `new HashMap<>(...)` to edit it.          |
| **Two Lists/Arrays** | `IntStream.range(0, keys.size()).collect(Collectors.toMap(keys::get, vals::get))` | When you have one list of keys and another of values.        | Ensure both lists are the same length to avoid an `IndexOutOfBoundsException`.              |
| **Another Map**      | `new HashMap<>(oldMap)`                                                           | Creating a "shallow copy" of an existing map.                | Changes to the *structure* won't affect the old map, but changes to *objects* inside will.  |
| **A List/Stream**    | `list.stream().collect(Collectors.toMap(Obj::getId, Obj::getVal))`                | Converting a list of objects into a searchable lookup table. | If keys might repeat, use the 3-argument version: `(old, new) -> new` to handle collisions. |
| **JSON String**      | `new ObjectMapper().readValue(json, HashMap.class)`                               | When receiving data from a Web API or config file.           | Requires the **Jackson** or **Gson** library; standard Java doesn't do this natively.       |
| **Properties File**  | `new HashMap<Object, Object>(propertiesObj)`                                      | Loading configuration settings into a searchable map.        | Use `map.putAll(properties)` for an existing map to merge settings.                         |
| **CSV / File**       | `Files.lines(p).map(s->s.split(",")).collect(Collectors.toMap(a->a[0], a->a[1]))` | Parsing a simple 2-column text file into memory.             | Always check if the line has the expected number of commas before splitting.                |

## Table 2: HashMap `-->` Data Types

| To                   | Example                                      | When to use this                                                 | Protip                                                                            |
| -------------------- | -------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **List of Keys**     | `new ArrayList<>(map.keySet())`              | When you only need the unique identifiers from the map.          | This is great for getting a "directory" of all items available.                   |
| **List of Values**   | `new ArrayList<>(map.values())`              | When you need the actual data objects, ignoring the keys.        | The order of this list will match the map's internal iteration order.             |
| **Stream (Entries)** | `map.entrySet().stream()`                    | To filter, sort, or transform the map using functional logic.    | Mapping to `entry.getKey()` or `entry.getValue()` lets you pivot the data easily. |
| **JSON String**      | `new ObjectMapper().writeValueAsString(map)` | Sending data back to a Web UI or saving it to a database.        | Use Jackson or Gson to handle complex nested objects automatically.               |
| **String (Pretty)**  | `map.toString()`                             | Quick debugging or logging to see what's inside.                 | For large maps, this can be hard to read; consider a loop for better formatting.  |
| **Properties**       | `props.putAll(map)`                          | Exporting a map of settings back into a `.properties` file.      | Keys and values should ideally be `String` types for compatibility.               |
| **Single Value**     | `map.getOrDefault(key, "Default")`           | Safely retrieving one item without checking for `null`.          | Use this to avoid `NullPointerExceptions` when a key might be missing.            |
| **Sorted Map**       | `new TreeMap<>(map)`                         | When you need the keys to be in alphabetical or numerical order. | Note that `TreeMap` is slower for inserts but keeps everything sorted.            |

## Table 2: Frequent & Public API Methods

These are the standard methods you call when interacting with a `HashMap`.

| Method         | Description                  | Return Type     | Example                   |
| -------------- | ---------------------------- | --------------- | ------------------------- |
| `put`          | Adds/Updates a pair          | `V`             | `map.put("k", v)`         |
| `get`          | Gets value by key            | `V`             | `map.get("k")`            |
| `remove`       | Deletes by key               | `V`             | `map.remove("k")`         |
| `containsKey`  | Checks if key exists         | `boolean`       | `map.containsKey("k")`    |
| `size`         | Count of entries             | `int`           | `map.size()`              |
| `clear`        | Wipes all data               | `void`          | `map.clear()`             |
| `isEmpty`      | Checks if empty              | `boolean`       | `map.isEmpty()`           |
| `keySet`       | Returns set of keys          | `Set<K>`        | `map.keySet()`            |
| `values`       | Returns collection of values | `Collection<V>` | `map.values()`            |
| `entrySet`     | Returns set of entries       | `Set<Entry>`    | `map.entrySet()`          |
| `getOrDefault` | Get value or default         | `V`             | `map.getOrDefault(k, 0)`  |
| `forEach`      | Functional iteration         | `void`          | `map.forEach((k,v)->...)` |

## Table 3: Advanced, Internal & Utility Methods

These include functional computing methods and internal logic like tree management and serialization.

| Method         | Description               | Category   | Usage Context                |
| -------------- | ------------------------- | ---------- | ---------------------------- |
| `compute`      | Computes a new value      | Functional | `map.compute(k, remapping)`  |
| `merge`        | Merges old/new values     | Functional | `map.merge(k, v, bifunc)`    |
| `putIfAbsent`  | Adds if key is missing    | Logic      | `map.putIfAbsent(k, v)`      |
| `replace`      | Replaces if present       | Logic      | `map.replace(k, oldV, newV)` |
| `resize`       | Grows internal table      | Internal   | Triggered by `loadFactor`    |
| `hash`         | Calculates hash code      | Internal   | `static final int hash()`    |
| `treeifyBin`   | Converts bins to Trees    | Internal   | High collision handling      |
| `newNode`      | Creates a basic Node      | Internal   | Entry creation               |
| `readObject`   | Deserializes map          | Utility    | `java.io` operations         |
| `clone`        | Shallow copy              | Utility    | `(HashMap) map.clone()`      |
| `tableSizeFor` | Power-of-two sizing       | Internal   | Initial capacity logic       |
| `afterNode...` | Callbacks (LinkedHashMap) | Internal   | Access/Removal hooks         |

**Note:** Methods like `putVal`, `getNode`, and `removeNode` are the internal workhorses that the public `put`, `get`, and `remove` methods call to do the actual data heavy lifting.

Would you like to see a code snippet showing how **computeIfAbsent** can replace a 5-line `if` statement?