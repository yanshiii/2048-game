import { createEmptyGrid } from "./grid";
import { spawnTile } from "./spawn";
import { createInitialState } from "./state";
import { moveGrid } from "./moveExecutor";
import { createUndoManager } from "./undo/undoManager";
import { createSwapManager } from "./powerups/swapManager";
import { hasValidMove } from "./gameOver";


export class GameEngine {
  constructor(strategy) {
    this.strategy = strategy;
    this.grid = createEmptyGrid();
    this.state = createInitialState();

    this.undoManager = strategy.allowUndo
      ? createUndoManager(strategy.undoLimit)
      : null;

    this.swapManager = createSwapManager();

    this.grid = spawnTile(this.grid, strategy);
    this.grid = spawnTile(this.grid, strategy);
  }

  move(direction) {
    if (this.state.gameOver) return;

    if (this.undoManager) {
      this.undoManager.push({
        grid: this.grid.map(r => r.slice()),
        state: { ...this.state },
      });
    }

    const { grid: newGrid, scoreGained } =
      moveGrid(this.grid, direction);

    // Detect no-op move
    if (JSON.stringify(newGrid) === JSON.stringify(this.grid)) return;

    this.grid = newGrid;
    this.state.score += scoreGained;
    this.state.moves++;

    const spawnCount = this.strategy.getSpawnCount();
    for (let i = 0; i < spawnCount; i++) {
      this.grid = spawnTile(this.grid, this.strategy);
    }

    this.swapManager.registerMove();
    this.checkWinCondition();

    if (!hasValidMove(this.grid)) {
      this.state.gameOver = true;
    }
  }

  undo() {
    if (!this.undoManager) return;
    const prev = this.undoManager.undo();
    if (prev) {
      this.grid = prev.grid;
      this.state = prev.state;
    }
  }

  checkWinCondition() {
    if (this.state.hasWon) return;

    for (const row of this.grid) {
      for (const value of row) {
        if (value === 2048) {
          this.state.hasWon = true;
          return;
        }
      }
    }
  }

}
