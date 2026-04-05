"""
Q17) Number of Islands

AI-BEST:
- Scan the grid and flood-fill each new island with DFS/BFS.
- Time: O(rows * cols), Space: O(rows * cols) worst case

AI-EASY:
- Assign island labels manually and merge equivalent labels with union-find.
- Time: about O(rows * cols * alpha(n)), Space: O(rows * cols)
"""


def number_of_islands_best(grid: list[list[str]]) -> int:
    if not grid or not grid[0]:
        return 0

    rows = len(grid)
    cols = len(grid[0])
    islands = 0

    # Step 1: Scan every cell in the grid.
    # Why: We need to discover each island exactly once.
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1":
                continue

            # Step 2: When land appears, flood-fill it and mark the whole island visited.
            # Why: This prevents counting the same island multiple times.
            islands += 1
            stack = [(r, c)]
            grid[r][c] = "0"
            while stack:
                row, col = stack.pop()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr = row + dr
                    nc = col + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1":
                        grid[nr][nc] = "0"
                        stack.append((nr, nc))

    # Step 3: Return the total count after the full scan.
    # Why: Every land mass has now been visited and counted once.
    return islands


def number_of_islands_easy(grid: list[list[str]]) -> int:
    if not grid or not grid[0]:
        return 0

    rows = len(grid)
    cols = len(grid[0])
    labels = [[0] * cols for _ in range(rows)]
    parent: dict[int, int] = {}
    next_label = 1

    def find(label: int) -> int:
        while parent[label] != label:
            parent[label] = parent[parent[label]]
            label = parent[label]
        return label

    def union(a: int, b: int) -> None:
        root_a = find(a)
        root_b = find(b)
        if root_a != root_b:
            parent[root_b] = root_a

    # Step 1: Assign a label to each land cell, looking only at already-seen neighbors.
    # Why: A row-major scan can reuse labels from the top and left without extra traversal logic.
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1":
                continue

            neighbors = []
            if r > 0 and labels[r - 1][c] > 0:
                neighbors.append(labels[r - 1][c])
            if c > 0 and labels[r][c - 1] > 0:
                neighbors.append(labels[r][c - 1])

            if not neighbors:
                labels[r][c] = next_label
                parent[next_label] = next_label
                next_label += 1
            else:
                labels[r][c] = min(neighbors)
                for label in neighbors:
                    union(labels[r][c], label)

    # Step 2: Merge equivalent labels with union-find.
    # Why: Two scan paths can describe the same island, so we need a cheap way to collapse them.
    roots: set[int] = set()
    for r in range(rows):
        for c in range(cols):
            if labels[r][c] > 0:
                roots.add(find(labels[r][c]))

    # Step 3: Count the unique final roots.
    # Why: Each root represents one island after all merges are resolved.
    return len(roots)


def run_demo() -> None:
    print("Q17: Number of Islands")
    samples = [
        [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
        ],
        [["1", "0", "1", "0"], ["0", "1", "0", "1"]],
        [["0", "0"], ["0", "0"]],
    ]
    for grid in samples:
        print(f"Input: grid={grid}")
        best_grid = [row[:] for row in grid]
        easy_grid = [row[:] for row in grid]
        print("  BEST:", number_of_islands_best(best_grid))
        print("  EASY:", number_of_islands_easy(easy_grid))


if __name__ == "__main__":
    run_demo()
