'use client';

import Image from 'next/image';

interface ItemSelectCardProps {
  name: string;
  imageUrl: string;
  selected: boolean;
  onToggle: () => void;
}

export function ItemSelectCard({
  name,
  imageUrl,
  selected,
  onToggle,
}: ItemSelectCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex aspect-square flex-col overflow-hidden rounded-[var(--radius-control)] border bg-surface transition-colors ${
        selected
          ? 'border-ink shadow-[inset_0_0_0_1px_var(--ink)]'
          : 'border-border hover:border-border-strong'
      }`}
    >
      <span
        className={`absolute top-2 left-2 z-10 flex h-4 w-4 items-center justify-center rounded border ${
          selected
            ? 'border-ink bg-ink text-white'
            : 'border-border-strong bg-white'
        }`}
        aria-hidden
      >
        {selected ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path
              d="M2.5 6.5l2.5 2.5 4.5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <div className="relative flex-1 bg-canvas">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-3"
          sizes="120px"
        />
      </div>
      <div className="border-t border-border px-2 py-2 text-center text-xs text-ink">
        {name}
      </div>
    </button>
  );
}
