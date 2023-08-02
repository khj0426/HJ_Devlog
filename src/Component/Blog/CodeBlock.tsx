'use client';
import dynamic from 'next/dynamic';
const PrismLight = dynamic(
  () => import('react-syntax-highlighter/dist/cjs/prism-light')
);
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
  children,
}: {
  children: string | string[];
}) {
  return (
    <PrismLight
      language="javascript"
      wrapLines={true}
      style={materialDark}
      useInlineStyles={true}
    >
      {children}
    </PrismLight>
  );
}
