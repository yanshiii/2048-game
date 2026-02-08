import { useState } from "react";

import BackgroundLayer from "./ui/components/BackgroundLayer";
import OverlayLayer from "./ui/components/OverlayLayer";
import ModeSelectionScreen from "./ui/screens/ModeSelectionScreen";
import GameScreen from "./ui/screens/GameScreen";
import Toolbar from "./ui/components/Toolbar";
import SettingsToggle from "./ui/components/SettingsToggle";


import { useGameEngine } from "./hooks/useGameEngine";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [screen, setScreen] = useState("mode");
  const [selectedMode, setSelectedMode] = useState(null);

  const game = useGameEngine(); // ✅ SINGLE SOURCE

  const toggleTheme = () =>
    setTheme(t => (t === "dark" ? "light" : "dark"));

  const startGame = () => {
    game.startGame(selectedMode);
    setScreen("game");
  };

  return (
    <div
      data-theme={theme}
      className="w-full h-[var(--app-height)] overflow-hidden"
    >
      <BackgroundLayer theme={theme} />
      <OverlayLayer blur={screen === "game"} />

      <Toolbar
        mode={game.mode}
        onModeChange={(newMode) => {
          game.startGame(newMode);
          setScreen("game");
        }}
        settingsToggle={
          <SettingsToggle
            theme={theme}
            toggleTheme={toggleTheme}
            muted={game.muted}
            toggleMute={game.toggleMute}
          />
        }
      />

      {screen === "mode" && (
        <ModeSelectionScreen
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStart={startGame}
        />
      )}

      {screen === "game" && (
        <GameScreen game={game} />
      )}
    </div>
  );
}
