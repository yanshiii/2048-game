export default {
  allowUndo: false,

  getSpawnCount() {
    return Math.random() < 0.13 ? 2 : 1;
  },
};
