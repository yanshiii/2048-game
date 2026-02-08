import { slideRowLeft, reverseRow, transpose } from "./movement";
import { mergeRowLeft } from "./merge";

export function moveGrid(grid, direction) {
  let workingGrid = grid.map(row => row.slice());
  let scoreGained = 0;

  const applyLeftMove = rows =>
    rows.map(row => {
      let slid = slideRowLeft(row);
      const merged = mergeRowLeft(slid);
      scoreGained += merged.scoreGained;
      return slideRowLeft(merged.row);
    });

  switch (direction) {
    case "left":
      workingGrid = applyLeftMove(workingGrid);
      break;

    case "right":
      workingGrid = workingGrid.map(reverseRow);
      workingGrid = applyLeftMove(workingGrid);
      workingGrid = workingGrid.map(reverseRow);
      break;

    case "up":
      workingGrid = transpose(workingGrid);
      workingGrid = applyLeftMove(workingGrid);
      workingGrid = transpose(workingGrid);
      break;

    case "down":
      workingGrid = transpose(workingGrid);
      workingGrid = workingGrid.map(reverseRow);
      workingGrid = applyLeftMove(workingGrid);
      workingGrid = workingGrid.map(reverseRow);
      workingGrid = transpose(workingGrid);
      break;

    default:
      break;
  }

  return { grid: workingGrid, scoreGained };
}
