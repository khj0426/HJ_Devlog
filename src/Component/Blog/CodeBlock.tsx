'use client';
import { Prism as SyntaxHighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
  children,
}: {
  children: string | string[];
}) {
  return (
    <SyntaxHighter language="javascript" style={materialOceanic}>
      {children}
    </SyntaxHighter>
  );
}
