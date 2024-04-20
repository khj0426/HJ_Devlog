import { KeyboardEvent, useState } from 'react';

import { dropDownItem, type dropDownProps } from '@/@types/DropDownType';

import DropDownMenu from './DropDownMenu';
import Trigger from './Trigger';

export default function DropDown({ items }: dropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<dropDownItem | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    const selectedId = e.currentTarget.getAttribute('data-id');
    if (!selectedId) {
      return;
    }
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        setSelectedItem(
          items.find((item) => item.id === selectedId) ?? items[0]
        );
        break;
      case 'Enter':
        setIsOpen(false);
        console.log(selectedItem);
        break;
    }
  };

  return (
    <div className="dropdown">
      <Trigger
        label={selectedItem ? selectedItem.text : '아이템을 선택하세요'}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <DropDownMenu
          items={items}
          onKeyDown={() => handleKeyDown}
          onClickItem={(item) => {
            if (item) {
              setSelectedItem(item);
              setIsOpen(false);
            }
          }}
        />
      )}
    </div>
  );
}
