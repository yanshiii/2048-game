import { GRID_SIZE } from "./constants";

export function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(null)
  );
}

export function cloneGrid(grid) {
  return grid.map(row => row.slice());
}

export function getEmptyCells(grid) {
  const cells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === null) {
        cells.push({ r, c });
      }
    }
  }
  return cells;
}
