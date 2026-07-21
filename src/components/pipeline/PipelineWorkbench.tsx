'use client';

import { AddPipelineBar } from '@/components/pipeline/AddPipelineBar';
import { PipelinePageHeader } from '@/components/pipeline/PipelinePageHeader';
import { PipelineShell } from '@/components/pipeline/PipelineShell';
import {
  StepItems,
  StepItemsActions,
} from '@/components/pipeline/steps/StepItems';
import { StepModel } from '@/components/pipeline/steps/StepModel';
import { StepPreview } from '@/components/pipeline/steps/StepPreview';
import { StepRecogModel } from '@/components/pipeline/steps/StepRecogModel';
import { StepTryonModel } from '@/components/pipeline/steps/StepTryonModel';
import { StepUpload } from '@/components/pipeline/steps/StepUpload';
import { usePipelineStore } from '@/stores/pipeline-store';

export function PipelineWorkbench() {
  const currentStep = usePipelineStore((s) => s.currentStep);

  return (
    <div className="flex flex-1 flex-col bg-canvas pb-12">
      <PipelinePageHeader />
      <div className="px-4 sm:px-6">
        <PipelineShell
          extraActions={currentStep === 3 ? <StepItemsActions /> : undefined}
        >
          {currentStep === 1 ? <StepUpload /> : null}
          {currentStep === 2 ? <StepRecogModel /> : null}
          {currentStep === 3 ? <StepItems /> : null}
          {currentStep === 4 ? <StepModel /> : null}
          {currentStep === 5 ? <StepTryonModel /> : null}
          {currentStep === 6 ? <StepPreview /> : null}
        </PipelineShell>
        <AddPipelineBar />
      </div>
    </div>
  );
}
