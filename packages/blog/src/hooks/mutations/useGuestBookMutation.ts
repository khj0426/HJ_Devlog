import { post } from "@hj-devlog/shared/src/api/blogaxiosClient";
import { useMutation } from "@tanstack/react-query";

const postGuestBook = async ({
  comment,
  avatar,
}: {
  comment: string;
  avatar: string;
}) => {
  return await post("api/guestbook", {
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
