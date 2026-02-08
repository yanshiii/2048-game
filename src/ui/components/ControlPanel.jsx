export default function ControlPanel({
  mode,
  onUndo,
  onRestart,
  onSwap,
  canSwap,
}) {
  return (
    <div className="flex gap-3 mt-4">
      {mode === "relaxed" && (
        <button
          onClick={onUndo}
          className="flex-1 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
        >
          Undo
        </button>
      )}

      {mode === "pressure" && (
        <button
          onClick={onSwap}
          disabled={!canSwap}
          className={`
            flex-1 py-2 rounded-lg transition
            ${
              canSwap
                ? "bg-white/20 hover:bg-white/30"
                : "bg-white/10 opacity-50 cursor-not-allowed"
            }
          `}
        >
          Swap
        </button>
      )}

      <button
        onClick={onRestart}
        className="flex-1 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
      >
        Restart
      </button>
    </div>
  );
}
