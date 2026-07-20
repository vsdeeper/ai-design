import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Recognition Virtual Fitting Bench',
  description: 'AI recognition virtual fitting bench scaffold',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
