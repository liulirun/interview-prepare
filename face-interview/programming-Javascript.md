## Easy confusing methods

|Method|**Array**|**Set**|**Map**|**Object**|**String**|
|---|---|---|---|---|---|
|**`includes`**|✅|❌|❌|❌|✅|
|**`has`**|❌|✅|✅|❌|❌|
|**`get`**|❌|❌|✅|❌|❌|
|**`indexOf`***|✅|❌|❌|❌|✅|
Here is the summary of the key takeaways for your notes:

Key Takeaways: Lookups & Access

| Method            | Best Use Case        | Performance (Big O)                                                                                                                                                                                                                                                                                                                                                        | Logic                                          |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **`.has()`**      | `Set` and `Map`      | **![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)**(Constant) | Checks if a **Key** or **Member** exists.      |
| **`.includes()`** | `Array` and `String` | **![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)**(Linear)   | Searches for a specific **Value**.             |
| **`.get()`**      | `Map`                | **![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)**(Constant) | Retrieves the **Value** associated with a Key. |
| **`in`**          | `Object`             | **![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)**(Constant) | Checks if a **Property/Key** exists.           |

- **`.has()` vs `.includes()`**: Use **`.has()`** for lookups in `Set` and `Map` (highly optimized, **near-instant even with millions of items**). Use **`.includes()`** for searching a value in an `Array` (**requires scanning the whole list**).
- **`.get()`**: This is unique to **Map**. For Objects, you use dot notation (`obj.key`) or bracket notation (`obj['key']`).
- **Objects**: Surprisingly, native Objects don't use any of these methods! You check for keys using the **`in`** operator: `'key' in obj`.

## Easy confusing concept

|Feature|**Array**|**Object**|**Set**|**Map**|
|---|---|---|---|---|
|**`for...of`** (values)|✅|❌|✅|✅|
|**`for...in`** (keys)|✅|✅|❌|❌|
|**`.forEach()`**|✅|❌|✅|✅|
|**`in` operator** (keys)|✅|✅|❌|❌|
Quick Tips for this Table:

| Concept                  | The "Why"                                                                          | Key Takeaway                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Object Iteration**     | Objects aren't "iterable" by default.                                              | Use `Object.keys(obj)` or `Object.entries(obj)` to use Array methods.           |
| **`for...in` on Arrays** | It treats indexes as **strings** (`"0"`, `"1"`) and can find inherited properties. | **Avoid it.** Use `for...of` or `.forEach()` for clean value access.            |
| **Map/Set `.forEach()`** | Built-in and highly efficient.                                                     | In a **Map**, the order is `(value, key)`. In a **Set**, it's `(value, value)`. |

---

- **Object Iteration**: Objects are the odd ones out; they don't work with `for...of` or `.forEach()`. You have to use **`Object.keys(obj)`** first to turn them into an array.
- **`for...in` on Arrays**: It works, but it's usually a bad idea because it iterates over **indexes** (as strings) rather than values, and can pick up unexpected prototype properties.
- **Map/Set forEach**: These are surprisingly handy! For a **Map**, the callback signature is **`(value, key) => ...`** (Value comes first!).