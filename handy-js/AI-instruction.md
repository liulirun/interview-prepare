# Run and Debug Guide (JavaScript + Dev Container)

This project is configured to run inside a Dev Container, so you do not need a local Node.js install.

## One-time setup

1. Install Docker Desktop.
2. Install VS Code extension: `Dev Containers`.
3. Open this folder in VS Code.
4. Run `Dev Containers: Reopen in Container`.

## Run/Debug with F5

1. Open any `.js` file (for example `try.js`).
2. Go to **Run and Debug**.
3. Choose `JavaScript: Debug Current File`.
4. Press `F5`.

## Step debugging

- Set breakpoints by clicking the gutter.
- `F10`: Step Over
- `F11`: Step Into
- `Shift+F11`: Step Out
- `F5`: Continue

## Notes

- Node.js is installed in container setup (`postCreateCommand` runs `npm install`).
- Run tests with `npm test`.
- If debugging does not start, run `Dev Containers: Rebuild Container`.

## Run Data Structures and Algorithms

Run from this folder:

```bash
npm install

# Run standard sample entry
npm run run

# Run data structure / algorithm tests
npm test

# Optional: run files directly
node data_structures.js
node algorithms.js
```

Pro tip:
- Use `node --test tests/ds_algo.test.js --test-name-pattern "binary search"` to run one test by name.
