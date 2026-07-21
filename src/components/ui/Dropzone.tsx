'use client';

import { useId, useRef, useState, type DragEvent } from 'react';

interface DropzoneProps {
  label?: string;
  hint: string;
  subhint: string;
  onFile: (file: File) => void | Promise<void>;
  className?: string;
  icon?: 'upload' | 'image';
}

export function Dropzone({
  label,
  hint,
  subhint,
  onFile,
  className = '',
  icon = 'upload',
}: DropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try {
      await onFile(file);
    } catch (e) {
      setError(e instanceof Error ? e.message : '上传失败');
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className={className}>
      {label ? (
        <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-ink">
          <span>{label}</span>
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-strong text-[10px] text-ink-secondary"
            title="说明"
          >
            i
          </span>
        </div>
      ) : null}
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[var(--radius-control)] border border-dashed px-6 text-center transition-colors ${
          dragging
            ? 'border-accent bg-accent-soft'
            : 'border-border-strong bg-canvas/60 hover:border-accent hover:bg-accent-soft/40'
        }`}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        {icon === 'upload' ? (
          <UploadIcon className="mb-3 h-10 w-10 text-accent" />
        ) : (
          <ImageIcon className="mb-3 h-10 w-10 text-ink-muted" />
        )}
        <p className="text-sm font-medium text-ink">{hint}</p>
        <p className="mt-2 max-w-xs text-xs leading-5 text-ink-secondary">
          {subhint}
        </p>
        {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}
      </label>
    </div>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 8v16M20 8l-5 5M20 8l5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 26v4a2 2 0 002 2h16a2 2 0 002-2v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="28"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="15" cy="16" r="2.5" fill="currentColor" />
      <path
        d="M6 26l8-7 6 5 5-4 9 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
