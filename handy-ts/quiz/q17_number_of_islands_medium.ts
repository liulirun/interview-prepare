/**
 * Q17) Number of Islands
 *
 * AI-BEST:
 * Flood fill from each unvisited land cell.
 * Time: O(rows * cols), Space: O(rows * cols) worst case
 *
 * AI-EASY:
 * Assign provisional island IDs and merge touching land with union-find.
 * Time: O(rows * cols * alpha(n)), Space: O(rows * cols)
 */

function numIslandsBest(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function floodFill(row: number, col: number): void {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (grid[row][col] !== "1") return;

    grid[row][col] = "0";
    floodFill(row + 1, col);
    floodFill(row - 1, col);
    floodFill(row, col + 1);
    floodFill(row, col - 1);
  }

  // Step 1: Scan every cell because any land cell could begin a new island.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== "1") continue;

      // Step 2: Count the island and flood fill it because we must mark the whole connected component as visited.
      islands++;
      floodFill(row, col);
    }
  }

  // Step 3: Return the total because every island has now been counted exactly once.
  return islands;
}

function numIslandsEasy(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const totalCells = rows * cols;
  const uf = new UnionFind(totalCells);
  const land = new Array<boolean>(totalCells).fill(false);

  // Step 1: Assign a provisional ID to each land cell because the easy approach needs explicit bookkeeping before merging.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        const id = row * cols + col;
        land[id] = true;
        uf.activate(id);
      }
    }
  }

  // Step 2: Merge touching land cells because neighboring pieces can belong to the same island.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== "1") continue;
      const id = row * cols + col;
      if (row + 1 < rows && grid[row + 1][col] === "1") uf.union(id, (row + 1) * cols + col);
      if (col + 1 < cols && grid[row][col + 1] === "1") uf.union(id, row * cols + (col + 1));
    }
  }

  const roots = new Set<number>();
  for (let id = 0; id < totalCells; id++) {
    if (!land[id]) continue;
    roots.add(uf.find(id));
  }

  // Step 3: Count unique roots because each root represents one final island label.
  return roots.size;
}

class UnionFind {
  private readonly parent: number[];
  private readonly rank: number[];

  constructor(size: number) {
    this.parent = new Array<number>(size).fill(-1);
    this.rank = new Array<number>(size).fill(0);
  }

  activate(x: number): void {
    if (this.parent[x] === -1) this.parent[x] = x;
  }

  find(x: number): number {
    if (this.parent[x] === x) return x;
    if (this.parent[x] === -1) return -1;
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(a: number, b: number): void {
    this.activate(a);
    this.activate(b);

    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === -1 || rootB === -1 || rootA === rootB) return;

    if (this.rank[rootA] < this.rank[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;
    if (this.rank[rootA] === this.rank[rootB]) {
      this.rank[rootA]++;
    }
  }
}

function runDemo(): void {
  console.log("Q17: Number of Islands");
  const cases = [
    [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    [
      ["1", "1"],
      ["1", "1"],
    ],
    [
      ["0", "0", "0"],
    ],
  ];

  for (const grid of cases) {
    console.log("Input grid:", JSON.stringify(grid));
    const bestGrid = grid.map((row) => [...row]);
    const easyGrid = grid.map((row) => [...row]);
    console.log("  BEST:", numIslandsBest(bestGrid));
    console.log("  EASY:", numIslandsEasy(easyGrid));
  }
}

runDemo();

export {};
