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
  label: ReactNode;
}

export default function DropDown<T>({
  items,
  onChangeSelectedItem,
}: {
  items: PropsWithChildren<DropDownProps[]>;
  onChangeSelectedItem?: (_item: T) => void;
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
        label={
          selectedItem ? (selectedItem?.label as string) : '아이템을 선택하세요'
        }
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
            if (onChangeSelectedItem && item?.text) {
              onChangeSelectedItem(item?.text as T);
            }
          }}
        ></DropDownMenu>
      )}
      {items.children}
    </div>
  );
}
