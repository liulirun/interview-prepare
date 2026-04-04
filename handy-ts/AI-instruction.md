# Run and Debug Guide (TypeScript + Dev Container)

This project is configured to run inside a Dev Container, so you do not need a local Node.js install.

## One-time setup

1. Install Docker Desktop.
2. Install VS Code extension: `Dev Containers`.
3. Open this folder in VS Code.
4. Run `Dev Containers: Reopen in Container`.

## Run/Debug with F5

1. Open `test.ts`.
2. Go to **Run and Debug**.
3. Choose `TypeScript: Debug Current File (ts-node)`.
4. Press `F5`.

## Step debugging

- Set breakpoints by clicking the gutter.
- `F10`: Step Over
- `F11`: Step Into
- `Shift+F11`: Step Out
- `F5`: Continue

## Notes

- `ts-node` is installed in container setup (`postCreateCommand`).
- If debugging does not start, run `Dev Containers: Rebuild Container`.
