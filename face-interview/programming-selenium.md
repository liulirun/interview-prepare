## `flaky`
In Selenium, a **flaky test** is an automated test that inconsistently passes or fails during different runs, even when neither the application code nor the test code has changed.

- 1. Brittle Locators
- 2. External Dependencies: rely on live third-party services
- 2. External Dependencies: Infra, network, server load
- 3. A **race condition** most common cause. two asynchronous processes—**Selenium script** and the **Web Browser**—race to complete a task. test fails with errors like `NoSuchElementException` or `ElementNotInteractableException`. The Solution: Explicit Waits, Use the `WebDriverWait` and `expected_conditions` (EC) classes - **Handle Stale Elements**: If a page re-renders (common in React/Vue), your element reference may break. Re-finding the element inside a try-except block or using a wait can resolve this.
handle: combinbe: 1: The "Retry" Wrapper (Most Robust) + 2: The `WebDriverWait` Approach

- **Option 1** is a "brute force" but effective way to handle flaky components that refresh multiple times.
- **Option 2** is more precise and follows the official Selenium design pattern, ensuring your script stays perfectly synced with the browser's state.


```python

def robust_click(driver, locator):
    wait = WebDriverWait(driver, 10)
    
    try:
        # Initial attempt: Wait for element and click
        element = wait.until(EC.element_to_be_clickable(locator))
        element.click()
    except StaleElementReferenceException:
        # If stale, the second wait re-finds the element from scratch
        print("DOM refreshed; re-finding element...")
        element = wait.until(EC.element_to_be_clickable(locator))
        element.click()
```

### exceptions
| Category        | Exception                 | Description                                                     |
| --------------- | ------------------------- | --------------------------------------------------------------- |
| **Locating**    | `NoSuchElementException`  | The locator is correct, but the element isn't on the page.      |
| **Interaction** | `ElementClickIntercepted` | Another element (like a popup) is covering the target.          |
|                 | `ElementNotInteractable`  | Element exists in DOM but is hidden or disabled.                |
|                 | `StaleElementReference`   | The element was deleted or the page refreshed since finding it. |
| **Wait/State**  | `TimeoutException`        | An explicit wait (`WebDriverWait`) reached its time limit.      |
|                 | `JavascriptException`     | The code inside `execute_script()` failed.                      |
| **Switching**   | `NoSuchFrameException`    | The target `iframe` does not exist.                             |
|                 | `NoSuchWindowException`   | The target tab/window handle is invalid or closed.              |
|                 | `NoAlertPresentException` | Switching to an alert that isn't currently displayed.           |

### iframe
1\. The "Blindness" Factor (Context Switching)

Selenium can only "see" one document at a time. An iframe is essentially a **separate HTML document** nested inside your main page.

- **The Problem:** without switching to it first, Selenium will throw a `NoSuchElementException`, 

2\. The Nesting Trap

Modern sites often use nested iframes (an iframe inside an iframe).

3\. Asynchronous Loading (The Race Condition)

- **The Problem:** The main page might report `document.readyState == "complete"`, but the iframe inside it might still be a blank white box loading a heavy third-party script

The "Best Practice" Code:

```python
# 1. Wait for the iframe to exist AND switch to it automatically
# This is a 'magic' expected condition that handles the switch for you
WebDriverWait(driver, 10).until(
    EC.frame_to_be_available_and_switch_to_it((By.ID, "payment-iframe"))
)

# 2. Now you are 'inside' the iframe. Interact with internal elements.
driver.find_element(By.ID, "card-number").send_keys("4242")

# 3. CRITICAL: Switch back to the main page when done
# If you don't do this, Selenium can't see the main navigation anymore
driver.switch_to.default_content()
```

## `cool JS feature` 
### `js to find element`
browser's **Developer Tools Console**.
- Press **F12** -> **Console** tab.
- Type one of the following commands:
   - `$$("your-selector")`: Returns a list of **all** matching elements.
   - `document.querySelector("your-selector")`: Returns only the **first** match.

- **Try:** `$$("form.search button")`
- **Success:** If it returns `[button]`, the selector is valid and unique.
- **Failure:** If it returns `[]`, the selector found nothing.

**1. Selector Syntax Cheat Sheet**
| Attribute     | Browser Console Test   | Selenium Python Example               |
| ------------- | ---------------------- | ------------------------------------- |
| **ID**        | `$$("#query")`         | `(By.ID, "query")`                    |
| **Name**      | `$$('[name="query"]')` | `(By.NAME, "query")`                  |
| **Class**     | `$$(".brand")`         | `(By.CSS_SELECTOR, ".brand")`         |
| **Attribute** | `$$("[method='get']")` | `(By.CSS_SELECTOR, "[method='get']")` |
| **Hierarchy** | `$$("nav > a")`        | `(By.CSS_SELECTOR, "nav > a")`        |
4. **Need to find an element by its visible text?** Use `By.XPATH`.
   - *Tip:* CSS cannot read text content (e.g., the word "Login"). For that, use: `//a[text()='Login']`.

### `js in console`
```python
  # Scroll to Absolute Bottom
  driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
  # **Horizontal Scroll**: Useful for carousels or wide tables.
  driver.execute_script("window.scrollBy(500, 0);")
  # **Get Page Load Progress**: Returns "complete" when the page is fully ready.
  status = driver.execute_script("return document.readyState;")
  # **Open and Focus New Tab**
  driver.execute_script("window.open('https://google.com', '_blank');")
  # **Highlight an Element**: Changes the background to yellow so you can visually confirm a locator.
  driver.execute_script("arguments[0].style.backgroundColor = 'yellow';", element)
```

# Design Pattern

Summary of Popularity and Use

| Pattern               | Best For...              | Key Benefit                                            |
| --------------------- | ------------------------ | ------------------------------------------------------ |
| **Page Object Model** | UI & Mobile Testing      | Reduces maintenance when UI changes.                   |
| **Screenplay**        | Large, complex projects  | High reusability and descriptive steps.                |
| **Singleton**         | Browser management       | Efficient resource usage (one DB connection instance). |
| **Factory**           | Cross-browser testing    | Easy to swap browser types.                            |
| **Data-Driven**       | Multiple input scenarios | Runs one test with many data sets.                     |

Design patterns in test automation are standardized solutions to recurring challenges like code duplication, brittle tests, and difficult maintenance. Implementing these patterns helps create frameworks that are scalable, readable, and easier to debug.

Core Architectural Patterns

- **Page Object Model (POM):** The most widely used pattern for UI testing. It creates an object repository for web elements, separating the test logic from the UI structure. This ensures that when the UI changes, you only need to update the Page Object class rather than every individual test script.
- **Screenplay Pattern:** A more advanced, actor-centric approach that focuses on "behavior" rather than just "pages". It uses **Actors** (users) who have **Abilities** (e.g., browsing the web) to perform **Tasks** (e.g., logging in) and **Interactions** (e.g., clicking a button). It scales better for large teams by promoting high reusability.
- **Fluent Interface (Method Chaining):** Often used within POM to allow for more readable, "sentence-like" test code. For example, `loginPage.enterUser("name").enterPass("123").clickSubmit();`.

Structural and Creational Patterns

- **Singleton Pattern:** Ensures only one instance of a class (like a Database connection) is created and shared across all tests. This prevents opening multiple browser windows unnecessarily.
- **Factory Pattern:** Centralizes the creation of objects, such as a `BrowserFactory` that returns the correct WebDriver (Chrome, Firefox, etc.) based on a configuration file. This makes it easy to add new browser support without modifying existing tests.
- **Facade Pattern:** Provides a simplified interface to a complex underlying system. In testing, it can combine multiple Page Object actions into a single high-level method, like `User.completeCheckout()`, hiding the complexity of the multi-step process.
- **Builder Pattern:** Useful for creating complex test data or request objects step-by-step. It is highly effective in API testing for constructing dynamic JSON payloads.

Data and Logic Patterns

- **Data-Driven Testing (DDT):** Separates test data (from Excel, JSON, or databases) from the test logic. This allows the same test scenario to run multiple times with different inputs and expected results.

## Options
Chrome Options Reference

| Category           | Option / Argument                                               | Description                                                  |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------------ |
| **Visibility**     | `--headless=new`                                                | Runs Chrome without a visible GUI (background).              |
| **Window Size**    | `--start-maximized`                                             | Opens the browser to fill the screen.                        |
| **Window Size**    | `--window-size=1920,1080`                                       | Sets a specific width and height at startup.                 |
| **Security**       | `--no-sandbox`                                                  | Bypasses the OS security model (needed for Docker).          |
| **Performance**    | `--disable-dev-shm-usage`                                       | Prevents crashes in low-memory environments (Linux).         |
| **Performance**    | `--disable-gpu`                                                 | Disables hardware acceleration; improves headless stability. |
| **Privacy**        | `--incognito`                                                   | Opens a new private browsing session.                        |
| **Anti-Detection** | `user-agent=VALUE`                                              | Spoofs the browser identity to look like a specific device.  |
| **Automation**     | `excludeSwitches: ["enable-automation"]`                        | Hides the "Chrome is being controlled..." notification.      |
| **Pop-ups**        | `--disable-popup-blocking`                                      | Allows the browser to open new windows automatically.        |
| **Resources**      | `prefs: {"profile.managed_default_content_settings.images": 2}` | Blocks all images from loading to increase speed.            |
| **Session**        | `detach: True`                                                  | Keeps the browser window open after the script ends.         |

## `why playwright is better`
Playwright is often considered "better" than Selenium because it was built for the modern web, addressing many of the speed and stability issues that plague Selenium.

| Feature                | Selenium                                     | Playwright                                               |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------- |
| **Architecture**       | Sends HTTP commands to a driver (slower).    | Uses WebSocket connections (faster, real-time).          |
| **Waiting**            | Requires manual "waits" or sleep commands.   | **Auto-waits** for elements to be ready before acting.   |
| **Stability**          | Prone to "flaky" tests due to timing issues. | Extremely stable; resilient to dynamic UI changes.       |
| **Browser Support**    | Supports almost everything via drivers.      | Uses bundled versions of Chromium, Firefox, and WebKit.  |
| **Execution Speed**    | Slower; creates a new process for each test. | Faster; uses **Browser Contexts** (isolated sessions).   |
| **Tooling**            | Minimal built-in tools.                      | Built-in **Trace Viewer**, Test Generator, and Debugger. |
| **Parallelism**        | Requires Selenium Grid (complex setup).      | Native, effortless parallel execution out of the box.    |
| **iFrames/Shadow DOM** | Hard to navigate; requires manual switching. | Handles iFrames and Shadow DOM automatically.            |

Summary

- **Selenium** is better for legacy systems or if you need to test on very old or niche browser versions (like Internet Explorer).
- **Playwright** is better for modern development because it is **faster**, eliminates most **flaky tests**, and provides a much better **developer experience**.