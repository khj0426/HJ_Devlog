import { Meta, StoryObj } from '@storybook/react';

import DropDown from '@/Component/Common/DropDown/DropDown';

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

export const BigQueryDropDown: StoryObj<typeof DropDown> = {
  args: {
    onChangeSelectedItem: (item) => console.log(item?.key),
    items: [
      {
        key: '참여 시간',
        label: '참여 시간',
        text: '사용자의 참여 시간입니다',
      },
      {
        key: '총 사용자 수',
        label: '총 사용자 수',
        text: '사용자의 총 사용자 수입니다.',
      },
    ],
  },
};

export const DiceBearAvatarSelectDropDown: StoryObj<typeof DropDown> = {
  args: {
    items: [
      {
        key: ' Abby',
        label: 'Abby',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Abby',
      },
      {
        key: 'Peanut',
        label: 'Peanut',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Peanut',
      },
      {
        key: 'Angel',
        label: 'Angel',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Angel',
      },
      {
        key: 'Jasmine',
        label: 'Jasmine',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Jasmine',
      },
      {
        key: 'Kiki',
        label: 'Kiki',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Kiki',
      },
      {
        key: 'Kitty',
        label: 'Kitty',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Kitty',
      },
      {
        key: 'Lily',
        label: 'Lily',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Lily',
      },
      {
        key: 'Mia',
        label: 'Mia',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Mia',
      },
      {
        key: 'Gracie',
        label: 'Gracie',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Gracie',
      },
      {
        key: 'Bear',
        label: 'Bear',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Bear',
      },
      {
        key: 'Boots',
        label: 'Boots',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Boots',
      },
      {
        key: 'Chester',
        label: 'Chester',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Chester',
      },
      {
        key: 'Garfield',
        label: 'Garfield',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Garfield',
      },
      {
        key: 'Lola',
        label: 'Lola',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Lola',
      },
      {
        key: 'Callie',
        label: 'Callie',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Callie',
      },
      {
        key: 'Felix',
        label: 'Felix',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix',
      },
      {
        key: 'Charlie',
        label: 'Charlie',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Charlie',
      },
      {
        key: 'Jack',
        label: 'Jack',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Jack',
      },
      {
        key: 'Dusty',
        label: 'Dusty',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Dusty',
      },
      {
        key: 'Trouble',
        label: 'Trouble',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Trouble',
      },
    ],
  },
};
