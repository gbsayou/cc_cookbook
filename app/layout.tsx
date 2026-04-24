import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Head } from 'nextra/components';
import 'nextra-theme-docs/style.css';

export const metadata: Metadata = {
  title: {
    default: 'Claude Code Cookbook',
    template: '%s | Claude Code Cookbook',
  },
  description: '从零开始用好 Claude Code 的中文实操教程',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>{children}</body>
    </html>
  );
}
