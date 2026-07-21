'use client';

import { useState } from 'react';
import { Dropzone } from '@/components/ui/Dropzone';
import { PresetModelCard } from '@/components/ui/PresetModelCard';
import { PRESET_MODELS } from '@/lib/pipeline/mock-data';
import { usePipelineStore } from '@/stores/pipeline-store';

export function StepModel() {
  const setModelUpload = usePipelineStore((s) => s.setModelUpload);
  const setPresetModel = usePipelineStore((s) => s.setPresetModel);
  const presetModelId = usePipelineStore((s) => s.presetModelId);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:divide-x lg:divide-border">
      <div className="lg:pr-6">
        <p className="mb-3 text-sm font-medium text-ink">上传模特</p>
        <Dropzone
          icon="image"
          hint="点击或拖拽上传模特照片"
          subhint="支持 JPG / PNG，文件不超过 10MB"
          onFile={async (file) => {
            const err = await setModelUpload(file);
            if (err) throw new Error(err);
          }}
        />
      </div>

      <div className="lg:pl-6">
        <p className="mb-3 text-sm font-medium text-ink">选择预设模特</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PRESET_MODELS.map((model) => (
            <PresetModelCard
              key={model.id}
              name={model.name}
              imageUrl={model.imageUrl}
              selected={presetModelId === model.id}
              onSelect={() => setPresetModel(model.id)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="mt-4 inline-flex items-center gap-1 text-sm text-ink-secondary hover:text-ink"
        >
          更多模特
          <span aria-hidden>{showMore ? '⌃' : '⌄'}</span>
        </button>
        {showMore ? (
          <p className="mt-2 text-xs text-ink-muted">
            当前评测台已展示全部预设模特。
          </p>
        ) : null}
      </div>
    </div>
  );
}
