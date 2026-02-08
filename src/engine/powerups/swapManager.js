export function createSwapManager() {
  let moves = 0;
  let available = false;

  return {
    registerMove() {
      moves++;
      if (moves % 25 === 0) available = true;
    },

    canSwap() {
      return available;
    },

    useSwap(grid, a, b) {
      if (!available) return grid;
      available = false;

      const newGrid = grid.map(r => r.slice());
      [newGrid[a.r][a.c], newGrid[b.r][b.c]] =
        [newGrid[b.r][b.c], newGrid[a.r][a.c]];
      return newGrid;
    },
  };
}
