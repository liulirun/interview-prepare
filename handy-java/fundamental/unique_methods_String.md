# Unique String Methods

## Table 1: data `-->` String

| From                            | Example                                | When to use this                                  | Protip                                                                       |
| ------------------------------- | -------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Any Primitive** (int, double) | `String.valueOf(10)`                   | General purpose conversion.                       | Prefer this over `"" + 10` because it’s clearer and slightly faster.         |
| **Object** (User, Car)          | `obj.toString()`                       | When you want the text version of a custom class. | Always override `toString()` in your classes or you'll get a memory address. |
| **Array** (String\[], int\[])   | `Arrays.toString(arr)`                 | For debugging or logging small arrays.            | Use `deepToString()` for nested arrays (multi-dimensional).                  |
| **ArrayList**                   | `list.toString()`                      | To see contents in `[a, b, c]` format.            | This is already called automatically if you put a list in a `println`.       |
| **Collection of Strings**       | `String.join(", ", list)`              | When you need a specific separator (e.g., CSV).   | Works directly on `List<String>`, no need to loop manually.                  |
| **Stream**                      | `stream.collect(Collectors.joining())` | Complex filtering/mapping before joining.         | Use the 3-argument version to add a prefix and suffix like `(val, val)`.     |
| **StringBuilder**               | `sb.toString()`                        | After building a string inside a loop.            | Never use `+` in a loop; always use `StringBuilder` for performance.         |
| **char\[]**                     | `new String(charArray)`                | Converting raw character data back to text.       | `String.valueOf(charArray)` does the exact same thing but is more readable.  |

## Table 2: String `-->` Data Types

| To                   | Example                                | When to use this                                                       | Protip                                                                                                                    |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Integer / Double** | `Integer.parseInt(str)`                | Converting user input or web parameters into numbers.                  | Throws `NumberFormatException` if the string isn't a valid number; always use a try-catch.                                |
| **Boolean**          | `Boolean.parseBoolean(str)`            | Converting flags like "true" or "false" from config files.             | This is very "lenient"—it returns `true` only if the string is "true" (case-insensitive) and `false` for everything else. |
| **char\[] (Array)**  | `str.toCharArray()`                    | When you need to manipulate individual characters (e.g., in a cipher). | Modifying the resulting array does **not** change the original string because strings are immutable.                      |
| **byte\[] (Bytes)**  | `str.getBytes(StandardCharsets.UTF_8)` | Before sending data over a network or saving to a file.                | **Always** specify a Charset (like UTF-8) to avoid weird encoding bugs on different operating systems.                    |
| **List / Array**     | `str.split(", ")`                      | Turning a CSV or space-separated string into a list of items.          | Use a Limit argument (e.g., `split(",", 2)`) if you only want to break the string at the first occurrence.                |
| **Stream**           | `str.chars()`                          | Using functional logic to count or filter specific characters.         | This returns an `IntStream` of character codes; use `.mapToObj(c -> (char)c)` to see them as characters.                  |
| **Enum**             | `Color.valueOf(str.toUpperCase())`     | Matching a string to a specific predefined constant.                   | Ensure the casing matches the Enum definition exactly, or use `.toUpperCase()` to be safe.                                |
| **Date / Time**      | `LocalDate.parse(str)`                 | Converting standard ISO dates (YYYY-MM-DD) into date objects.          | For custom formats (e.g., "DD/MM/YYYY"), you must provide a `DateTimeFormatter`.                                          |


## Table 2: Frequent & Public API Methods

These are the essential tools for text manipulation, searching, and validation.

| Method                | Description                   | Return Type | Example                 |
| --------------------- | ----------------------------- | ----------- | ----------------------- |
| `substring`           | Extracts part of the string   | `String`    | `s.substring(0, 5)`     |
| `contains`            | Checks for a sequence         | `boolean`   | `s.contains("abc")`     |
| `replace`             | Replaces characters/words     | `String`    | `s.replace("a", "b")`   |
| `split`               | Breaks string into array      | `String[]`  | `s.split(",")`          |
| `trim` / `strip`      | Removes whitespace            | `String`    | `s.trim()`              |
| `toLowerCase`         | Converts to lowercase         | `String`    | `s.toLowerCase()`       |
| `indexOf`             | Finds first position of char  | `int`       | `s.indexOf("x")`        |
| `isEmpty` / `isBlank` | Checks if string has text     | `boolean`   | `s.isBlank()`           |
| `startsWith`          | Checks prefix                 | `boolean`   | `s.startsWith("Hi")`    |
| `length`              | Returns character count       | `int`       | `s.length()`            |
| `charAt`              | Gets char at specific index   | `char`      | `s.charAt(0)`           |
| `join`                | Merges strings with delimiter | `String`    | `String.join("-", ...)` |

## Table 3: Specialized, Internal & Encoding Methods

These handle memory optimization, character encoding (UTF-8/ASCII), and JVM internal logic.

| Method             | Description                      | Category     | Usage Context                 |
| ------------------ | -------------------------------- | ------------ | ----------------------------- |
| `intern`           | Adds string to constant pool     | Optimization | `s.intern()`                  |
| `getBytes`         | Converts to byte array           | Encoding     | `s.getBytes("UTF-8")`         |
| `valueOf`          | Converts other types to String   | Utility      | `String.valueOf(123)`         |
| `matches`          | Validates against Regex          | Logic        | `s.matches("\\d+")`           |
| `decode / encode`  | Internal byte transformations    | Internal     | Handling different charsets   |
| `coder`            | Identifies encoding (Latin1/U16) | Internal     | JVM memory management         |
| `checkBounds`      | Validates index ranges           | Internal     | Bounds checking logic         |
| `repeat`           | Multiplies the string            | Utility      | `s.repeat(3)`                 |
| `indent / outdent` | Adjusts text margins             | Utility      | Formatting block text         |
| `codePointAt`      | Gets Unicode code point          | Unicode      | Handling emojis/special chars |
| `isLatin1`         | Checks internal storage type     | Internal     | Performance/Memory check      |
| `formatted`        | Template filling (Java 15+)      | Utility      | `"%s".formatted(v)`           |

**Note:** Methods like `decodeUTF8` and `isMalformed` are internal helpers that ensure your text doesn't become "garbage" characters when converting between different languages or file formats.

