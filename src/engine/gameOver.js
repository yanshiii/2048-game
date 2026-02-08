import { GRID_SIZE } from "./constants";

export function hasValidMove(grid) {
  // Any empty cell?
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === null) return true;
    }
  }

  // Horizontal merges
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 1; c++) {
      if (grid[r][c] === grid[r][c + 1]) return true;
    }
  }

  // Vertical merges
  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 1; r++) {
      if (grid[r][c] === grid[r + 1][c]) return true;
    }
  }

  return false;
}
