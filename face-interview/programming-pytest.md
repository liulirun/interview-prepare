To achieve environment-specific test execution in CI, the best approach is to combine a solid **folder structure** with **Pytest Markers**. This gives you the flexibility to run tests by directory or by "type" regardless of where the files live.

Here are the three most effective ways to set this up:

2\. The Custom Marker Approach (Most Flexible)

Sometimes an integration test lives near a unit test, or you want to run "smoke tests" across multiple folders. Pytest markers allow you to tag tests metadata.

**Step A: Register markers in `pytest.ini`**

```ini
[pytest]
markers =
    unit: Quick unit tests
    integration: Heavier integration tests
    stage: Tests specifically for the staging environment
```

**Step B: Tag your tests**

```python
import pytest

@pytest.mark.unit
def test_simple_logic():
    assert 1 + 1 == 2

@pytest.mark.integration
def test_database_connection():
    # ... code ...
```

**Step C: Run via CI Flags**

- **Dev:** `pytest -m unit`
- **Stage:** `pytest -m integration`
- **Combined:** `pytest -m "unit or integration"`

3\. Using Environment Variables in CI

If you want the logic to be "baked in" to your test suite, you can use an environment variable (e.g., `ENV_NAME`) to decide which tests to skip or include.

**Example `conftest.py` logic:**\
You can use the `pytest_collection_modifyitems` hook to automatically skip integration tests if the environment isn't "stage".

```python
# conftest.py
import pytest
import os

def pytest_collection_modifyitems(config, items):
    env = os.getenv("RUN_ENV", "dev")

    if env == "dev":
        skip_int = pytest.mark.skip(reason="Integration tests only run on Stage")
        for item in items:
            if "integration" in item.keywords:
                item.add_marker(skip_int)
```

Summary Table for CI Configuration

| Environment    | Intent          | Suggested CI Command                                  |
| -------------- | --------------- | ----------------------------------------------------- |
| **Dev**        | Fast feedback   | `pytest tests/unit` or `pytest -m unit`               |
| **Stage**      | Validate system | `pytest tests/integration` or `pytest -m integration` |
| **Prod/Final** | Sanity check    | `pytest -m smoke`                                     |

**Which CI tool are you using (GitHub Actions, GitLab CI, Jenkins)?** I can provide the specific YAML configuration for your pipeline if you'd like.

## fixtures vs hooks
While **fixtures** focus on setting up resources for your test cases, ***hooks** are used to change or extend how the [Pytest framework](https://docs.pytest.org/en/stable/how-to/writing_hook_functions.html) itself works*.

Key Differences

| Feature          | Pytest Fixtures                                                 | Pytest Hooks                                                                         |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Primary Goal** | **Arrange** test data and resources (DB, APIs, files).          | **Customize** the testing lifecycle (collection, execution, reporting).              |
| **Invocation**   | Explicitly requested as a **test argument** (or via `autouse`). | Invoked **automatically** by the framework at specific lifecycle points.             |
| **Scope**        | Controlled by the `scope` parameter (function, session, etc.).  | Global impact on the entire test suite behavior.                                     |
| **Definition**   | Standard functions with `@pytest.fixture`.                      | Specifically named functions starting with `pytest_` (e.g., `pytest_runtest_setup`). |

When to Use Each

Use **Fixtures** for:

- Providing mock data or database connections to your tests.
- Setting up specific preconditions (like logging in a user) for a set of tests.
- Cleaning up resources after a test finishes using `yield`.
Use **Hooks** for:

- **Adding Command Line Options:** Use `pytest_addoption` to add custom flags like `pytest --my-flag`.
- **Modifying Test Collection:** Use `pytest_collection_modifyitems` to skip or reorder tests dynamically.
- **Custom Reporting:** Use `pytest_runtest_makereport` to send results to a database or external tool after each test.
- **Global Setup/Teardown:** Use `pytest_sessionstart` and `pytest_sessionfinish` for tasks that must happen before or after the entire test suite.


If you are unsure which to use, **start with a fixture**. Only use hooks if you need to access internal Pytest objects (like `config`, `item`, or `report`) or if you need to modify how Pytest discovers or runs your files.
