import { useCallback } from 'react';

import Flex from '@/Component/Common/Flex/Flex';
import { ToastManager, ToastContainer } from '@/Component/Common/Toast';
import { Input, InputBox } from '@/Component/Input';
import usePostGuestBook from '@/hooks/mutations/useGuestBookMutation';
import useInput from '@/hooks/useInput';
import { Button } from '@/stories/Button';
const GuestBookInput = ({ refetch }: { refetch: () => void }) => {
  const guestBookInput = useInput('', (e) => e.target.value.length <= 150);
  const { mutate } = usePostGuestBook();

  const handleSubmitGuestBook = () => {
    if (guestBookInput.value.length === 0) {
      ToastManager.error('최소 한글자 이상 입력해주세요');
      return;
    }
    mutate(
      {
        comment: guestBookInput.value,
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
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      margin={'0 auto'}
      width={'80%'}
    >
      <InputBox width="350px" color="#f8f9fa">
        <Input
          {...guestBookInput}
          placeholder="😀 방명록을 적어주세요"
          style={{
            fontSize: '1rem',
          }}
        />
      </InputBox>
      <Button
        disabled={guestBookInput.error}
        label="쓰기"
        type="button"
        style={{
          borderRadius: '7px',
        }}
        onClick={handleSubmitGuestBook}
        backgroundColor="#f8f9fa"
      >
        쓰기
      </Button>
      <ToastContainer enterTimeout={1000} leaveTimeout={1000} />
    </Flex>
  );
};

export default GuestBookInput;
