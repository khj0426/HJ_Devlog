import { useState, KeyboardEvent, useMemo, useEffect } from 'react';

import { DropDownProps } from '@/Component/Common/DropDown/DropDown';

export default function useDropDown(items: DropDownProps[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<DropDownProps | null>(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.focus();
    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        setIndex(0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index >= items.length) {
          setIndex(0);
        } else {
          setIndex(index - 1);
        }
        break;
      case 'ArrowDown': {
        e.preventDefault();
        if (index === 0) {
          setIndex(items.length - 1);
        } else {
          setIndex(index + 1);
        }
        break;
      }

      case 'Enter': {
        setIsOpen(!isOpen);
        break;
      }
      case 'Escape': {
        setIsOpen(false);
        break;
      }
    }
  };

  useEffect(() => {
    setSelectedItem(items[index]);
    console.log(index, selectedItem);
  }, [index]);

  return {
    handleKeyDown,
    setIsOpen,
    setIndex,
    isOpen,
    selectedItem,
    index,
  };
}
