'use client';
import dynamic from 'next/dynamic';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'));
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
  children,
}: {
  children: string | string[];
}) {
  return (
    <SyntaxHighlighter
      language="javascript"
      wrapLines={true}
      style={atomDark}
      lineProps={{
        style: {
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          fontSize: '16px',
        },
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
