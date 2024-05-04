import { ReactNode, useRef, PropsWithChildren, KeyboardEvent } from 'react';

import useClickAway from '@/hooks/useClickAway';
import useDropDown from '@/hooks/useDropDown';

import DropDownMenu from './DropDownMenu';
import Trigger from './Trigger';

export interface DropDownProps {
  key: string;
  text?: string;
  icon?: string;
  disabled?: boolean;
  label: string;
}

export default function DropDown<T>({
  items,
  onChangeSelectedItem,
}: {
  items: PropsWithChildren<DropDownProps[]>;
  onChangeSelectedItem?: (_item?: DropDownProps) => void;
}) {
  const {
    isOpen,
    index,
    selectedItem,
    setIsOpen,
    setIndex,
    handleKeyDown,
    setSelectedItem,
  } = useDropDown(items);

  const dropDownContainer = useRef<HTMLDivElement | null>(null);
  useClickAway(dropDownContainer, () => {
    setIsOpen(false);
  });
  return (
    <div className="dropdown" ref={dropDownContainer}>
      <Trigger
        label={selectedItem ? selectedItem.label : items[0].label}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <DropDownMenu
          currentSelectedItemIndex={index}
          items={items}
          onKeyDown={() => handleKeyDown}
          onClickItem={(item) => {
            if (item) {
              setSelectedItem(item);
            }
            if (onChangeSelectedItem) {
              onChangeSelectedItem(item);
            }
          }}
        ></DropDownMenu>
      )}
      {items.children}
    </div>
  );
}
