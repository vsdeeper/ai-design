'use client';

import Image from 'next/image';
import { usePipelineStore } from '@/stores/pipeline-store';

export function StepPreview() {
  const resultUrl = usePipelineStore((s) => s.resultUrl);
  const generateStatus = usePipelineStore((s) => s.generateStatus);

  return (
    <div className="overflow-hidden rounded-[var(--radius-control)] bg-canvas">
      <div className="relative mx-auto flex min-h-[420px] w-full max-w-xl items-center justify-center">
        {generateStatus === 'loading' ? (
          <div className="flex flex-col items-center gap-3 text-sm text-ink-secondary">
            <div className="h-10 w-10 animate-pulse rounded-full bg-border" />
            生成中…
          </div>
        ) : resultUrl ? (
          <div className="relative aspect-[3/4] w-full max-w-md">
            <Image
              src={resultUrl.split('?')[0]}
              alt="试穿效果图"
              fill
              className="object-contain"
              sizes="480px"
              priority
            />
          </div>
        ) : (
          <p className="text-sm text-ink-muted">暂无结果</p>
        )}
      </div>
    </div>
  );
}
