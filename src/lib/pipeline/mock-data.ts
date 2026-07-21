import type { ClothingItem, ModelOption, PresetModel } from './types';

export const RECOG_MODELS: ModelOption[] = [
  {
    id: 'detectnet-pro',
    name: 'DetectNet Pro',
    description: '通用衣物检测与分类模型，覆盖上下装与外套。',
  },
  {
    id: 'clothseg',
    name: 'ClothSeg',
    description: '专注衣物分割，适合复杂背景与叠穿场景。',
  },
  {
    id: 'itemvision',
    name: 'ItemVision',
    description: '细粒度识别，擅长配饰与小件单品。',
  },
  {
    id: 'garment-id',
    name: 'GarmentID',
    description: '衣物检索与风格匹配，便于对照评测。',
  },
];

export const TRYON_MODELS: ModelOption[] = [
  {
    id: 'catvton-3.1',
    name: 'CatVTON 3.1',
    description: '高质量虚拟试穿，适合日常内衣与衬衫类单品。',
    recommended: true,
  },
  {
    id: 'stablevton',
    name: 'StableVTON',
    description: '稳定扩散试穿，平衡速度与效果。',
  },
  {
    id: 'dressing-former',
    name: 'DressingFormer',
    description: 'Transformer 试穿，注重褶皱与版型还原。',
  },
  {
    id: 'ootdiffusion',
    name: 'OOTDiffusion',
    description: '扩散式试穿，适合多样服饰风格。',
  },
];

export const MOCK_CLOTHING_ITEMS: ClothingItem[] = [
  { id: 'item-shirt', name: '条纹衬衫', imageUrl: '/mock/item-shirt.svg' },
  { id: 'item-jeans', name: '牛仔裤', imageUrl: '/mock/item-jeans.svg' },
  { id: 'item-jacket', name: '外套', imageUrl: '/mock/item-jacket.svg' },
  { id: 'item-shoes', name: '鞋子', imageUrl: '/mock/item-shoes.svg' },
  { id: 'item-tee', name: 'T恤', imageUrl: '/mock/item-tee.svg' },
  { id: 'item-belt', name: '腰带', imageUrl: '/mock/item-belt.svg' },
  { id: 'item-bag', name: '背包', imageUrl: '/mock/item-bag.svg' },
  { id: 'item-hat', name: '帽子', imageUrl: '/mock/item-hat.svg' },
];

export const PRESET_MODELS: PresetModel[] = [
  { id: 'female-01', name: '女-01', imageUrl: '/mock/model-f01.svg' },
  { id: 'female-02', name: '女-02', imageUrl: '/mock/model-f02.svg' },
  { id: 'female-03', name: '女-03', imageUrl: '/mock/model-f03.svg' },
  { id: 'male-01', name: '男-01', imageUrl: '/mock/model-m01.svg' },
  { id: 'male-02', name: '男-02', imageUrl: '/mock/model-m02.svg' },
  { id: 'male-03', name: '男-03', imageUrl: '/mock/model-m03.svg' },
];

export const DEFAULT_SELECTED_ITEM_IDS = [
  'item-shirt',
  'item-jeans',
  'item-shoes',
];
