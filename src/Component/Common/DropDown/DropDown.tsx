import { useState } from 'react';

import { dropDownItem, type dropDownProps } from '@/@types/DropDownType';

import { DropDownMenu } from './DropDownMenu';
import { Trigger } from './Trigger';

export default function DropDown({ items }: dropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<dropDownItem | null>(null);
  //TODO - Enter키 누를 시 토글,위,아래 화살표 키에 대한 처리

  return (
    <div className="dropdown">
      <Trigger
        label={selectedItem ? selectedItem.text : '아이템을 선택하세요'}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && <DropDownMenu items={items} onClickItem={setSelectedItem} />}
    </div>
  );
}
