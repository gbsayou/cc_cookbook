import Link from 'next/link';
import styles from '../styles/home.module.scss';

const CARDS = [
  {
    icon: '⚡',
    title: '快速上手',
    desc: '从安装到第一次对话，5 分钟跑通完整流程。',
    href: '/getting-started',
    cta: '开始安装',
  },
  {
    icon: '◆',
    title: '命令大全',
    desc: '内置 slash 命令、自定义命令与常用 workflow 速查。',
    href: '/commands',
    cta: '查看清单',
  },
  {
    icon: '⟡',
    title: '交互演练',
    desc: '在浏览器里模拟 Claude Code 终端，先熟悉交互节奏。',
    href: '/playground',
    cta: '打开终端',
  },
  {
    icon: '✦',
    title: '进阶扩展',
    desc: 'Hooks、MCP、Agent — 把 Claude Code 嵌进你的工作流。',
    href: '/getting-started',
    cta: '深入了解',
  },
];

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.bgGlow} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.nav}>
          <span className={styles.brand}>Claude Code Cookbook</span>
          <div className={styles.navLinks}>
            <Link href="/getting-started">快速开始</Link>
            <Link href="/commands">命令大全</Link>
            <Link href="/playground">演练</Link>
            <a
              href="https://github.com/anthropics/claude-code"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub ↗
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden />
            中文实操教程 · v1
          </div>
          <h1 className={styles.title}>
            从零开始
            <br />
            用好 <span className={styles.highlight}>Claude Code</span>
          </h1>
          <p className={styles.subtitle}>
            一本实操向的使用手册，搭配浏览器里的交互演练场。
            从安装到进阶 hooks、MCP、agent，一次学明白。
          </p>
          <div className={styles.ctas}>
            <Link href="/getting-started" className={styles.primary}>
              快速开始
              <span aria-hidden>→</span>
            </Link>
            <Link href="/playground" className={styles.secondary}>
              打开演练场
            </Link>
          </div>
        </section>

        <p className={styles.sectionLabel}>你会学到</p>
        <section className={styles.cards}>
          {CARDS.map((c) => (
            <Link key={c.title} href={c.href} className={styles.card}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardDesc}>{c.desc}</p>
              <span className={styles.cardLink}>
                {c.cta} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </section>

        <footer className={styles.footer}>
          <span>© 2026 Claude Code Cookbook</span>
          <span className={styles.footerSep}>·</span>
          <span>一份实操向的中文教程</span>
        </footer>
      </div>
    </div>
  );
}
