'use client';

import { Button } from '@/components/ui/Button';
import { STEP_TIPS, type PipelineStep } from '@/lib/pipeline/types';
import { usePipelineStore } from '@/stores/pipeline-store';

interface PipelineTipBarProps {
  extraActions?: React.ReactNode;
}

export function PipelineTipBar({ extraActions }: PipelineTipBarProps) {
  const currentStep = usePipelineStore((s) => s.currentStep);
  const canGoNext = usePipelineStore((s) => s.canGoNext);
  const goNext = usePipelineStore((s) => s.goNext);
  const generateStatus = usePipelineStore((s) => s.generateStatus);
  const regenerate = usePipelineStore((s) => s.regenerate);
  const resultUrl = usePipelineStore((s) => s.resultUrl);

  const tip = STEP_TIPS[currentStep as PipelineStep];
  const isStep6 = currentStep === 6;

  const handleSave = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl.split('?')[0];
    a.download = 'fitbench-tryon-result.svg';
    a.click();
  };

  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-2 text-sm text-ink-secondary">
        {isStep6 && generateStatus === 'success' ? (
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        ) : (
          <BulbIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
        )}
        <span>
          {isStep6 && generateStatus === 'loading'
            ? '正在生成试穿效果图…'
            : isStep6 && generateStatus === 'error'
              ? '生成失败，请重试'
              : tip}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {isStep6 ? (
          <>
            <Button
              variant="outline"
              onClick={() => void regenerate()}
              disabled={generateStatus === 'loading'}
            >
              <RefreshIcon className="h-4 w-4" />
              重新生成
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={generateStatus !== 'success' || !resultUrl}
            >
              <DownloadIcon className="h-4 w-4" />
              保存
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={goNext} disabled={!canGoNext()}>
              下一步
              <ArrowIcon className="h-4 w-4" />
            </Button>
            {extraActions}
          </>
        )}
      </div>
    </div>
  );
}

function BulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5a4.5 4.5 0 00-2.5 8.2V12h5v-2.3A4.5 4.5 0 008 1.5z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M6 13.5h4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 8.2l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13 8a5 5 0 10-1.4 3.4M13 8V4.5M13 8h-3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2v8M8 10l-3-3M8 10l3-3M3 13h10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
