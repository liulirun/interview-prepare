**Abstract classes** and **interfaces** are both used to achieve abstraction in Java, but they serve different design purposes. *An abstract class defines *what an object is*, while an interface defines *what an object can do* .

Core Differences

- **Inheritance**: A class can extend only **one** abstract class, but it can implement **multiple** interfaces.
- **State**: Abstract classes can have **instance fields** (state). Interfaces cannot hold instance state.
- **Constructors**: Abstract classes **can** have constructors. Interfaces **cannot** have constructors.
- **Methods**: Abstract classes can have **any access modifier** on methods. Interface methods are **implicitly public**.

Comparison Matrix

| Feature             | Abstract Class                                      | Interface                                 |
| ------------------- | --------------------------------------------------- | ----------------------------------------- |
| **Inheritance**     | Single inheritance (`extends`)                      | Multiple inheritance (`implements`)       |
| **Variables**       | Can be private, protected, public, final, non-final | Must be `public static final` (constants) |
| **Constructors**    | Yes, called via `super()`                           | No                                        |
| **Default Methods** | Concrete methods are standard                       | Uses the `default` keyword (Java 8+)      |
| **Private Methods** | Yes                                                 | Yes (Java 9+)                             |
| **Speed**           | Slightly faster (direct lookup)                     | Slightly slower (indirection lookup)      |

Code Examples

Abstract Class: Defining an Identity ("Is-A")

Use this when classes share a common identity and implementation details.

```java
abstract class Animal {
    String name; // Can have instance variables

    Animal(String name) { // Can have a constructor
        this.name = name;
    }

    abstract void makeQuantitySound(); // Abstract method

    void breathe() { // Concrete method shared by all
        System.out.println("Breathing...");
    }
}
```

Interface: Defining a Capability ("Can-Do")

Use this to establish a contract for unrelated classes to perform a specific action.

```java
interface Flyable {
    int MAX_ALTITUDE = 10000; // Implicitly public static final

    void fly(); // Implicitly public abstract

    default void land() { // Default method (Java 8+)
        System.out.println("Landing safely.");
    }
}
```

When to Choose Which

- **Choose Abstract Classes if**:

  - You want to share code among several closely related classes.
  - You need to use non-public or non-final fields to track object state.
  - You plan to expand the API later by adding concrete methods without breaking subclasses.

- **Choose Interfaces if**:

  - You want to specify the behavior of a particular data type, regardless of who implements it.
  - You need to implement multiple independent sets of behaviors.
  - You want to take advantage of functional programming (Functional Interfaces for Lambdas).

Would you like to see a code example where a single class **extends an abstract class and implements multiple interfaces** at the same time?


Here is a complete, runnable example where a `Drone` class inherits its core identity from an **Abstract Class** and gains capabilities from **multiple Interfaces**.

```java
// --- ABSTRACT CLASS: Defines what the object IS ---
abstract class Aircraft {
    private String serialNumber; // Can hold private state

    public Aircraft(String serialNumber) { // Has a constructor
        this.serialNumber = serialNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    // Abstract method: Force subclasses to implement their own takeoff logic
    public abstract void takeOff();
}

// --- INTERFACE 1: Defines a capability ---
interface Flyable {
    void fly(); // Implicitly public abstract
}

// --- INTERFACE 2: Defines another capability ---
interface Autonomous {
    void navigateToGPS(double lat, double lon);
}

// --- CONCRETE CLASS: Uses both concepts ---
class Drone extends Aircraft implements Flyable, Autonomous {
    private int batteryLevel;

    public Drone(String serialNumber, int batteryLevel) {
        super(serialNumber); // Calls the abstract class constructor
        this.batteryLevel = batteryLevel;
    }

    // Implementing the Abstract Class method
    @Override
    public void takeOff() {
        System.out.println("Drone " + getSerialNumber() + " spinning rotors for vertical takeoff.");
    }

    // Implementing Flyable Interface
    @Override
    public void fly() {
        System.out.println("Drone is cruising in the air.");
    }

    // Implementing Autonomous Interface
    @Override
    public void navigateToGPS(double lat, double lon) {
        System.out.println("Auto-navigating to coordinates: " + lat + ", " + lon);
    }
}

// --- MAIN EXECUTION ---
public class Main {
    public static void main(String[] args) {
        Drone myDrone = new Drone("SN-9982X", 85);

        myDrone.takeOff();
        myDrone.fly();
        myDrone.navigateToGPS(43.6532, -79.3832);
    }
}
```

Why this design works

- **`extends Aircraft`**: The drone *is* an aircraft. It shares the baseline trait of having a serial number.
- **`implements Flyable, Autonomous`**: The drone *can* fly and *can* pilot itself. You could easily reuse these interfaces on unrelated classes, like a `Bird` (Flyable) or a `SelfDrivingCar` (Autonomous).

Would you like to explore **Default Methods** in interfaces next, or do you want to look at how **Polymorphism** works with these types?