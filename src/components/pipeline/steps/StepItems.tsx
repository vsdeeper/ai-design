'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ItemSelectCard } from '@/components/ui/ItemSelectCard';
import { usePipelineStore } from '@/stores/pipeline-store';

export function StepItems() {
  const previewUrl = usePipelineStore((s) => s.garmentPreviewUrl);
  const meta = usePipelineStore((s) => s.garmentMeta);
  const items = usePipelineStore((s) => s.recognizedItems);
  const selectedIds = usePipelineStore((s) => s.selectedItemIds);
  const toggleItem = usePipelineStore((s) => s.toggleItem);
  const recogStatus = usePipelineStore((s) => s.recogStatus);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div>
        <p className="mb-3 text-sm font-medium text-ink">已上传图片</p>
        <div className="overflow-hidden rounded-[var(--radius-control)] border border-border bg-canvas">
          <div className="relative aspect-[3/4]">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={meta?.name ?? '已上传图片'}
                fill
                unoptimized
                className="object-cover"
                sizes="260px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-ink-muted">
                暂无
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink">
            识别到的衣物单品（可多选）
          </p>
        </div>

        {recogStatus === 'idle' || recogStatus === 'error' ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[var(--radius-control)] border border-dashed border-border bg-canvas px-6 text-center">
            <p className="text-sm text-ink-secondary">
              {recogStatus === 'error'
                ? '识别失败，请重试'
                : '点击「开始识别」从已上传图片中提取衣物单品'}
            </p>
          </div>
        ) : recogStatus === 'loading' ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-[var(--radius-control)] bg-border/70"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((item) => (
              <ItemSelectCard
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                selected={selectedIds.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function StepItemsActions() {
  const recogStatus = usePipelineStore((s) => s.recogStatus);
  const runRecognition = usePipelineStore((s) => s.runRecognition);

  return (
    <Button
      variant="primary"
      onClick={() => void runRecognition()}
      disabled={recogStatus === 'loading'}
    >
      <PlayIcon className="h-3.5 w-3.5" />
      {recogStatus === 'loading' ? '识别中…' : '开始识别'}
    </Button>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 1.5v9l8-4.5-8-4.5z" />
    </svg>
  );
}
