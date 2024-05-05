import { useMutation } from '@tanstack/react-query';

import { post } from '@/utils/axiosClient';
export const postGuestBook = async ({
  comment,
  avatar,
}: {
  comment: string;
  avatar: string;
}) => {
  return await post('api/guestbook', {
    comment,
    avatar,
    time: new Date().toUTCString(),
  });
};

const usePostGuestBook = () => {
  return useMutation({
    mutationFn: postGuestBook,
  });
};

export default usePostGuestBook;
