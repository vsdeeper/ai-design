'use client';

interface NumberStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export function NumberStepper({
  label,
  value,
  min = 1,
  max = 999,
  step = 1,
  onChange,
}: NumberStepperProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-ink">{label}</span>
      <div className="flex items-center overflow-hidden rounded-[var(--radius-control)] border border-border">
        <button
          type="button"
          className="h-8 w-8 text-ink-secondary hover:bg-canvas"
          onClick={() => onChange(clamp(value - step))}
          aria-label="减少"
        >
          −
        </button>
        <input
          type="number"
          className="h-8 w-14 border-x border-border bg-surface text-center text-sm tabular-nums outline-none"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
        />
        <button
          type="button"
          className="h-8 w-8 text-ink-secondary hover:bg-canvas"
          onClick={() => onChange(clamp(value + step))}
          aria-label="增加"
        >
          +
        </button>
      </div>
    </div>
  );
}
