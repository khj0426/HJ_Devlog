import { useMemo } from 'react';

import DropDown from '@/Component/Common/DropDown/DropDown';
import useDropDown from '@/hooks/useDropDown';

interface SelectDateOptions {
  date: '오늘' | '어제' | '7일' | '30일' | '90일' | '1년';
}

export default function DateSelectDropDown({
  date,
}: {
  date: SelectDateOptions;
}) {
  const dropDownItems = [
    {
      key: 'oneDay',
      label: '하루',
    },
    {
      key: 'yesterday',
      label: '어제',
    },
    {
      key: 'week',
      label: '7일',
    },
    {
      key: 'month',
      label: '30일',
    },
    {
      key: '3_month',
      label: '90일',
    },
    {
      key: 'year',
      label: '1년',
    },
  ];
  const { selectedItem } = useDropDown(dropDownItems);

  console.log(selectedItem);
  return <DropDown items={dropDownItems} />;
}
