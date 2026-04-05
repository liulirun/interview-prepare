/**
 * Q17) Number of Islands
 *
 * AI-BEST:
 * Flood-fill using DFS/BFS and mark visited land.
 * Time: O(rows * cols), Space: O(rows * cols) worst case
 *
 * AI-EASY:
 * BFS with a separate visited matrix.
 * Time: O(rows * cols), Space: O(rows * cols)
 */

function numIslandsBest(grid) {
  if (!grid.length || !grid[0].length) return 0;

  // Step 1: Copy grid so demo input is not mutated.
  // Why: mutation is practical for speed, but cloning keeps examples predictable.
  const board = grid.map((row) => row.slice());
  const rows = board.length;
  const cols = board[0].length;
  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] !== "1") continue;

      // Step 2: Found new island; flood-fill to mark connected land as seen.
      islands++;
      const stack = [[r, c]];
      board[r][c] = "0";

      while (stack.length) {
        const [cr, cc] = stack.pop();
        for (const [nr, nc] of neighbors(cr, cc)) {
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
          if (board[nr][nc] !== "1") continue;
          board[nr][nc] = "0";
          stack.push([nr, nc]);
        }
      }
    }
  }

  // Step 3: Return number of flood-fills started.
  return islands;
}

function numIslandsEasy(grid) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;

  // Step 1: Track visited cells explicitly.
  // Why: easier to understand than in-place mutation for many learners.
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "1" || visited[r][c]) continue;

      // Step 2: BFS from each unseen land cell.
      islands++;
      const queue = [[r, c]];
      visited[r][c] = true;

      while (queue.length) {
        const [cr, cc] = queue.shift();
        for (const [nr, nc] of neighbors(cr, cc)) {
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
          if (grid[nr][nc] !== "1" || visited[nr][nc]) continue;
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  // Step 3: Return total connected components of land.
  return islands;
}

function neighbors(r, c) {
  return [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ];
}

function runDemo() {
  console.log("Q17: Number of Islands");
  const cases = [
    [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
  ];

  for (const grid of cases) {
    console.log(`Input: grid=${JSON.stringify(grid)}`);
    console.log("  BEST:", numIslandsBest(grid));
    console.log("  EASY:", numIslandsEasy(grid));
  }
}

runDemo();
