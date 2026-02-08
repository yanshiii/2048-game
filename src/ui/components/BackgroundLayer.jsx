export default function BackgroundLayer({ theme }) {
  const bg =
    theme === "dark"
      ? "/backgrounds/dark.png"
      : "/backgrounds/light.jpeg";

  return (
    <div
      className="fixed inset-0 -z-20 bg-cover bg-center pointer-events-none"
      style={{ backgroundImage: `url(${bg})` }}
    />
  );
}
