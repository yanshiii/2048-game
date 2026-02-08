export default function ModeSelectionScreen({
  selectedMode,
  onSelectMode,
  onStart,
}) {
  const modes = [
    {
      id: "relaxed",
      title: "Relaxed",
      desc: "Undo enabled · Safe spawns",
    },
    {
      id: "classic",
      title: "Classic",
      desc: "Original 2048 rules",
    },
    {
      id: "pressure",
      title: "Pressure",
      desc: "Double spawns · Swap power",
    },
  ];

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      <div
        className="
          w-[90%] max-w-xl
          rounded-2xl
          bg-black/40
          backdrop-blur-sm
          p-8
          text-center
        "
      >
        {/* Title */}
        <h1 className="text-4xl font-bold mb-2 tracking-wide">
          2048
        </h1>
        <p className="text-sm opacity-80 mb-8">
          Choose your game mode
        </p>

        {/* Mode cards */}
        <div className="grid gap-4 mb-8">
          {modes.map(mode => {
            const active = selectedMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`
                  w-full p-4 rounded-xl text-left
                  transition border
                  ${
                    active
                      ? "border-white bg-white/20"
                      : "border-white/20 bg-white/10 hover:bg-white/15"
                  }
                `}
              >
                <div className="text-lg font-semibold">
                  {mode.title}
                </div>
                <div className="text-xs opacity-80">
                  {mode.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          disabled={!selectedMode}
          className={`
            w-full py-3 rounded-xl font-semibold
            transition
            ${
              selectedMode
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-white/40 text-black/60 cursor-not-allowed"
            }
          `}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
