
*   [Go to Intro](#Intro)
*   [Go to Shift-left](#Shift-left)
*   [Go to Flaky](#Flaky-Tests)
*   [Go to CI](#CI)
*   [Go to Agent](#Agent)
*   [Go to Assertions](#Assertions)

https://testdino.com/blog/playwright-skill-claude-code/

# Intro

**1. Fixtures**

Fixtures are the **building blocks** of Playwright tests. They are pre-defined objects (like `page`, `browser`, or `context`) that Playwright initializes and cleans up for you. You can also create **Custom Fixtures** to share setup logic (like a logged-in state) across multiple tests.

- **Pro Tip:** Custom fixtures are better than `beforeEach` because they are "lazy-loaded"

```typescript
// example.spec.ts
import { test } from '@playwright/test';

// 'page' and 'browserName' are built-in fixtures
test('basic fixture usage', async ({ page, browserName }) => {
  await page.goto('https://example.com');
  console.log(`Testing on: ${browserName}`);
});
```
In Playwright, **Fixtures** are the isolated environments or objects provided to each test. For a senior interview, emphasize that fixtures are **encapsulated**, **lazy-loaded** (they don't run unless called), and **reusable**.

**Built-in Playwright Fixtures**

| Fixture            | Description                                                | Senior Pro-Tip                                                                                                               |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **`page`**         | A single tab within a browser context.                     | The most common fixture. Each test gets a fresh, isolated page.                                                              |
| **`context`**      | The isolated "incognito" session containing the page.      | Use this to manage cookies, permissions, or to open a second tab/window within the same session.                             |
| **`browser`**      | The actual browser instance (Chromium/Firefox/Webkit).     | Rarely used directly unless you need to create a completely new `browserContext` manually within one test.                   |
| **`browserName`**  | String name of the current browser (e.g., 'chromium').     | Useful for conditional logic: `if (browserName === 'webkit') { ... }`.                                                       |
| **`request`**      | API testing fixture for making HTTP requests.              | Can be used to "seed" data via API before the UI test starts, making tests faster and more reliable.                         |
| **`isMobile`**     | Boolean; true if the browser is emulating a mobile device. | Use to skip or adapt tests for mobile-only or desktop-only features.                                                         |
| **`viewport`**     | The current dimensions of the browser window.              | Helpful for verifying responsive design breakpoints.                                                                         |
| **`storageState`** | The authentication state (cookies/local storage).          | A senior favorite: Use a global setup to save `storageState` to a file, then load it via `use` to skip login for every test. |

**Custom Fixtures (The Senior Level)**

While built-in fixtures are great, seniors create **Custom Fixtures** to abstract business logic (like a `LoginService` or `DatabaseClient`).

| Technique                  | How it works                                                                  | Why it's "Senior"                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`base.extend<{...}>`**   | Defining your own objects (e.g., `dashboardPage`) by extending the base test. | It creates a **Domain Specific Language (DSL)**. Instead of `page`, your test asks for `adminUser`, hiding all setup complexity.  |
| **Automatic Fixtures**     | Setting `{ auto: true }` on a fixture.                                        | It runs for *every* test in the scope, even if not requested. Perfect for global logging or performance monitoring.               |
| **Worker-scoped Fixtures** | Using `scope: 'worker'` instead of 'test'.                                    | These stay alive across multiple test files. Use this for expensive setups, like starting a local server or a database container. |

**💡 Senior Pro-Tips for Fixtures**

- **Lazy Loading**: Mention that Playwright only executes a fixture if it appears in the test arguments. If a test doesn't ask for `page`, the browser doesn't even launch. This saves massive amounts of CI time.
- **Teardown is Built-in**: Explain that the code *after* the `await use(obj)` statement in a custom fixture is the teardown logic. It's much cleaner than using `afterEach` because the setup and cleanup are in the same block of code.
- **Fixture Chaining**: One fixture can depend on another. For example, your `authenticatedPage` fixture can depend on the `page` fixture, navigate to the login screen, perform the login, and then pass the logged-in page back to the test.
- **Isolation**: Always remind the interviewer that fixtures ensure **zero state leakage**. If Test A changes a setting, Test B's `page` fixture is completely unaffected because it's a new `context`.

**2. Locators**

auto-retrying

```typescript
test('locator example', async ({ page }) => {
  await page.goto('/login');

  // Best practice: Use user-visible locators
  const loginButton = page.getByRole('button', { name: 'Log in' });

  await loginButton.click();
});
```
For a senior-level interview, you should emphasize that **User-Visible Locators** (like `getByRole`) are superior to **Technical Locators** (like CSS or XPath) because they make tests more resilient to code changes and ensure the app is accessible.

**Core Playwright Locators**

| Locator                       | Best Use Case                                                    | Senior Pro-Tip                                                                                                                             |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`page.getByTestId()`**      | When no other locator works.                                     | **The "Escape Hatch"**. Best for complex components. Configure the attribute name (e.g., `data-qa`) in your `playwright.config.ts`.        |
| **`page.getByRole()`**        | Buttons, checkboxes, headings, links.                            | **The "Gold Standard"**. It forces you to write accessible HTML. If it can't find a button by role, your app isn't screen-reader friendly. |
| **`page.getByText()`**        | Finding non-interactive elements like paragraphs or spans.       | Use `{ exact: false }` for substring matching if the text is dynamic or contains extra whitespace.                                         |
| **`page.frameLocator()`**        | iframe||


**Advanced Locator Strategies (Senior Interview Specifics)**

| Strategy           | Logic                                                   | Code Example                                                                                                                           |
| ------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Filtering**      | Narrow down a locator by child text or another locator. | `page.getByRole('listitem').filter({ hasText: 'Product A' })`                                                                          |
| **Chaining**       | Moving from a parent container to a specific child.     | `const card = page.locator('.card-body');` `await card.getByRole('button').click();`                                                   |
| **Strictness**     | All locators are "strict" by default.                   | If `page.getByRole('button')` finds **two** buttons, Playwright throws an error. This prevents accidental clicks on the wrong element. |
| **Frame Locators** | Handling `<iframe>` elements.                           | `page.frameLocator('#my-iframe').getByRole('button')`                                                                                  |

**💡 Senior Pro-Tips for Locators**

- **Avoid XPath and CSS**: In an interview, state that you prefer `getByRole` because it’s **logic-based**, not **structure-based**. If a developer changes a `<div>` to a `<span>`, a CSS selector might break, but `getByText` or `getByRole` usually won't.
- **The "User Perspective"**: Seniors explain that locators should mimic how a user finds an element: "I look for a button that says 'Submit'," not "I look for the third child of the second div."
- **Internal vs. External**: `page.locator()` is the "internal" generic method used for CSS/XPath. Only use it when you absolutely must target a specific class or ID that has no semantic role.
- **Locators are Lazy**: Remind the interviewer that defining a locator `const btn = page.getByRole('button')` **does not** trigger a browser command. It only searches the DOM when you perform an action like `await btn.click()`.

**3. Assertions (`expect`)**

Playwright includes a powerful `expect` library. The "magic" here is **Web-First Assertions**: these assertions automatically wait for a condition to be met (like a button becoming enabled) before checking.

```typescript
test('assertion example', async ({ page }) => {
  await page.goto('/dashboard');

  // This will retry until the element is visible
  await expect(page.getByText('Welcome back!')).toBeVisible();
});
```

**4. BrowserContext**

A `BrowserContext` is like an **Incognito window**. Each test gets its own context by default, meaning cookies and cache are never shared between tests. This allows you to run hundreds of tests in parallel on a single machine without them interfering with each other.

```typescript
test('multi-context example', async ({ browser }) => {
  // Create two isolated "sessions"
  const adminContext = await browser.newContext();
  const userContext = await browser.newContext();

  const adminPage = await adminContext.newPage();
  const userPage = await userContext.newPage();

  // Admin performs an action, User verifies it
});
```

**Component Comparison Table**

| Component    | Role            | Why it's Awesome                                    |
| ------------ | --------------- | --------------------------------------------------- |
| **Fixtures** | Setup/Teardown  | Zero-boilerplate environment prep.                  |
| **Locators** | Element Finding | Auto-waits and stays "fresh" (no stale elements).   |
| **Expect**   | Verification    | Retries until the UI state matches the assertion.   |
| **Context**  | Isolation       | Fast, parallel testing with clean state every time. |

| Feature      | **`use`**                                           | **`testInfo`**                              |
| ------------ | --------------------------------------------------- | ------------------------------------------- |
| **Purpose**  | **Configure** the environment (URL, browser, etc.). | **Retrieve** info about the running test.   |
| **Location** | Defined in config files or via `test.use()`.        | Passed as an argument to the test function. |
| **Timing**   | Set *before* the test starts.                       | Used *during* the test execution.           |
**💡 Pro Tips for Interviews**

- **The "Auto-Wait" Rule:** Almost every action (`click`, `fill`, `check`) and every web-first assertion (`toBeVisible`, `toHaveText`) has built-in waiting. You almost **never** need to use `page.waitForTimeout(3000)`.
- **Tracing:** If a test fails in CI, use the **Trace Viewer**. 

**1. The `use` Property**

The `use` property is a configuration object used to set up the **environment, emulation, and browser options** for your tests. It can be defined at different levels:

- **Global/Project Level**: In `playwright.config.ts`, the `use` block sets defaults like `baseURL`, `headless` mode, or `viewport` size for all tests or specific projects.
- **Test File Level**: Using `test.use({ ... })` inside a spec file overrides the global configuration for all tests in that specific file.

**Example usage in a config file:**

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: 'https://example.com',
    screenshot: 'only-on-failure', // Automatically capture screenshots on failure
    trace: 'on-first-retry',        // Record a trace for debugging retries
  },
});
```

**2. The `testInfo` Object**

`testInfo` is a built-in object providing **metadata and utilities** for the currently running test. It is passed as the second argument to your test function or hooks (like `beforeEach`)
**Key Capabilities of `testInfo`**

- **Access Metadata**: Retrieve the test `title`, current `retry` count, or `status`.
- **Control Execution**: Update the test `timeout` dynamically or mark a test as "expected to fail" using `testInfo.fail()`.
- **Manage Attachments**: Manually attach files, screenshots, or logs to the test report using `testInfo.attach()`.
- **File Paths**: Use `testInfo.outputPath('file.png')` to generate a unique, safe path for saving test artifacts

**Example usage in a test:**

```typescript
import { test, expect } from '@playwright/test';

test('metadata example', async ({ page }, testInfo) => {
  console.log(`Running: ${testInfo.title}`); // Access test title

  if (testInfo.retry > 0) {
    console.log('This is a retry attempt'); // Check retry status
  }

  await page.goto('/');
  // Manually attach a custom note to the report
  await testInfo.attach('Notes', { body: 'User logged in successfully' });
});
```

# Senior level
For a senior-level Playwright interview, you must demonstrate how these components work together to create a **scalable, observable, and resilient** test framework.

Below is a comprehensive example and a breakdown of how a "Senior Engineer" explains the synergy between `use`, `testInfo`, `Fixtures`, and `Locators`.

**The "Senior" Architecture Example**

 **Custom Fixture** for business logic, and `testInfo` for advanced debugging/reporting.

```typescript
import { test as base, expect } from '@playwright/test';

// 1. EXTENDING BASE: Creating a Custom Fixture (Senior Practice)
// This encapsulates setup logic so tests stay clean.
const test = base.extend<{ dashboardPage: any }>({
  dashboardPage: async ({ page }, use) => {
    // Setup: Login once and navigate
    await page.goto('/login');
    await page.getByLabel('Username').fill('admin');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Pass the prepared page to the test
    await use(page); 

    // Teardown: Logic here runs AFTER the test finishes
    console.log('Cleaning up dashboard session...');
  },
});

// 2. FILE-LEVEL CONFIGURATION
test.use({ 
  viewport: { width: 1280, height: 720 },
  ignoreHTTPSErrors: true 
});

test('Advanced Telemetry & Assertion', async ({ dashboardPage, page }, testInfo) => {
  // 3. LOCATORS: Using user-centric selection
  const statsCard = dashboardPage.getByRole('region', { name: 'Monthly Stats' });

  // 4. TESTINFO: Dynamically modifying test behavior
  if (testInfo.project.name === 'webkit') {
    testInfo.setTimeout(testInfo.timeout + 5000); // Give Safari extra time
  }

  // 5. ASSERTION: Web-first (auto-retrying)
  await expect(statsCard).toBeVisible();

  // 6. ATTACHMENTS: For debugging senior-level failures
  const screenshot = await page.screenshot();
  await testInfo.attach('final-state-screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
});
```

**How they Interconnect (The "Senior" Narrative)**

| Component               | Strategic Connection                                                                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`use` + Fixtures**    | **Dependency Injection**: Use the `use` block in the config to set global state (like `baseURL`), then inject those settings into custom fixtures to keep tests DRY (Don't Repeat Yourself). |
| **`testInfo` + Config** | **Environment Awareness**: A senior dev uses `testInfo` to detect the environment (CI vs. Local) and adjust timeouts or skip specific tests that are known to be flaky on specific browsers. |
| **Locators + `expect`** | **Resiliency**: By combining strict Locators with Web-First Assertions, you eliminate 90% of "flaky" tests caused by timing issues (race conditions).                                        |

**💡 Senior Pro Tips & Interview "Gold"**

- **The "Attachment" Strategy**: Don't just rely on automatic screenshots. Use `testInfo.attach()` to upload **JSON payloads** or **API responses** during a test. If a UI test fails because an API returned a 500, having that JSON in the Playwright Report saves hours of debugging.
- **Soft Assertions**: Mention `expect.soft()`. Seniors use this when they want to check multiple things (like 5 different labels) without stopping the test on the first failure. It collects all errors and reports them at the end.
- **The `testInfo.outputPath` Trick**: If your test generates a file (like a CSV export), always save it to `testInfo.outputPath('filename.csv')`. Playwright will automatically clean this up or include it in the trace based on your configuration.
- **Parallelism vs. Context**: Explain that while `use` configures the context, the true power of Playwright is that each test runs in its own `BrowserContext`. This is why we can run 50 tests at once on one machine—something Selenium struggled with for a decade.
<<<<<<< HEAD
## `playwright.config.ts`
The `playwright.config.ts` file is the **brain** of your test suite. It centralizes all your project settings, environment variables, and browser configurations so you don't have to pass complex arguments every time you run a test.

Core Purposes of the Config File

| Purpose                | Description                                                   | Key Setting                     |
| ---------------------- | ------------------------------------------------------------- | ------------------------------- |
| **Project Management** | Define different environments (Mobile, Desktop, Smoke Tests). | `projects: [...]`               |
| **Execution Control**  | Set timeouts, retries, and parallelization limits.            | `timeout`, `retries`, `workers` |
| **Browser Context**    | Global settings for viewport size, base URL, and geolocation. | `use: { baseURL, viewport }`    |
| **Reporters**          | Choose how you see results (HTML, JSON, Dot, or Line).        | `reporter`                      |
| **Artifacts**          | Control when to save screenshots, videos, and trace files.    | `trace`, `screenshot`, `video`  |

Common Configurations & Examples

| Feature              | What it does                                                | Example usage                                     |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| **Base URL**         | Shortens your `page.goto()` calls by providing a prefix.    | `use: { baseURL: 'http://localhost:3000' }`       |
| **Retries**          | Automatically re-runs a failed test to check for flakiness. | `retries: process.env.CI ? 2 : 0`                 |
| **Web Server**       | Starts your app automatically before running tests.         | `webServer: { command: 'npm start', port: 3000 }` |
| **Device Emulation** | Simulates specific hardware (e.g., iPhone 13).              | `...devices['iPhone 13']`                         |

💡 Pro-Tips for Config Files

- **Environmental Logic:** Use a ternary operator to change settings for CI vs. Local development.
  - *Example:* `workers: process.env.CI ? 1 : undefined` (Runs tests one-by-one in CI to prevent resource crashes but uses all CPU cores locally).
- **Trace on First Retry:** Set `trace: 'on-first-retry'`. This keeps your test runs fast and storage clean, only generating heavy trace files when a test actually fails and needs investigation.
- **Multiple Projects:** Use the `projects` array to run the same tests against Chromium, Firefox, and WebKit simultaneously with one command.
- **The `.env` File:** Always use a library like `dotenv` at the top of your config (`require('dotenv').config();`) to keep sensitive credentials out of your TypeScript code.
=======

>>>>>>> ac544e04902d8b09a491d04e251654df5e3b0fdc
# Shift-left

| Feature                | How it enables Shift-Left                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **Local Feedback**     | **UI Mode** and **Trace Viewer** let devs debug tests instantly on their machines before pushing code. |
| **Speed & Isolation**  | Fast execution and **Network Mocking** allow testing the frontend even if the backend isn't ready.     |
| **Component Testing**  | Supports testing individual UI components (React, Vue, Svelte) in isolation early in development.      |
| **CI/CD Integration**  | High reliability and low flakiness make it ideal for blocking "bad" code at the Pull Request stage.    |
| **All-in-One Testing** | Handles **API**, **Visual**, and **Accessibility** tests in one tool, catching diverse bugs earlier.   |
| **Unified Language**   | Uses TypeScript/JavaScript, allowing developers to write tests in the same language as their app code. |
# Flaky-Tests
Common questions will test your knowledge of **asynchronous synchronization**, **locator strategy**, and **test isolation**.

Flakiness in Playwright is rarely a "random" glitch; it is typically a failure of the test to synchronize with the application's actual state.

- **Async Wait Issues (45% of failures):** test script moving faster than the application's UI or backend. A test might click a button that is visible but not yet "hydrated" (functional).
  - **Never** use `waitForTimeout`. Use **web-first assertions** (like `expect(locator).toBeVisible()`) which have built-in retry logic.
  - use `Locator`: Lazy loading.
  - use `page.waitForResponse()` to force waiting for dependecy call
  - use `.toPass()` for retry ( least option)
- **User-Facing Locators:** Prioritize `getByRole`, `getByText`, or `getByTestId` then using implementation-heavy CSS selectors.
  - need dev. **Never** use this `page.locator('.login-btn')`, `page.locator('h1.title')`, instead, use `page.getByRole('button', { name: 'Log in' })`, `page.getByText('Welcome Back')`
- **Brittle Selectors:** **Never** use this fragile CSS or XPath selectors (e.g., `div > span:nth-child(3)`).
- **External Dependencies:** Relying on live third-party APIs or databases that may be slow, rate-limited, or temporarily down.
- **Resource-Affected Flakiness (46.5% of failures):** Tests often pass locally on powerful machines but fail in CI environments where CPU, memory, or network resources are constrained, causing unpredictable delays.
- **Shared State & Interference:** **Never** use this in `e2e`, Tests that depend on data or sessions from a previous test. Running these in parallel often leads to `race conditions` where one test modifies data another test is currently asserting.
- **Mock Network:** `non-e2e tests` Use `page.route()` to mock unstable external APIs, making the test environment deterministic.

# CI
**Workers vs. Sharding** 

In Playwright, achieving fast feedback in CI depends on how you balance **vertical scaling** (Workers) and **horizontal scaling** (Sharding).

1\. Quick Comparison Table

| Feature              | **Workers**                        | **Sharding**                                |
| -------------------- | ---------------------------------- | ------------------------------------------- |
| **Scaling**          | Vertical (one machine)             | Horizontal (multiple machines)              |
| **Scope**            | Parallelism within a single CI job | Parallelism across separate CI jobs         |
| **Resource Usage**   | Shared CPU/RAM on one agent        | Distributed across multiple agents          |
| **Setup Complexity** | Low (one config line)              | Moderate (requires CI matrix/orchestration) |
| **Reporting**        | Single consolidated report         | Multiple reports (must be merged)           |

2\. Workers (Vertical Parallelism)

Options

- **Default:** Playwright tries to use available CPU cores automatically.
- **Manual Config:** Set in `playwright.config.ts` or via CLI `--workers=N`.
- **`fullyParallel`:** Controls whether tests within the same file can run in parallel (default is file-level parallelism).

Pros & Cons

- **Pros:**

  - Zero-config setup; works out of the box.
  - Efficient for small-to-medium suites (100–600 tests).
  - No need to merge reports.

- **Cons:**

  - **Resource Contention:** Overloading a single machine leads to CPU/memory exhaustion, causing flaky timeouts.
  - **Upper Limit:** Limited by the hardware of your CI runner (e.g., standard GitHub runners only have 2–4 cores).


3\. Sharding (Horizontal Parallelism)

Sharding splits your test suite into smaller parts, each running as a completely separate job in your CI environment.

Options

- **Native Sharding:** Use `--shard=x/y` (e.g., `--shard=1/4`) to run the first of four shards.
- **CI Matrix:** Leverage tools like GitHub Actions Strategy Matrix to spin up multiple agents automatically.


Pros & Cons

- **Pros:**

  - **Unlimited Scaling:** Can reduce a 60-minute suite to 5 minutes by adding more machines.
  - **Isolation:** Tests on one shard cannot impact the CPU/RAM of another.

- **Cons:**

  - **Imbalance:** Tests are split alphabetically by default. If one shard gets all the "heavy" tests, it will finish much later than others, bottlenecking the total run time.
  - **Complex Reporting:** Requires a post-execution step to merge blob reports into one HTML file.

4\. Decision Matrix: Which one to choose?

Choose **Workers** When:

- Your total suite runs in **under 10–15 minutes** on a single machine.
- You are optimizing for **simplicity** and low maintenance.
- You have a powerful **self-hosted runner** with many CPU cores.
- You want easy local debugging that mirrors your CI environment.

Choose **Sharding** When:

- Your suite exceeds **500+ tests** or takes **30+ minutes** to run.
- You are hitting "Out of Memory" or timeout errors on a single CI runner.
- You use a CI provider with **cheap, small runners** (e.g., many standard 2-core agents).
- You need to test across **multiple browsers/projects** simultaneously.

💡 The Enterprise "Sweet Spot"

For large-scale applications, the most efficient setup is often **Sharding + Workers**:

1. **Shard** across 5–10 machines to provide horizontal capacity.
2. On each machine, use **2–4 Workers** to maximize that specific agent's CPU.
3. Use **Playwright Merge Reports** to provide a single view for the team.

# Agent
The `seed.spec.ts` file is a critical component of the Playwright Agent workflow, acting as the "foundation" or blueprint for the other agents. It is typically created when you run `npx playwright init-agents`.


| Agent            | **Input**                                                                     | **Output**                                                             |
| ---------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Planner**   | High-level goals, **`seed.spec.ts`** (for app state/context), & Optional PRDs | Structured **Markdown Test Plans** (.md) with specific scenarios       |
| **Generator** | Markdown plans & **`seed.spec.ts`** (to inherit fixtures/setup logic)         | Executable **Playwright Test Scripts** (.spec.ts) that reuse seed code |
| **Healer**    | Failing tests, Trace files, & **`seed.spec.ts`** (to re-verify setup state)   | **Code Patches**, repaired selectors, or updated assertions            |

**Role of `seed.spec.ts`**

- **Initialization:** It provides a ready-to-use page context (e.g., login state, database setup) so agents don't start from a blank page.
- **Few-Shot Learning:** It acts as a "Rosetta Stone," teaching the AI your project's specific coding style, [custom fixtures](https://playwright.dev/docs/test-agents), and locator conventions.
- **Inheritance:** The Generator Agent copies the setup logic from the seed file directly into every newly generated test to ensure consistency.


# Assertions
Playwright assertions are built on the `expect` library, featuring **auto-retrying** capabilities that wait for conditions to be met before failing. This eliminates the need for manual timeouts.

| Category       | Method                                               | Description                                        |
| -------------- | ---------------------------------------------------- | -------------------------------------------------- |
| **Visibility** | `.toBeVisible()`                | Element is visible in the viewport. Docs           |
| **State**      | `.toBeEnabled()`                | Control is not disabled.                           |
| **Value**      | `.toHaveValue(value)`           | Input element has the specified value.             |
| **Text**       | `.toContainText(text)`          | Element contains specific text (substring).        |
| **Count**      | `.toHaveCount(number)`          | List or locator matches exactly *n* elements.      |
| **URL/Title**  | `await expect(page).toHaveURL(url)`                  | Current page URL matches the string or regex. Docs |
| **Attribute**  | `.toHaveAttribute(name, value)` | Element has a specific HTML attribute and value.   |
| **Negation**   | `.not.toBeVisible()`            | Asserts the inverse (element is hidden).           |
| **Styling**    | `.toHaveClass('name')`            | Ensures the element has the specified CSS class(es).                  |
| **Visuals**    | `.toHaveCSS('property', 'value')` | Verifies a specific computed CSS property (e.g., `color`, `display`). |
| **Attributes** | `.toHaveId('id')`                 | Confirms the element matches a specific element ID.                   |

**Pro Tips for these Assertions:**

- **Soft Assertions:** Use `await expect.soft(locator).toBeVisible()` to allow the test to continue even if the assertion fails, as detailed on Playwright's guide to soft assertions.
- **Regex Support:** Both `toHaveClass` and `toHaveCSS` support Regular Expressions. For example, `.toHaveClass(/selected/)` matches any class string containing "selected".
- **Array Matching:** If an element has multiple classes, you can pass an array to check for all of them exactly: `.toHaveClass(['btn', 'btn-primary'])`.
- **Auto-Retry:** Methods like `toBeVisible()` will retry for up to 5 seconds (default) until the condition passes.

-------------------------------------
## old Playwright BK
### Difficulty: 
1. from dev: no test-data or element ID , *reusable element*-> easy to solve at dev phase 
1. flaky tests
  - change some to unit tests. 
  - could be server problem. 
  - use Retries
1. debug in CI env -> take screenshot and video for future. 
1. *tech chanllenge*: 
1. *cultrue chanllenge*:
  - some QA do not used to write code even framework is ready. 
  - not focus on fixing tests, instead of just re-run
  - we do not calculate test coverage for playwright, which sometimes coverage is not full. ( coverage belongs to unit tests)

### Pros Cons
## Pros: 
1. faster than cypress

## Cons: 
1. a lot of wait for element because too fast, api can not catch up

# Topic to learn: 
1. browser contexts for auth user
```The playwright executes tests in isolated environments called browser contexts. This isolation model improves reproducibility and prevents cascading test failures. Tests can load existing authenticated states. This eliminates the need to authenticate in every test and speeds up test execution.
https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
https://playwright.dev/docs/auth#authenticate-with-api-request
https://playwright.dev/docs/codegen#preserve-authenticated-state
```

1. persistent context class to solve OKTA authentication
1. mock data
1. interception
1. use tracer view


 
 