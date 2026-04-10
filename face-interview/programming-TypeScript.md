## const vs var vs let vs readonly

## Node vs. React, and CI workflows
1\. Node.js vs. React & Compilation

Understanding the roles of these tools and when they need a build step.

| Feature         | Node.js                      | React                                     |
| --------------- | ---------------------------- | ----------------------------------------- |
| **Environment** | Server-side (Backend)        | Browser-side (Frontend)                   |
| **Compilation** | **No** (for standard JS)     | **Yes** (JSX must be transpiled)          |
| **TypeScript**  | **Yes** (must convert to JS) | **Yes** (usually handled by Vite/Webpack) |
| **Main Goal**   | Logic, Databases, APIs       | UI, Buttons, User Interaction             |

💡 **Pro-Tip:** You don't need to manually compile TypeScript for Playwright. It uses `swc` under the hood to transform your `.ts` files on the fly during execution.

2\. `Playwright` GitHub Actions & CI Setup

Best practices for running Playwright tests in a CI environment.

| Step                      | Purpose             | Why it's Critical                                                            |
| ------------------------- | ------------------- | ---------------------------------------------------------------------------- |
| **`setup-node`**          | Environment Locking | Ensures the CI uses the same Node version as your local machine.             |
| **`npm ci`**              | Clean Install       | Faster than `npm install` and strictly follows your `package-lock.json`.     |
| **`install --with-deps`** | Browser Setup       | Installs the actual browser binaries (Chromium/Firefox) and OS dependencies. |
| **`tsc --noEmit`**        | Type Checking       | Catches TypeScript errors that Playwright's runner might ignore.             |

💡 **Pro-Tip:** Enable **Caching** in your `setup-node` step (`cache: 'npm'`). This can cut minutes off your CI run time by reusing your `node_modules` across different workflow runs.
## type vs interface
In TypeScript, `type` and `interface` are more similar than they are different, but they serve distinct architectural purposes.

**Comparison Table**

| Feature                 | `interface`                                              | `type` (Alias)                                           |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| **Primary Use**         | Defining the **shape** of an object or class.            | Defining **data relationships** (unions, intersections). |
| **Declaration Merging** | **Yes.** Multiple declarations with the same name merge. | **No.** Duplicate identifiers throw an error.            |
| **Extensibility**       | Uses `extends` (more performant for the compiler).       | Uses intersections `&` to combine types.                 |
| **Mapped Types**        | Cannot be used to create mapped types.                   | Can use `in keyof` to transform properties.              |
| **Unions / Tuples**     | Cannot represent a Union (`A \| B`) or Tuple directly.   | Excellent for Unions, Tuples, and Primitives.            |
| **Error Messages**      | Usually cleaner; shows the interface name.               | Can be verbose as it "flattens" the type definition.     |

**Pro-Tips**

- **💡 The "Interface First" Rule:** Use `interface` for public APIs and object definitions. Because they support declaration merging, they are more flexible for consumers who might need to "patch" a library's types.
- **💡 Performance:** Interfaces are slightly faster for the TypeScript compiler to type-check because they are cached by name, whereas type intersections (`&`) must be computed recursively.
- **💡 Use `type` for Logic:** If you need to do anything "fancy"—like conditional types, template literal types, or combining multiple existing types into a union—`type` is your only option.
- **💡 React Components:** Use `interface` for `Props` and `State`. It creates a clearer contract and allows other developers to extend your component props easily.
- **💡 Consistent Style:** In modern TypeScript, the functional difference is shrinking. Pick one for standard objects and stick to it across your codebase to reduce "bikeshedding" during code reviews.