'use client';
import dynamic from 'next/dynamic';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'));
import { rainbow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function CodeBlock({
  children,
}: {
  children: string | string[];
}) {
  return (
    <SyntaxHighlighter language="javascript" wrapLines={true} style={rainbow} useInlineStyles={true}>
      {children}
    </SyntaxHighlighter>
  );
}
