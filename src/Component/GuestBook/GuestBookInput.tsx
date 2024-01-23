import { ToastManager, ToastContainer } from '@/Component/Common/Toast';
import { Input, InputBox } from '@/Component/Input';
import usePostGuestBook from '@/hooks/mutations/useGuestBookMutation';
import useInput from '@/hooks/useInput';
import { Button } from '@/stories/Button';
const GuestBookInput = ({ refetch }: { refetch: () => void }) => {
  const guestBookInput = useInput(
    '',
    (e) => e.target.value.length <= 150 && e.target.value.length !== 0
  );
  const { mutate } = usePostGuestBook();

  const handleSubmitGuestBook = () => {
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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '80%',
        margin: '20px auto',
      }}
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
    </div>
  );
};

export default GuestBookInput;
