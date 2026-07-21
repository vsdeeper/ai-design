import { DEFAULT_SELECTED_ITEM_IDS, MOCK_CLOTHING_ITEMS } from './mock-data';
import type { ClothingItem } from './types';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockRecognizeItems(): Promise<ClothingItem[]> {
  await delay(900);
  return MOCK_CLOTHING_ITEMS.map((item) => ({ ...item }));
}

export function getDefaultSelectedItemIds(): string[] {
  return [...DEFAULT_SELECTED_ITEM_IDS];
}

export async function mockGenerateTryon(): Promise<string> {
  await delay(1200);
  return `/mock/result-tryon.svg?t=${Date.now()}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function readImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(url);
      resolve({ width, height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('无法读取图片尺寸'));
    };
    img.src = url;
  });
}

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export function validateImageFile(file: File): string | null {
  const typeOk =
    ACCEPTED_IMAGE_TYPES.includes(file.type) ||
    /\.(jpe?g|png)$/i.test(file.name);
  if (!typeOk) return '仅支持 JPG、PNG 格式';
  if (file.size > MAX_UPLOAD_BYTES) return '图片大小不能超过 10MB';
  return null;
}
