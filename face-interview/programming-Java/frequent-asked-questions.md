
## **Abstract classes** and **interfaces**
**Abstract classes** and **interfaces** are both used to achieve abstraction in Java, but they serve different design purposes. *An abstract class defines *what an object is*, while an interface defines *what an object can do* .

### Core Differences
| Feature                     | Abstract Class                                                                                 | Interface                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Inheritance Structure**   | Single inheritance (`extends`). A class can only extend one abstract class.                    | Multiple inheritance (`implements`). A class can implement multiple interfaces. |
| **State & Instance Fields** | Can have instance fields (private, protected, public, final, non-final) to track object state. | Cannot hold instance state.                                                     |
| **Variables / Fields**      | Supports all access modifiers and variable types.                                              | Variables must be constants (`public static final`).                            |
| **Constructors**            | Yes, supported. Subclasses call them via `super()`.                                            | No, constructors are not allowed.                                               |
| **Method Access Modifiers** | Methods can have any access modifier (private, protected, public).                             | Methods are implicitly public (private allowed since Java 9+).                  |
| **Default Methods**         | Concrete methods are standard and require no special keyword.                                  | Requires the `default` keyword for concrete implementations (Java 8+).          |
| **Private Methods**         | Yes, standard private methods allowed.                                                         | Yes, allowed for code sharing between default methods (Java 9+).                |
| **Execution Speed**         | Slightly faster due to direct method lookup.                                                   | Slightly slower due to indirection method lookup.                               |

### When to Choose Which
| When to Choose     | Use an Abstract Class                                   | Use an Interface                                             |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------------ |
| **Relationship**   | Classes are **family** (e.g., Cat and Dog are Animals). | Classes share a **skill** (e.g., Bird and Airplane can Fly). |
| **Data Storage**   | You need to store **changing data** (fields/state).     | You only need **constants** (fixed numbers/text).            |
| **Inheritance**    | Child class can only inherit from **one** parent.       | Class can adopt **multiple** separate skillsets.             |
| **Future Changes** | Adding new shared code **will not break** old code.     | Adding new standard methods **requires** Java 8+ `default`.  |
| **Coding Style**   | Best for standard **Object-Oriented** design.           | Best for modern **Functional / Lambda** programming.         |

### Code example
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