import { useEffect, useRef } from "react";

import ScorePanel from "../components/ScorePanel";
import GameBoard from "../components/GameBoard";
import ControlPanel from "../components/ControlPanel";

export default function GameScreen({ game }) {
  const {
    grid,
    score,
    moves,
    mode,
    gameOver,
    hasWon,
    bestScore,
    move,
    undo,
    restartGame,
    dismissWin,
  } = game;

  const touchStartRef = useRef({ x: 0, y: 0 });

  /* ---------- Prevent iOS Safari rubber-band ---------- */
  useEffect(() => {
    const preventDefault = (e) => {
      if (e.touches && e.touches.length === 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  /* ---------- Keyboard controls ---------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  /* ---------- Swipe controls ---------- */
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const SWIPE_THRESHOLD = 40;

    if (Math.max(absX, absY) < SWIPE_THRESHOLD) return;

    if (absX > absY) {
      dx > 0 ? move("right") : move("left");
    } else {
      dy > 0 ? move("down") : move("up");
    }
  };

  return (
    <div className="relative z-10 h-full flex items-center justify-center px-4">
      <div
        className="
          relative
          w-full max-w-md
          rounded-2xl
          p-6
          bg-black/40
          backdrop-blur-sm
          space-y-6
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ScorePanel score={score} moves={moves} bestScore={bestScore} />

        <GameBoard grid={grid} />

        <ControlPanel
          mode={mode}
          onUndo={undo}
          onRestart={restartGame}
          onSwap={() => {}}
          canSwap={false}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-20">
            <div className="text-2xl font-bold mb-4">
              Game Over
            </div>
            <button
              onClick={restartGame}
              className="px-6 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition"
            >
              Restart
            </button>
          </div>
        )}

        {/* Win Overlay */}
        {hasWon && !gameOver && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
            <div className="text-2xl font-bold mb-3">
              You Win!
            </div>

            <div className="flex gap-3">
              <button
                onClick={restartGame}
                className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition"
              >
                Restart
              </button>

              <button
                onClick={dismissWin}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}