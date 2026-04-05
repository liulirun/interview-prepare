## Veeva possible questions
Technical interview, only focus on automation/coding skills etc. 

write a function to check if the parentheses in a string are well formed.

difference between abstract classes and interfaces, then the difference between reference and value, then what static classes vs. singleton classes were. 

Questions Threads Concurrent HashMap Java Basics - Coding round Topological sort related questions.
 LinkedList.

 Related to strings, counting characters etc.

## JAVA Pattens
In Selenium automation with Java, design patterns are crucial for creating maintainable, scalable, and readable test frameworks. The most common patterns used include *structural patterns like the Page Object Model and creational patterns like Factory and Singleton*.

1\. Structural Patterns

These patterns focus on how to organize classes and objects to simplify complex systems.

- **Page Object Model (POM)**: The most widely used pattern in Selenium. It abstracts the UI of a web application by representing each web page as a Java class.

  - **Encapsulation**: Elements (locators) and behaviors (methods) of a page are kept in one place.
  - **Maintenance**: If a UI element changes, you only update it in the page class, rather than every test case.

- **Facade Pattern**: Provides a simplified interface to a complex set of classes. In Selenium, a facade can abstract away complex browser initialization or multi-step navigation flows.

- **Decorator Pattern**: Used to dynamically add responsibilities to objects, such as adding logging or explicit waits to standard `WebElement` actions without modifying the underlying class.

2\. Creational Patterns

These patterns manage object instantiation to improve flexibility and resource management.

- **Factory Pattern**: Used to manage the creation of different `WebDriver` instances (e.g., Chrome, Firefox, Edge). A `DriverFactory` class handles the logic for which browser to launch based on input parameters.
- **Singleton Pattern**: Ensures that only one instance of a class (typically the `WebDriver`) exists throughout the test execution. This prevents unnecessary multiple browser windows from opening and improves resource efficiency.
- **Builder Pattern**: Helpful when dealing with objects that have many optional parameters, such as complex forms or configuration objects. It allows you to build an object step-by-step.

3\. Behavioral Patterns

These patterns focus on how objects interact and communicate.

- **Strategy Pattern**: Useful when you have multiple ways to perform a task (e.g., different login methods for various user roles) and want to choose the implementation at runtime.
- **Command Pattern**: Wraps repetitive actions into reusable command objects (e.g., a "Click" or "Login" command) to make tests more modular.
- **Fluent Interface (Method Chaining)**: A style where methods return the object itself (`return this;`), allowing you to chain actions like `loginPage.enterUser("name").enterPass("pwd").clickLogin();`.

4\. Advanced Framework Patterns

- **Screenplay Pattern**: An evolution of POM that focuses on "Actors" performing "Tasks". It is highly scalable for complex workflows and adheres strictly to SOLID principles.
- **Base Page Class**: A common practice where all page classes inherit from a parent `BasePage` that contains shared methods like generic clicks, waits, and driver management.