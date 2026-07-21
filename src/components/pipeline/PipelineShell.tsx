'use client';

import { PipelineStepper } from '@/components/pipeline/PipelineStepper';
import { PipelineTipBar } from '@/components/pipeline/PipelineTipBar';

interface PipelineShellProps {
  children: React.ReactNode;
  extraActions?: React.ReactNode;
}

export function PipelineShell({ children, extraActions }: PipelineShellProps) {
  return (
    <section className="mx-auto w-full max-w-[1100px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card)]">
      <PipelineStepper />
      <div className="min-h-[420px] px-4 py-5 sm:px-6 sm:py-6">{children}</div>
      <PipelineTipBar extraActions={extraActions} />
    </section>
  );
}
