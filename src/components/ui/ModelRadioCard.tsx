'use client';

interface ModelRadioCardProps {
  name: string;
  description: string;
  selected: boolean;
  recommended?: boolean;
  onSelect: () => void;
}

export function ModelRadioCard({
  name,
  description,
  selected,
  recommended,
  onSelect,
}: ModelRadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[var(--radius-control)] border px-3 py-3 text-left transition-colors ${
        selected
          ? 'border-ink bg-surface shadow-[inset_0_0_0_1px_var(--ink)]'
          : 'border-border bg-surface hover:border-border-strong'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            selected ? 'border-ink bg-ink' : 'border-border-strong'
          }`}
          aria-hidden
        >
          {selected ? (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          ) : null}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ink">{name}</span>
            {recommended ? (
              <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-medium text-white">
                Recommended
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-5 text-ink-secondary">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
