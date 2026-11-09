type HausyMarkProps = {
  className?: string;
};

export function HausyMark({ className }: HausyMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 56"
      fill="none"
      className={className}
    >
      <rect x="3" y="3" width="50" height="50" stroke="currentColor" strokeWidth="4" />
      <path d="M14 43V18L22 13V27H43V43H35V33H22V43H14Z" fill="currentColor" />
      <path d="M37 12L46 12L41.5 20L37 12Z" className="fill-brand-lime" />
    </svg>
  );
}