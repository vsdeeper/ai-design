'use client';

import { PIPELINE_STEPS, type PipelineStep } from '@/lib/pipeline/types';
import { usePipelineStore } from '@/stores/pipeline-store';

export function PipelineStepper() {
  const currentStep = usePipelineStore((s) => s.currentStep);
  const setStep = usePipelineStore((s) => s.setStep);
  const canNavigateTo = usePipelineStore((s) => s.canNavigateTo);

  return (
    <nav
      aria-label="业务流程步骤"
      className="overflow-x-auto border-b border-border px-4 py-4 sm:px-6"
    >
      <ol className="flex min-w-max items-center gap-1 sm:gap-2">
        {PIPELINE_STEPS.map((item, index) => {
          const active = item.step === currentStep;
          const done = item.step < currentStep;
          const clickable = canNavigateTo(item.step);

          return (
            <li key={item.step} className="flex items-start gap-1 sm:gap-2">
              {index > 0 ? (
                <span className="px-1 mt-0.5 text-ink-muted" aria-hidden>
                  ›
                </span>
              ) : null}
              <button
                type="button"
                disabled={!clickable}
                onClick={() => setStep(item.step as PipelineStep)}
                className={`flex flex-col items-center gap-1.5 rounded-md px-1 py-1 transition-opacity ${
                  clickable
                    ? 'cursor-pointer hover:opacity-80'
                    : 'cursor-not-allowed opacity-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      active || done
                        ? 'bg-ink text-white'
                        : 'bg-border text-ink-secondary'
                    }`}
                  >
                    {item.step}
                  </span>
                  <span
                    className={`whitespace-nowrap text-xs sm:text-sm ${
                      active
                        ? 'font-semibold text-ink'
                        : 'font-medium text-ink-secondary'
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
                <span
                  className={`h-0.5 w-full rounded-full ${
                    active ? 'bg-ink' : 'bg-transparent'
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
