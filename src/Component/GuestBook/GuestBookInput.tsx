import type { ComponentType, CSSProperties, InputHTMLAttributes, PropsWithChildren } from 'react';
import { useState } from 'react';

import { ActionButton, TextField } from '@seed-design/react';
import Image from 'next/image';

import DropDown from '@/Component/Common/DropDown/DropDown';
import Flex from '@/Component/Common/Flex/Flex';
import { ToastManager, ToastContainer } from '@/Component/Common/Toast';
import { GuestBookAvatarList } from '@/Component/GuestBook/constants';
import usePostGuestBook from '@/hooks/mutations/useGuestBookMutation';
import useInput from '@/hooks/useInput';

import styles from './guestbook.module.css';

// SEED 2.4's React 18 declarations omit compound-component children/input
// attributes even though the runtime API supports them.
const SeedTextFieldRoot = TextField.Root as ComponentType<
  PropsWithChildren<{ size?: 'small' | 'medium' | 'large'; style?: CSSProperties }>
>;
const SeedTextFieldInput = TextField.Input as ComponentType<
  InputHTMLAttributes<HTMLInputElement>
>;
const GuestBookInput = ({ refetch }: { refetch: () => void }) => {
  const guestBookInput = useInput('', (e) => e.target.value.length <= 150);
  const { mutate } = usePostGuestBook();
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSubmitGuestBook = () => {
    if (guestBookInput.value.length === 0) {
      ToastManager.error('최소 한글자 이상 입력해주세요');
      return;
    }
    mutate(
      {
        comment: guestBookInput.value,
        avatar: avatar ?? GuestBookAvatarList[0].icon,
      },
      {
        onSuccess: () => {
          refetch();
          guestBookInput.setValue('');
          ToastManager.success('💚 방명록이 작성되었습니다!');
        },
      }
    );
  };

  return (
    <Flex
      className={styles.form}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      margin={'0 auto'}
      width={'100%'}
    >
      <Image
        src={avatar ?? GuestBookAvatarList[0].icon}
        alt="avatar"
        width={30}
        height={30}
      />
      <DropDown
        items={GuestBookAvatarList}
        onChangeSelectedItem={(item) => {
          if (item?.icon) {
            setAvatar(item.icon);
          }
        }}
      />

      <SeedTextFieldRoot size="large" style={{ flex: '1 1 320px' }}>
        <SeedTextFieldInput
          value={guestBookInput.value}
          onChange={guestBookInput.onChange}
          placeholder="😀 방명록을 적어주세요"
          style={{
            fontSize: '1rem',
          }}
          aria-label="방명록 내용"
        />
      </SeedTextFieldRoot>
      <ActionButton
        disabled={guestBookInput.error}
        type="button"
        onClick={handleSubmitGuestBook}
        variant="brandSolid"
        size="large"
      >
        쓰기
      </ActionButton>
      <ToastContainer enterTimeout={1000} leaveTimeout={1000} />
    </Flex>
  );
};

export default GuestBookInput;
