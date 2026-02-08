import { TILE_PROBABILITY } from "./constants";
import { getEmptyCells } from "./grid";

function randomTileValue() {
  return Math.random() < TILE_PROBABILITY[2] ? 2 : 4;
}

export function spawnTile(grid, strategy) {
  const empty = getEmptyCells(grid);
  if (!empty.length) return grid;

  const cell = strategy.chooseSpawnCell
    ? strategy.chooseSpawnCell(grid, empty)
    : empty[Math.floor(Math.random() * empty.length)];

  const newGrid = grid.map(r => r.slice());
  newGrid[cell.r][cell.c] = randomTileValue();
  return newGrid;
}
