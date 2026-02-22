# 2048 Game (React + Vite)

A modern, mode-based take on the classic 2048 puzzle with clean visuals, sound effects, and both keyboard and touch controls. Built with React, Tailwind CSS, and a custom game engine.

## USP / What Makes It Unique
- **Three distinct game modes** that change difficulty and mechanics instead of just cosmetic tweaks.
- **Relaxed mode includes a 3‑step undo history** (three moves) so players can recover from mistakes.
- **Mobile-first feel** with swipe support, smooth animations, and a focused single-screen experience.
- **PWA-ready** build for installable, app-like play on supported browsers.

## Functional Requirements (Implemented)
- **Core 2048 gameplay** on a 4x4 grid with merging and scoring.
- **Three game modes**
  - `Relaxed`: undo enabled (3-step history) with safe spawns.
  - `Classic`: standard 2048 rules.
  - `Pressure`: occasional double spawns for higher difficulty.
- **Move tracking** and live score + best score.
- **Undo action** in Relaxed mode (up to 3 moves).
- **Restart flow** from the game screen.
- **Win state** (2048 tile) with continue/restart options.
- **Game over detection** when no valid moves remain.
- **Keyboard controls** (arrow keys).
- **Touch controls** (swipe gestures).
- **Audio feedback** for start, merge, win, and game over.
- **Theme toggle** (dark/light).
- **Mute toggle** with persisted setting.
- **Best score persistence** using `localStorage`.

## Non‑Functional Requirements (Implemented)
- **Responsive layout** optimized for desktop and mobile.
- **Smooth UI feedback** with tile spawn/merge animations.
- **Performance** optimized through a lightweight engine and React hooks.
- **Reliability** via deterministic engine state updates and undo snapshots.
- **Maintainability** with a modular engine (movement, merge, spawn, gameover).
- **Installability** using a PWA manifest and service worker.

## Controls
- **Keyboard**: Arrow keys to move tiles.
- **Touch**: Swipe up/down/left/right to move tiles.

## Tech Stack
- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4
- **Icons**: lucide-react
- **PWA**: vite-plugin-pwa

## Project Structure (Key Paths)
- `src/engine/` — core game logic (move, merge, spawn, modes)
- `src/hooks/useGameEngine.js` — engine binding + state sync
- `src/ui/` — UI screens and components
- `src/styles/` — global + tile styling

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm (or pnpm/yarn)

### Install
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Notes
- The app registers a service worker via `vite-plugin-pwa`. In supported browsers you can install it like a native app.
- Mode selection happens on start, and can be changed from the in‑game toolbar.

## Roadmap (Optional)
- Wire the pressure‑mode swap power-up into the UI when needed.
- Add accessibility labels and reduced‑motion support.

