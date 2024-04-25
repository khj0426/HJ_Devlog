import { Meta, StoryObj } from '@storybook/react';

import DropDown from '@/Component/Common/DropDown/DropDown';

interface Item {
  id: string;
  text: string;
  icon: string;
  description: string;
}

const meta: Meta<typeof DropDown> = {
  title: '메뉴를 선택 가능한 드롭다운 컴포넌트',
  component: DropDown,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const DefaultDropDown: StoryObj<typeof DropDown> = {
  args: {
    items: [
      {
        key: 'item1', // 고유한 키 값
        label: '항목 1', // 레이블 노드, ReactNode 타입
        text: '설명 1', // 옵셔널, 항목에 대한 설명이나 추가 텍스트
        icon: '/path/to/icon1.png', // 옵셔널, 아이콘의 경로
        disabled: false, // 옵셔널, 항목이 비활성화 상태인지 여부
      },
      {
        key: 'item2',
        label: '항목 2',
        text: '설명 2',
        icon: '/path/to/icon2.png',
        disabled: true, // 이 항목은 비활성화 상태임을 나타냄
      },
    ],
  },
};
