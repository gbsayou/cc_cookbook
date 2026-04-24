import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from '../styles/terminal.module.scss';

type Line = {
  text: string;
  type: 'input' | 'output' | 'error' | 'system';
};

const COMMANDS: Record<string, string[]> = {
  help: [
    '可用命令:',
    '  help          显示帮助',
    '  claude        启动 Claude Code 会话',
    '  /init         基于代码库生成 CLAUDE.md',
    '  /review       审查当前分支',
    '  /help         会话内帮助',
    '  clear         清屏',
  ],
  claude: [
    '✻ 欢迎使用 Claude Code!',
    '',
    '  /help 查看命令，/status 查看当前设置',
    '',
    '  cwd: ~/projects/demo',
    '  model: claude-opus-4-7',
  ],
  '/init': [
    '正在分析项目结构...',
    '扫描 package.json、源文件...',
    '✓ 已生成 CLAUDE.md',
  ],
  '/review': [
    '正在对比当前分支与 main...',
    '✓ 发现 2 条建议，0 条阻塞问题',
  ],
  '/help': [
    '会话内命令:',
    '  /init     基于代码库生成 CLAUDE.md',
    '  /review   审查当前分支',
    '  /clear    清空会话上下文',
    '  /exit     退出',
  ],
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { text: '欢迎使用 Claude Code 演示终端。输入 `help` 开始。', type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [{ text: `$ ${raw}`, type: 'input' }];

    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    if (cmd === '') {
      setLines((prev) => [...prev, ...next]);
      return;
    }

    const res = COMMANDS[cmd];
    if (res) {
      res.forEach((t) => next.push({ text: t, type: 'output' }));
    } else {
      next.push({ text: `command not found: ${cmd}`, type: 'error' });
      next.push({ text: '输入 `help` 查看可用命令。', type: 'output' });
    }
    setLines((prev) => [...prev, ...next]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        setHistory((h) => [...h, input]);
        setHistoryIdx(-1);
      }
      run(input);
      setInput('');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div
      className={styles.terminal}
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      <div className={styles.titlebar}>
        <span className={styles.dot} data-color="red" />
        <span className={styles.dot} data-color="yellow" />
        <span className={styles.dot} data-color="green" />
        <span className={styles.title}>claude-code — demo</span>
      </div>
      <div className={styles.body}>
        {lines.map((l, i) => (
          <div key={i} className={styles.line} data-type={l.type}>
            {l.text}
          </div>
        ))}
        <div className={styles.line}>
          <span className={styles.prompt}>$</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            aria-label="terminal input"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
