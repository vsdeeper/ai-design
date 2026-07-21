'use client';

import Image from 'next/image';
import { ModelRadioCard } from '@/components/ui/ModelRadioCard';
import { NumberStepper } from '@/components/ui/NumberStepper';
import { SliderField } from '@/components/ui/SliderField';
import { Toggle } from '@/components/ui/Toggle';
import { RECOG_MODELS } from '@/lib/pipeline/mock-data';
import { usePipelineStore } from '@/stores/pipeline-store';

export function StepRecogModel() {
  const previewUrl = usePipelineStore((s) => s.garmentPreviewUrl);
  const meta = usePipelineStore((s) => s.garmentMeta);
  const recogModelId = usePipelineStore((s) => s.recogModelId);
  const setRecogModel = usePipelineStore((s) => s.setRecogModel);
  const params = usePipelineStore((s) => s.recogParams);
  const setRecogParams = usePipelineStore((s) => s.setRecogParams);

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr_240px]">
      <div>
        <p className="mb-3 text-sm font-medium text-ink">
          已上传的图片（可选）
        </p>
        <div className="overflow-hidden rounded-[var(--radius-control)] border border-border bg-canvas">
          <div className="relative aspect-square">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={meta?.name ?? '已上传图片'}
                fill
                unoptimized
                className="object-cover"
                sizes="200px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-ink-muted">
                暂无
              </div>
            )}
          </div>
          {meta ? (
            <p className="truncate border-t border-border bg-surface px-2 py-2 text-xs text-ink-secondary">
              {meta.name}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-ink">选择识别模型</p>
        <div className="flex flex-col gap-2.5">
          {RECOG_MODELS.map((model) => (
            <ModelRadioCard
              key={model.id}
              name={model.name}
              description={model.description}
              selected={recogModelId === model.id}
              onSelect={() => setRecogModel(model.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-ink">参数调节</p>
        <div className="space-y-5 rounded-[var(--radius-control)] border border-border p-4">
          <SliderField
            label="Confidence / 置信度"
            value={params.confidence}
            onChange={(confidence) => setRecogParams({ confidence })}
          />
          <SliderField
            label="检测阈值"
            value={params.threshold}
            onChange={(threshold) => setRecogParams({ threshold })}
          />
          <SliderField
            label="NMS"
            value={params.nms}
            onChange={(nms) => setRecogParams({ nms })}
          />
          <NumberStepper
            label="最大检测数"
            value={params.maxDetections}
            min={1}
            max={500}
            step={1}
            onChange={(maxDetections) => setRecogParams({ maxDetections })}
          />
          <Toggle
            label="多尺度检测"
            checked={params.multiScale}
            onChange={(multiScale) => setRecogParams({ multiScale })}
          />
        </div>
      </div>
    </div>
  );
}
