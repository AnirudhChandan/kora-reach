type Props = {
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
};

export default function WaveDivider({
  from = "var(--color-brand-warmNeutral)",
  to = "#ffffff",
  flip = false,
  className = "",
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{
        backgroundColor: from,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[60px] lg:h-[80px] block"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
