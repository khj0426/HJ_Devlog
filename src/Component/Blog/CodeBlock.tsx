'use client';
import dynamic from 'next/dynamic';
const PrismLight = dynamic(
  () => import('react-syntax-highlighter/dist/cjs/prism')
);
import { rainbow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function CodeBlock({
  children,
}: {
  children: string | string[];
}) {
  return (
    <PrismLight
      language="javascript"
      wrapLines={true}
      style={rainbow}
      useInlineStyles={true}
    >
      {children}
    </PrismLight>
  );
}
