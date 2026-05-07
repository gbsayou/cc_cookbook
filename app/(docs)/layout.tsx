import Image from 'next/image';
import type { ReactNode } from 'react';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';

const navbar = (
  <Navbar
    logo={
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
        <Image src="/icon.png" alt="" width={20} height={20} />
        Claude Code Cookbook
      </span>
    }
    projectLink="https://github.com/gbsayou/cc_cookbook"
  />
);

const footer = (
  <Footer>© 2026 Claude Code Cookbook</Footer>
);

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <Layout
      navbar={navbar}
      footer={footer}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/gbsayou/cc_cookbook"
      sidebar={{ defaultMenuCollapseLevel: 1 }}
    >
      {children}
    </Layout>
  );
}
