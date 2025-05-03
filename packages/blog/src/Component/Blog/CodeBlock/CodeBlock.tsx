'use client';

import dynamic from 'next/dynamic';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
// eslint-disable-next-line import/order
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';

const PrismLight = dynamic(() =>
  import('react-syntax-highlighter/dist/esm/prism-light').then((res) => {
    res.default.registerLanguage('ts', typescript);
    res.default.registerLanguage('jsx', jsx);
    res.default.registerLanguage('js', javascript);
    res.default.registerLanguage('json', json);
    res.default.registerLanguage('bash', bash);
    res.default.registerLanguage('tsx', tsx);
    return res;
  })
);

import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
  children,
  lang,
}: {
  children: string | string[];
  lang?: string;
}) {
  return (
    <PrismLight
      language={lang}
      style={vscDarkPlus}
      customStyle={{
        fontFamily: '__Do_Hyeon_7b3cf7',
        maxWidth: '100vw',
        wordBreak: 'break-all',
        fontSize: '1rem',
        overflowWrap: 'break-word',
      }}
      codeTagProps={{
        style: {
          fontFamily: 'inherit',
          wordBreak: 'break-all',
          overflowWrap: 'break-word',
        },
      }}
    >
      {children}
    </PrismLight>
  );
}
