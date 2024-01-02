import { Input, InputBox } from '@/Component/Input';
import usePostGuestBook from '@/hooks/mutations/useGuestBookMutation';
import useInput from '@/hooks/useInput';

const GuestBookInput = ({ refetch }: { refetch: () => void }) => {
  const guestBookInput = useInput('', (e) => e.target.value.length <= 150);
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
        },
      }
    );
  };

  return (
    <>
      <InputBox width="300px">
        <Input {...guestBookInput} />
      </InputBox>
      <button type="button" onClick={handleSubmitGuestBook}>
        쓰기
      </button>
    </>
  );
};

export default GuestBookInput;
