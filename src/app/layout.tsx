import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitBench — AI 识别虚拟试衣评测台',
  description:
    'FitBench 评测台：上传图片 → 识别衣物单品 → 选择模特 → 虚拟试穿，对比模型效果辅助选型。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
