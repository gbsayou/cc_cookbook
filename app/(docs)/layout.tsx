import type { ReactNode } from 'react';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 600 }}>Claude Code Cookbook</span>}
    projectLink="https://github.com/anthropics/claude-code"
  />
);

const footer = (
  <Footer>© {new Date().getFullYear()} Claude Code Cookbook</Footer>
);

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <Layout
      navbar={navbar}
      footer={footer}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/your-org/cc-cookbook"
      sidebar={{ defaultMenuCollapseLevel: 1 }}
    >
      {children}
    </Layout>
  );
}
