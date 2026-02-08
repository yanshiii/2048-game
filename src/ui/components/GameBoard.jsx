import { useEffect, useRef } from "react";
import Tile from "./Tile";

export default function GameBoard({ grid }) {
  const prevGridRef = useRef(null);

  useEffect(() => {
    prevGridRef.current = grid;
  }, [grid]);

  const prevGrid = prevGridRef.current;

  return (
    <div
      className="
        grid grid-cols-4 gap-3
        p-3 rounded-xl
        bg-[var(--board-bg)]
      "
    >
      {grid.flat().map((value, i) => {
        let animationClass = "";

        if (prevGrid) {
          const prevValue = prevGrid.flat()[i];

          // Spawn: empty → value
          if (prevValue === null && value !== null) {
            animationClass = "tile-spawn";
          }

          // Merge: value doubled
          else if (
            prevValue &&
            value &&
            value === prevValue * 2
          ) {
            animationClass = "tile-merge";
          }
        }

        return (
          <Tile
            key={i}
            value={value}
            animationClass={animationClass}
          />
        );
      })}
    </div>
  );
}
