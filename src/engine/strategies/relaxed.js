export default {
  allowUndo: true,
  undoLimit: 3,

  getSpawnCount: () => 1,

  chooseSpawnCell(grid, emptyCells) {
    // Safe spawn: avoid adjacency to highest tile if possible
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  },
};
