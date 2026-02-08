import { useRef, useState, useCallback, useEffect } from "react";
import { GameEngine } from "../engine/GameEngine";

import classic from "../engine/strategies/classic";
import relaxed from "../engine/strategies/relaxed";
import pressure from "../engine/strategies/pressure";

const STRATEGY_MAP = {
  classic,
  relaxed,
  pressure,
};

export function useGameEngine() {
  const engineRef = useRef(null);
  const prevScoreRef = useRef(0); // ✅ HERE

  /* ---------- State ---------- */
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [mode, setMode] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("bestScore");
    return saved ? Number(saved) : 0;
  });

  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem("muted");
    return saved === "true";
  });

  /* ---------- Sounds ---------- */
  const soundsRef = useRef({
    start: new Audio("/sounds/start.wav"),
    merge: new Audio("/sounds/merge.wav"),
    win: new Audio("/sounds/win.wav"),
    gameover: new Audio("/sounds/gameover.wav"),
  });

  const playSound = useCallback(
    (name) => {
      if (muted) return;
      const sound = soundsRef.current[name];
      if (!sound) return;

      sound.currentTime = 0;
      sound.volume = 0.4;
      sound.play().catch(() => {});
    },
    [muted]
  );

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      localStorage.setItem("muted", !prev);
      return !prev;
    });
  }, []);

  const dismissWin = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.state.hasWon = false;
    setHasWon(false);
  }, []);

  /* ---------- Sync from engine ---------- */
  const syncFromEngine = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    setGrid(engine.grid.map(row => row.slice()));
    setScore(engine.state.score);
    setMoves(engine.state.moves);
    setGameOver(engine.state.gameOver);
    setHasWon(engine.state.hasWon);

    // 🔊 Merge sound
    if (engine.state.score > prevScoreRef.current) {
      playSound("merge");
    }
    prevScoreRef.current = engine.state.score;

    // 🔊 Win sound (once)
    if (engine.state.hasWon && !hasWon) {
      playSound("win");
    }

    // 🔊 Game over sound (once)
    if (engine.state.gameOver && !gameOver) {
      playSound("gameover");
    }

    // 🏆 Best score
    setBestScore(prevBest => {
      if (engine.state.score > prevBest) {
        localStorage.setItem("bestScore", engine.state.score);
        return engine.state.score;
      }
      return prevBest;
    });
  }, [playSound, hasWon, gameOver]);

  /* ---------- Start / Restart ---------- */
  const startGame = useCallback((selectedMode) => {
    const strategy = STRATEGY_MAP[selectedMode];
    if (!strategy) throw new Error("Invalid game mode");

    engineRef.current = new GameEngine(strategy);
    prevScoreRef.current = 0;
    setMode(selectedMode);
    playSound("start");
  }, [playSound]);

  const restartGame = useCallback(() => {
    if (!mode) return;

    engineRef.current = new GameEngine(STRATEGY_MAP[mode]);
    prevScoreRef.current = 0;
    syncFromEngine();
  }, [mode, syncFromEngine]);

  /* ---------- Moves ---------- */
  const move = useCallback((direction) => {
    if (!engineRef.current) return;
    engineRef.current.move(direction);
    syncFromEngine();
  }, [syncFromEngine]);

  const undo = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.undo();
    syncFromEngine();
  }, [syncFromEngine]);

  const swap = useCallback((a, b) => {
    const engine = engineRef.current;
    if (!engine?.swapManager?.canSwap()) return;

    engine.grid = engine.swapManager.useSwap(engine.grid, a, b);
    syncFromEngine();
  }, [syncFromEngine]);

  useEffect(() => {
    if (!engineRef.current) return;
    syncFromEngine();
  }, [mode, syncFromEngine]);

  return {
    // state
    grid,
    score,
    moves,
    mode,
    gameOver,
    hasWon,
    bestScore,
    muted,

    // actions
    startGame,
    restartGame,
    dismissWin,
    move,
    undo,
    swap,
    toggleMute,
  };
}
