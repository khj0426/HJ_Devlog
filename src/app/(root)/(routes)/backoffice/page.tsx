'use client';

import { useState, Suspense } from 'react';

import { SelectDateOptionsProps } from '@/@types/BackOfficeProps';
import SelectedDateUserCountInfo from '@/Component/BackOffice/SelectedDateUserCount/SelectedDateUserCount';
import DropDown from '@/Component/Common/DropDown/DropDown';
import useDropDown from '@/hooks/useDropDown';

import { dropDownItems } from './constants';

export default function BackOfficePage() {
  const [date, setDate] = useState<SelectDateOptionsProps>('오늘');

  return (
    <main>
      <DropDown
        items={dropDownItems}
        onChangeSelectedItem={(item: SelectDateOptionsProps) => {
          console.log(item);
          setDate(item);
        }}
      />
      <Suspense fallback={<div></div>}>
        <SelectedDateUserCountInfo date={date} />
      </Suspense>
    </main>
  );
}
