# Run and Debug Guide (Java + Dev Container)

This project is configured to run inside a Dev Container, so you do not need a local Java install.

## One-time setup

1. Install Docker Desktop.
2. Install VS Code extension: `Dev Containers`.
3. Open this folder in VS Code.
4. Run `Dev Containers: Reopen in Container`.

## Run/Debug with F5

1. Open `test.java`.
2. Go to **Run and Debug**.
3. Choose `Java: Debug Current File`.
4. Press `F5`.

## Step debugging

- Set breakpoints by clicking the gutter.
- `F10`: Step Over
- `F11`: Step Into
- `Shift+F11`: Step Out
- `F5`: Continue

## Notes

- If debugging does not start, run `Dev Containers: Rebuild Container`.

## Run Data Structures and Algorithms

Run from this folder. All compiled `.class` files go to `out/`:

```bash
# Compile to out/
javac -d out DataStructuresExamples.java AlgorithmExamples.java DataStructuresAlgorithmsTest.java

# Run demos
java -cp out DataStructuresExamples
java -cp out AlgorithmExamples

# Run tests
java -cp out DataStructuresAlgorithmsTest
```

Pro tip:
- Re-run `javac -d out ...` after any source change before running classes.
