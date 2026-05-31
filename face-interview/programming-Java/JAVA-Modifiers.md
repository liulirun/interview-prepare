# Non-Access Modifiers (Define Behavior)

## static
**`static`** indicates that a variable, method, or block belongs to the **class itself**, rather than to individual instances (objects) of the class.

Core Concept

- **Shared Memory:** Only one copy of a static member exists in memory, shared by all instances.
- **Direct Access:** Accessible directly via the class name (e.g., `ClassName.staticMethodName()`) without creating an object.

Usage Guidelines

| Scenario                   | Rule | Why?                                                                                            |
| -------------------------- | ---- | ----------------------------------------------------------------------------------------------- |
| **Utility/Helper Methods** | ✔️   | They process inputs independently without needing object state (e.g., `Math.max()`).            |
| **Global Constants**       | ✔️   | Combined with `final`, it saves memory by sharing one unchangeable value (e.g., `PI`).          |
| **Shared Counters**        | ✔️   | Tracks data across all instances, like counting the total number of objects created.            |
| **Unique Object Data**     | ❌    | Variables unique to an instance (like `username` or `balance`) will overwrite each other.       |
| **Polymorphic Methods**    | ❌    | Static methods belong to the class, meaning they cannot be overridden for runtime polymorphism. |
| **Temporary Large Data**   | ❌    | Static variables remain in memory for the app's entire lifespan, risking memory leaks.          |


## final

**`final`** is a non-access modifier used to restrict the user from changing the entity it is applied to (classes, methods, or variables).

Core Concept

- **Immutability:** Prevents modification of values, implementation, or inheritance structures once defined.
- **Compile-Time Safety:** Enforces consistency across the application by throwing compilation errors if changes are attempted.

Usage Guidelines

| Scenario                | Rule | Why?                                                                                                               |
| ----------------------- | ---- | ------------------------------------------------------------------------------------------------------------------ |
| **Constants**           | ✔️   | Prevents accidental modification of fixed configurations or mathematical values (e.g., `final int MAX_RETRY = 3`). |
| **Method Security**     | ✔️   | Stops subclasses from overriding and changing critical logic or security checks.                                   |
| **Immutable Classes**   | ✔️   | Declaring a class `final` prevents inheritance entirely, ensuring the class design remains intact.                 |
| **Dynamic Fields**      | ❌    | Variables that must update their state over time (like counters or balances) cannot be `final`.                    |
| **Abstract Blueprints** | ❌    | Abstract classes and methods *must* be extended or overridden; `final` explicitly forbids this.                    |
| **Interface Methods**   | ❌    | Interface methods are meant to be implemented by classes, so they cannot be declared `final`.                      |

## abstract

**`abstract`** is used to achieve abstraction in Java, allowing you to declare classes and methods that define *what* a program does without defining *how* it does it.

Core Concept

- **Partial Implementation:** An abstract class cannot be instantiated directly and may contain both implemented and unimplemented methods.
- **Contract Enforcement:** Forces subclasses to provide specific implementations for any abstract methods.

Usage Guidelines

| Scenario            | Rule | Why?                                                                                                                |
| ------------------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| **Template Design** | ✔️   | Defines a common base blueprint with shared code while forcing subclasses to fill in specific details.              |
| **Polymorphism**    | ✔️   | Allows you to write generic code operating on the abstract type while executing subclass-specific logic at runtime. |
| **Object Creation** | ❌    | You cannot use `new` on an abstract class; it must be extended by a concrete class first.                           |
| **Static Methods**  | ❌    | Static methods belong to the class and cannot be overridden, making `abstract static` a compilation error.          |
| **Private Methods** | ❌    | Private methods are hidden from subclasses, meaning a subclass could never access or implement them.                |

## synchronized

**`synchronized`** is a modifier used to control thread access to a block of code or a method, ensuring thread safety in multithreaded environments.

Core Concept

- **Mutual Exclusion:** Only one thread can execute a synchronized block/method on a specific monitor (lock) at a time.
- **Thread Safety:** Prevents data corruption and race conditions when multiple threads modify shared resources concurrently.

Usage Guidelines

| Scenario                   | Rule | Why?                                                                                                                    |
| -------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| **Shared Mutable State**   | ✔️   | Protects critical sections where multiple threads write to the same variable or data structure.                         |
| **Thread-Safe Singletons** | ✔️   | Ensures only one instance of a class is created when multiple threads access the creation method at once.               |
| **Read-Only Data**         | ❌    | Unnecessarily slows down performance; if variables are only being read (not written), synchronization is not needed.    |
| **Local Variables**        | ❌    | Local variables live on the thread stack and are naturally thread-safe; synchronizing them causes useless overhead.     |
| **High-Scale Concurrency** | ❌    | Coarse synchronization reduces throughput; use `java.util.concurrent` locks or atomic variables for better performance. |

# Access Modifiers (Define Visibility)

Access Levels

| Modifier        | Same Class | Same Package | Subclass (Diff Package) | World (Anywhere) |
| --------------- | ---------- | ------------ | ----------------------- | ---------------- |
| **`public`**    | ✔️         | ✔️           | ✔️                      | ✔️               |
| **`protected`** | ✔️         | ✔️           | ✔️                      | ❌                |
| **`default`**   | ✔️         | ✔️           | ❌                       | ❌                |
| **`private`**   | ✔️         | ❌            | ❌                       | ❌                |

## public

**`public`** is an access modifier that provides the widest possible visibility, making the class, method, or field accessible from anywhere in the application.

Core Concept

- **Universal Access:** Visible to all classes in all packages across the entire project.
- **API Exposure:** Used to define the official entry points or interface of a library or component.

Usage Guidelines

| Scenario                | Rule | Why?                                                                                                            |
| ----------------------- | ---- | --------------------------------------------------------------------------------------------------------------- |
| **Main Class Entry**    | ✔️   | The `main` method must be `public` so the JVM can locate and execute it from outside the package.               |
| **Interface Methods**   | ✔️   | Defines public contracts that implementing classes must fulfill to allow external interaction.                  |
| **Utility Methods**     | ✔️   | Helper functions (like `Collections.sort()`) need global visibility to be useful across the app.                |
| **Encapsulated Fields** | ❌    | Exposing raw data fields directly breaks encapsulation; use private fields with public getters/setters instead. |
| **Internal Logic**      | ❌    | Complex internal calculations or helper steps should be hidden to keep the public API clean and maintainable.   |

## protected

**`protected`** provides a controlled level of visibility, restricting access to the containing package and to subclasses in other packages through inheritance.

Core Concept

- **Inheritance Access:** Allows child classes to inherit and use features directly, even if the child class resides in a different package.
- **Package Grouping:** Acts like package-private (default) access for any unrelated classes sharing the same package.

Usage Guidelines

| Scenario                 | Rule | Why?                                                                                                                 |
| ------------------------ | ---- | -------------------------------------------------------------------------------------------------------------------- |
| **Framework Hooks**      | ✔️   | Allows developers extending your framework class to override or use specific internal lifecycle hooks.               |
| **Custom Components**    | ✔️   | Useful in UI or data hierarchies where child classes require direct access to core parent variables.                 |
| **Package Cohesion**     | ✔️   | Permits tightly coupled classes in the same package to communicate without exposing members globally.                |
| **Strict Encapsulation** | ❌    | If a field should never be seen or altered by any other class (even children), it must remain private.               |
| **Composition Designs**  | ❌    | If classes are combined using object composition rather than inheritance, protected access will block collaboration. |

## private

**`private`** provides the highest level of restriction, confining visibility strictly to the defining class itself.

Core Concept

- **Data Hiding:** Hides the internal state and implementation details from the rest of the application.
- **State Control:** Ensures the class has absolute control over how its variables are accessed or modified.

Usage Guidelines

| Scenario                   | Rule | Why?                                                                                                    |
| -------------------------- | ---- | ------------------------------------------------------------------------------------------------------- |
| **Class Member Fields**    | ✔️   | Standard practice for instance variables; enforces the core object-oriented principle of encapsulation. |
| **Internal Helpers**       | ✔️   | Methods that perform sub-steps for a larger public feature should be private to prevent misuse.         |
| **Utility Constructors**   | ✔️   | Declaring constructors private prevents instantiation of pure utility classes (e.g., `java.lang.Math`). |
| **Subclass Customization** | ❌    | Child classes cannot see or override private members, breaking features intended for inheritance.       |
| **Global Data Sharing**    | ❌    | Cannot be used for data that unrelated external classes need to read or write directly.                 |

## default (Package-Private)

**`default`** (no modifier keyword explicitly typed) restricts visibility strictly to classes within the **same package**.

Core Concept

- **Package Boundary:** Visible only to components sharing the exact same package directory.
- **Implicit Default:** Applied automatically by the compiler when no other access modifier is specified.

Usage Guidelines

| Scenario                        | Rule | Why?                                                                                                                      |
| ------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------- |
| **Package Cohesion**            | ✔️   | Allows tightly coupled helper classes within the same package to collaborate without exposing them globally.              |
| **Component Bundles**           | ✔️   | Ideal for internal framework modules where a group of files work together but should stay hidden from the final user.     |
| **Subclassing Across Packages** | ❌    | Subclasses in different packages cannot see default members, breaking inheritance across package boundaries.              |
| **Public API Design**           | ❌    | External applications importing your JAR cannot access package-private features, rendering them useless for public tools. |
