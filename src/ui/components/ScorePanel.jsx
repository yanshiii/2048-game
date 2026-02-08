export default function ScorePanel({ score, bestScore, moves }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <div className="text-xs opacity-70">Score</div>
        <div className="text-xl font-bold">{score}</div>
      </div>

      <div className="text-center">
        <div className="text-xs opacity-70">Best</div>
        <div className="text-xl font-bold">
          {bestScore}
        </div>
      </div>

      <div className="text-right">
        <div className="text-xs opacity-70">Moves</div>
        <div className="text-xl font-bold">{moves}</div>
      </div>
    </div>
  );
}
