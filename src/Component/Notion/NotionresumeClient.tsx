'use client';

import 'react-notion-x/src/styles.css';

import 'prismjs/themes/prism-tomorrow.css';
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
    <div>
      <NotionRenderer
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
