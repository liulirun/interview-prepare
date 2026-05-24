
The Interview Summary Cheat Sheet

| Modifier                    | Same Class | Same Package | Subclass (Diff Package) | World (Diff Package) |
| --------------------------- | ---------- | ------------ | ----------------------- | -------------------- |
| **`private`**               |            | ❌            | ❌                       | ❌                    |
| **`default`** (No modifier) |            |              | ❌                       | ❌                    |
| **`protected`**             |            |              |                         | ❌                    |
| **`public`**                |            |              |                         |                      |

Would you like to drill down into **Question 10** with a multi-file setup to see exactly how `protected` behaves when cross-package inheritance is involved?