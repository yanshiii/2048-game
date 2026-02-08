export default function Toolbar({
  mode,
  onModeChange,
  settingsToggle,
}) {
  return (
    <div className="fixed top-4 left-4 right-4 z-30 flex justify-between items-center">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold tracking-wide">
          2048
        </div>

        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
          className="
            bg-black/30 text-white
            rounded-lg px-2 py-1
            text-sm
            outline-none
          "
        >
          <option value="relaxed">Relaxed</option>
          <option value="classic">Classic</option>
          <option value="pressure">Pressure</option>
        </select>
      </div>

      {/* Right side */}
      {settingsToggle}
    </div>
  );
}
