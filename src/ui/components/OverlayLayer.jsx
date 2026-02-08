export default function OverlayLayer({ blur = false }) {
  return (
    <div
      className={`
        fixed inset-0 -z-10
        bg-black/45
        ${blur ? "backdrop-blur-[6px]" : ""}
        pointer-events-none
      `}
    />
  );
}
