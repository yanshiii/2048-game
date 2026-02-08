export default function Tile({ value, animationClass = "" }) {
  const base =
    "aspect-square rounded-lg flex items-center justify-center font-bold transition";

  if (!value) {
    return <div className={`${base} tile-empty`} />;
  }

  return (
    <div
      className={`${base} tile tile-${value} ${animationClass}`}
    >
      {value}
    </div>
  );
}
