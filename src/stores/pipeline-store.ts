'use client';

import { create } from 'zustand';
import {
  formatFileSize,
  getDefaultSelectedItemIds,
  mockGenerateTryon,
  mockRecognizeItems,
  readImageDimensions,
  validateImageFile,
} from '@/lib/pipeline/mock-api';
import { PRESET_MODELS } from '@/lib/pipeline/mock-data';
import {
  DEFAULT_RECOG_PARAMS,
  DEFAULT_TRYON_PARAMS,
  type AsyncStatus,
  type ClothingItem,
  type ImageMeta,
  type ModelSource,
  type PipelineStep,
  type RecogParams,
  type TryonParams,
} from '@/lib/pipeline/types';

function revokeUrl(url: string | null) {
  if (url?.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

interface PipelineState {
  currentStep: PipelineStep;

  garmentPreviewUrl: string | null;
  garmentMeta: ImageMeta | null;

  recogModelId: string | null;
  recogParams: RecogParams;

  recognizedItems: ClothingItem[];
  selectedItemIds: string[];
  recogStatus: AsyncStatus;

  modelSource: ModelSource;
  modelPreviewUrl: string | null;
  modelMeta: ImageMeta | null;
  presetModelId: string | null;

  tryonModelId: string | null;
  tryonParams: TryonParams;

  resultUrl: string | null;
  generateStatus: AsyncStatus;

  setStep: (step: PipelineStep) => void;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: (step?: PipelineStep) => boolean;
  canNavigateTo: (step: PipelineStep) => boolean;

  setGarment: (file: File) => Promise<string | null>;
  clearGarment: () => void;

  setRecogModel: (id: string) => void;
  setRecogParams: (patch: Partial<RecogParams>) => void;

  runRecognition: () => Promise<void>;
  toggleItem: (id: string) => void;

  setModelUpload: (file: File) => Promise<string | null>;
  setPresetModel: (id: string) => void;
  clearModel: () => void;

  setTryonModel: (id: string) => void;
  setTryonParams: (patch: Partial<TryonParams>) => void;

  runGenerate: () => Promise<void>;
  regenerate: () => Promise<void>;
  resetPipeline: () => void;
}

const initialState = {
  currentStep: 1 as PipelineStep,
  garmentPreviewUrl: null as string | null,
  garmentMeta: null as ImageMeta | null,
  recogModelId: 'detectnet-pro' as string | null,
  recogParams: { ...DEFAULT_RECOG_PARAMS },
  recognizedItems: [] as ClothingItem[],
  selectedItemIds: [] as string[],
  recogStatus: 'idle' as AsyncStatus,
  modelSource: null as ModelSource,
  modelPreviewUrl: null as string | null,
  modelMeta: null as ImageMeta | null,
  presetModelId: null as string | null,
  tryonModelId: 'catvton-3.1' as string | null,
  tryonParams: { ...DEFAULT_TRYON_PARAMS },
  resultUrl: null as string | null,
  generateStatus: 'idle' as AsyncStatus,
};

export const usePipelineStore = create<PipelineState>((set, get) => ({
  ...initialState,

  setStep: (step) => {
    const { canNavigateTo, runGenerate, generateStatus } = get();
    if (!canNavigateTo(step)) return;
    set({ currentStep: step });
    if (step === 6 && generateStatus === 'idle') {
      void runGenerate();
    }
  },

  goNext: () => {
    const { currentStep, canGoNext, setStep } = get();
    if (!canGoNext(currentStep)) return;
    if (currentStep < 6) {
      setStep((currentStep + 1) as PipelineStep);
    }
  },

  goPrev: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as PipelineStep });
    }
  },

  canGoNext: (step) => {
    const s = get();
    const current = step ?? s.currentStep;
    switch (current) {
      case 1:
        return Boolean(s.garmentPreviewUrl);
      case 2:
        return Boolean(s.recogModelId);
      case 3:
        return (
          s.recogStatus === 'success' &&
          s.selectedItemIds.length > 0 &&
          s.recognizedItems.length > 0
        );
      case 4:
        return Boolean(
          (s.modelSource === 'upload' && s.modelPreviewUrl) ||
          (s.modelSource === 'preset' && s.presetModelId),
        );
      case 5:
        return Boolean(s.tryonModelId);
      case 6:
        return false;
      default:
        return false;
    }
  },

  canNavigateTo: (step) => {
    const { currentStep, canGoNext } = get();
    if (step <= currentStep) return true;
    for (let i = 1; i < step; i++) {
      if (!canGoNext(i as PipelineStep)) return false;
    }
    return true;
  },

  setGarment: async (file) => {
    const error = validateImageFile(file);
    if (error) return error;

    const { garmentPreviewUrl } = get();
    revokeUrl(garmentPreviewUrl);

    try {
      const dims = await readImageDimensions(file);
      const url = URL.createObjectURL(file);
      set({
        garmentPreviewUrl: url,
        garmentMeta: {
          name: file.name,
          width: dims.width,
          height: dims.height,
          sizeLabel: formatFileSize(file.size),
        },
        recognizedItems: [],
        selectedItemIds: [],
        recogStatus: 'idle',
        resultUrl: null,
        generateStatus: 'idle',
      });
      return null;
    } catch {
      return '读取图片失败，请重试';
    }
  },

  clearGarment: () => {
    const { garmentPreviewUrl } = get();
    revokeUrl(garmentPreviewUrl);
    set({
      garmentPreviewUrl: null,
      garmentMeta: null,
      recognizedItems: [],
      selectedItemIds: [],
      recogStatus: 'idle',
    });
  },

  setRecogModel: (id) => set({ recogModelId: id }),

  setRecogParams: (patch) =>
    set((state) => ({
      recogParams: { ...state.recogParams, ...patch },
    })),

  runRecognition: async () => {
    set({ recogStatus: 'loading' });
    try {
      const items = await mockRecognizeItems();
      set({
        recognizedItems: items,
        selectedItemIds: getDefaultSelectedItemIds(),
        recogStatus: 'success',
      });
    } catch {
      set({ recogStatus: 'error' });
    }
  },

  toggleItem: (id) =>
    set((state) => {
      const exists = state.selectedItemIds.includes(id);
      return {
        selectedItemIds: exists
          ? state.selectedItemIds.filter((x) => x !== id)
          : [...state.selectedItemIds, id],
      };
    }),

  setModelUpload: async (file) => {
    const error = validateImageFile(file);
    if (error) return error;

    const { modelPreviewUrl, modelSource } = get();
    if (modelSource === 'upload') {
      revokeUrl(modelPreviewUrl);
    }

    try {
      const dims = await readImageDimensions(file);
      const url = URL.createObjectURL(file);
      set({
        modelSource: 'upload',
        modelPreviewUrl: url,
        modelMeta: {
          name: file.name,
          width: dims.width,
          height: dims.height,
          sizeLabel: formatFileSize(file.size),
        },
        presetModelId: null,
        resultUrl: null,
        generateStatus: 'idle',
      });
      return null;
    } catch {
      return '读取图片失败，请重试';
    }
  },

  setPresetModel: (id) => {
    const { modelPreviewUrl, modelSource } = get();
    if (modelSource === 'upload') {
      revokeUrl(modelPreviewUrl);
    }
    const preset = PRESET_MODELS.find((m) => m.id === id);
    set({
      modelSource: 'preset',
      presetModelId: id,
      modelPreviewUrl: preset?.imageUrl ?? null,
      modelMeta: preset
        ? {
            name: preset.name,
            width: 640,
            height: 960,
            sizeLabel: '—',
          }
        : null,
      resultUrl: null,
      generateStatus: 'idle',
    });
  },

  clearModel: () => {
    const { modelPreviewUrl, modelSource } = get();
    if (modelSource === 'upload') {
      revokeUrl(modelPreviewUrl);
    }
    set({
      modelSource: null,
      modelPreviewUrl: null,
      modelMeta: null,
      presetModelId: null,
    });
  },

  setTryonModel: (id) =>
    set({
      tryonModelId: id,
      resultUrl: null,
      generateStatus: 'idle',
    }),

  setTryonParams: (patch) =>
    set((state) => ({
      tryonParams: { ...state.tryonParams, ...patch },
      resultUrl: null,
      generateStatus: 'idle',
    })),

  runGenerate: async () => {
    set({ generateStatus: 'loading', resultUrl: null });
    try {
      const url = await mockGenerateTryon();
      set({ resultUrl: url, generateStatus: 'success' });
    } catch {
      set({ generateStatus: 'error' });
    }
  },

  regenerate: async () => {
    await get().runGenerate();
  },

  resetPipeline: () => {
    const { garmentPreviewUrl, modelPreviewUrl, modelSource } = get();
    revokeUrl(garmentPreviewUrl);
    if (modelSource === 'upload') {
      revokeUrl(modelPreviewUrl);
    }
    set({
      ...initialState,
      recogParams: { ...DEFAULT_RECOG_PARAMS },
      tryonParams: { ...DEFAULT_TRYON_PARAMS },
    });
  },
}));
