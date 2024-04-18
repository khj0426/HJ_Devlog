'use client';

import 'katex/dist/katex.min.css';
// used for code syntax highlighting (optional)red)
import 'react-notion-x/src/styles.css';
import './NotionResumeStyle.css';
import type { ReturnTypeofNotionRecord } from '@/app/(root)/(routes)/notion/resume/page';

import { NotionRenderer } from 'react-notion-x';

import { Modal } from 'react-notion-x/build/third-party/modal';
import { useRecoilValue } from 'recoil';

import { themeAtom } from '@/app/Providers/Recoil/globalAtom';

type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

export default function ResumeClient({
  recordMap,
}: {
  recordMap: PromiseType<ReturnTypeofNotionRecord>;
}) {
  const modeState = useRecoilValue(themeAtom);
  return (
    <div className="content">
      <NotionRenderer
        className="container"
        darkMode={modeState === 'dark' ? true : false}
        disableHeader
        components={{
          Modal,
        }}
        recordMap={recordMap}
        fullPage={true}
      />
    </div>
  );
}
