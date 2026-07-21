'use client';

import Image from 'next/image';

interface PresetModelCardProps {
  name: string;
  imageUrl: string;
  selected: boolean;
  onSelect: () => void;
}

export function PresetModelCard({
  name,
  imageUrl,
  selected,
  onSelect,
}: PresetModelCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[var(--radius-control)] border bg-surface text-left transition-colors ${
        selected
          ? 'border-ink shadow-[inset_0_0_0_1px_var(--ink)]'
          : 'border-border hover:border-border-strong'
      }`}
    >
      <div className="relative aspect-[3/4] bg-canvas">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="160px"
        />
        {selected ? (
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
              <path
                d="M2.5 6.5l2.5 2.5 4.5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : null}
      </div>
      <div className="px-2 py-2 text-center text-xs font-medium text-ink">
        {name}
      </div>
    </button>
  );
}
