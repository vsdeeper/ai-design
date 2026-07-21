'use client';

import Image from 'next/image';
import { ModelRadioCard } from '@/components/ui/ModelRadioCard';
import { NumberStepper } from '@/components/ui/NumberStepper';
import { SliderField } from '@/components/ui/SliderField';
import { Toggle } from '@/components/ui/Toggle';
import { PRESET_MODELS, TRYON_MODELS } from '@/lib/pipeline/mock-data';
import { usePipelineStore } from '@/stores/pipeline-store';

export function StepTryonModel() {
  const items = usePipelineStore((s) => s.recognizedItems);
  const selectedIds = usePipelineStore((s) => s.selectedItemIds);
  const modelPreviewUrl = usePipelineStore((s) => s.modelPreviewUrl);
  const presetModelId = usePipelineStore((s) => s.presetModelId);
  const modelSource = usePipelineStore((s) => s.modelSource);
  const tryonModelId = usePipelineStore((s) => s.tryonModelId);
  const setTryonModel = usePipelineStore((s) => s.setTryonModel);
  const params = usePipelineStore((s) => s.tryonParams);
  const setTryonParams = usePipelineStore((s) => s.setTryonParams);

  const selectedItems = items.filter((i) => selectedIds.includes(i.id));
  const preset = PRESET_MODELS.find((m) => m.id === presetModelId);

  const contextList = [
    ...selectedItems.map((i) => ({
      id: i.id,
      name: i.name,
      imageUrl: i.imageUrl,
    })),
    ...(modelPreviewUrl
      ? [
          {
            id: 'model',
            name:
              modelSource === 'preset' ? (preset?.name ?? '模特') : '上传模特',
            imageUrl: modelPreviewUrl,
          },
        ]
      : []),
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr_240px]">
      <div>
        <p className="mb-3 text-sm font-medium text-ink">已识别衣物单品</p>
        <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
          {contextList.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-2.5 rounded-[var(--radius-control)] border border-border bg-surface p-2"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-canvas">
                <Image
                  src={row.imageUrl}
                  alt={row.name}
                  fill
                  unoptimized={row.imageUrl.startsWith('blob:')}
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <span className="truncate text-sm text-ink">{row.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-ink">选择试穿模型</p>
        <div className="flex flex-col gap-2.5">
          {TRYON_MODELS.map((model) => (
            <ModelRadioCard
              key={model.id}
              name={model.name}
              description={model.description}
              recommended={model.recommended}
              selected={tryonModelId === model.id}
              onSelect={() => setTryonModel(model.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-ink">参数调节</p>
        <div className="space-y-5 rounded-[var(--radius-control)] border border-border p-4">
          <SliderField
            label="试穿强度"
            value={params.intensity}
            onChange={(intensity) => setTryonParams({ intensity })}
          />
          <SliderField
            label="保留细节"
            value={params.retainDetail}
            onChange={(retainDetail) => setTryonParams({ retainDetail })}
          />
          <SliderField
            label="姿态对齐"
            value={params.poseAlign}
            onChange={(poseAlign) => setTryonParams({ poseAlign })}
          />
          <NumberStepper
            label="推理步数"
            value={params.inferenceSteps}
            min={1}
            max={100}
            onChange={(inferenceSteps) => setTryonParams({ inferenceSteps })}
          />
          <Toggle
            label="高清输出"
            checked={params.hdOutput}
            onChange={(hdOutput) => setTryonParams({ hdOutput })}
          />
        </div>
      </div>
    </div>
  );
}
