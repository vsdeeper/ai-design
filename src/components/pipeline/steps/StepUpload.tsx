'use client';

import Image from 'next/image';
import { Dropzone } from '@/components/ui/Dropzone';
import { usePipelineStore } from '@/stores/pipeline-store';

export function StepUpload() {
  const setGarment = usePipelineStore((s) => s.setGarment);
  const previewUrl = usePipelineStore((s) => s.garmentPreviewUrl);
  const meta = usePipelineStore((s) => s.garmentMeta);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
      <Dropzone
        label="上传衣物图片"
        hint="上传衣物图片"
        subhint="支持 JPG、PNG 格式，单张图片，大小不超过 10MB"
        onFile={async (file) => {
          const err = await setGarment(file);
          if (err) throw new Error(err);
        }}
      />

      <div>
        <p className="mb-3 text-sm font-medium text-ink">已选择图片</p>
        {previewUrl && meta ? (
          <div className="overflow-hidden rounded-[var(--radius-control)] border border-border bg-canvas">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={previewUrl}
                alt={meta.name}
                fill
                unoptimized
                className="object-cover"
                sizes="220px"
              />
            </div>
            <div className="space-y-1 border-t border-border bg-surface px-3 py-3 text-xs text-ink-secondary">
              <p className="truncate font-medium text-ink">{meta.name}</p>
              <p>
                {meta.width} × {meta.height}
              </p>
              <p>{meta.sizeLabel}</p>
            </div>
          </div>
        ) : (
          <div className="flex aspect-[4/5] items-center justify-center rounded-[var(--radius-control)] border border-dashed border-border bg-canvas text-xs text-ink-muted">
            暂无图片
          </div>
        )}
      </div>
    </div>
  );
}
