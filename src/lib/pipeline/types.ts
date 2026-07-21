export type PipelineStep = 1 | 2 | 3 | 4 | 5 | 6;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type ModelSource = 'upload' | 'preset' | null;

export interface ImageMeta {
  name: string;
  width: number;
  height: number;
  sizeLabel: string;
}

export interface RecogParams {
  confidence: number;
  threshold: number;
  nms: number;
  maxDetections: number;
  multiScale: boolean;
}

export interface TryonParams {
  intensity: number;
  retainDetail: number;
  poseAlign: number;
  inferenceSteps: number;
  hdOutput: boolean;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  recommended?: boolean;
}

export interface ClothingItem {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PresetModel {
  id: string;
  name: string;
  imageUrl: string;
}

export const PIPELINE_STEPS: { step: PipelineStep; label: string }[] = [
  { step: 1, label: '上传图片' },
  { step: 2, label: '选择识别模型' },
  { step: 3, label: 'AI 识别衣物单品' },
  { step: 4, label: '上传/选择预设模特' },
  { step: 5, label: '选择试穿模型' },
  { step: 6, label: '生成试穿效果图' },
];

export const STEP_TIPS: Record<PipelineStep, string> = {
  1: '提示：请上传清晰、正面平铺的衣物图片，以获得更准确的识别结果。',
  2: '提示：不同识别模型在精度与泛化能力上各有侧重，可按场景灵活选择。',
  3: '可多选单品',
  4: '提示：选择合适的模特有助于提升试穿效果的真实性与泛化能力。',
  5: '提示：不同试穿模型在贴合度与细节保留上各有侧重，可按场景灵活选择。',
  6: '效果已生成',
};

export const DEFAULT_RECOG_PARAMS: RecogParams = {
  confidence: 0.72,
  threshold: 0.45,
  nms: 0.5,
  maxDetections: 100,
  multiScale: true,
};

export const DEFAULT_TRYON_PARAMS: TryonParams = {
  intensity: 0.75,
  retainDetail: 0.6,
  poseAlign: 0.8,
  inferenceSteps: 30,
  hdOutput: true,
};
