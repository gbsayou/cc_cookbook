import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 600 }}>Claude Code Cookbook</span>,
  project: {
    link: 'https://github.com/anthropics/claude-code',
  },
  docsRepositoryBase: 'https://github.com/your-org/cc-cookbook',
  footer: {
    content: (
      <span>
        Claude Code Cookbook · 一份实用教程
      </span>
    ),
  },
  i18n: [{ locale: 'zh-CN', name: '简体中文' }],
  search: { placeholder: '搜索文档…' },
};

export default config;
