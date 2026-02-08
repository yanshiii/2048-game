import { Moon, Sun, Volume2, VolumeX } from "lucide-react";

export default function SettingsToggle({
  theme,
  toggleTheme,
  muted,
  toggleMute,
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="
          min-w-[36px] min-h-[36px]
          flex items-center justify-center
          px-2 py-1 rounded-lg
          bg-black/30 text-white
          hover:bg-black/40
          transition
          text-sm
        "
        title="Toggle theme"
      >
        {theme === "dark" ? (
          <Moon size={18} />
        ) : (
          <Sun size={18} />
        )}
        <span className="hidden sm:inline">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      </button>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="
          min-w-[36px] min-h-[36px]
          flex items-center justify-center
          px-2 py-1 rounded-lg
          bg-black/30 text-white
          hover:bg-black/40
          transition
          text-sm
        "
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>
    </div>
  );
}
