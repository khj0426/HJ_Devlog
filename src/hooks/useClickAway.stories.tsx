import { useState, useRef } from 'react';

import { Meta } from '@storybook/react';

import useClickAway from '@/hooks/useClickAway';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu}>메뉴 토글</button>
      {isOpen && (
        <div ref={dropdownRef} style={{ position: 'absolute' }}>
          <ul>
            <li>메뉴 항목 1</li>
            <li>메뉴 항목 2</li>
            <li>메뉴 항목 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const meta: Meta = {
  title: 'hooks/useClickAway',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  component: DropdownMenu,
};

export default meta;
