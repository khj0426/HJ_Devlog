import { useState } from "react";

import DropDown from "@hj-devlog/shared/src/components/DropDown/DropDown";
import Flex from "@hj-devlog/shared/src/components/Flex/Flex";
import {
  ToastManager,
  ToastContainer,
} from "@hj-devlog/shared/src/components/Toast";
import useInput from "@hj-devlog/shared/src/hooks/useInput";
import Image from "next/image";

import usePostGuestBook from "~/src/hooks/mutations/useGuestBookMutation";

import { Input, InputBox } from "../Input";

import { GuestBookAvatarList } from "./constants";
import { Button } from "@hj-devlog/shared/src/Button";
const GuestBookInput = ({ refetch }: { refetch: () => void }) => {
  const guestBookInput = useInput("", (e) => e.target.value.length <= 150);
  const { mutate } = usePostGuestBook();
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSubmitGuestBook = () => {
    if (guestBookInput.value.length === 0) {
      ToastManager.error("최소 한글자 이상 입력해주세요");
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
          guestBookInput.setValue("");
          ToastManager.success("💚 방명록이 작성되었습니다!");
        },
      }
    );
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      margin={"0 auto"}
      width={"80%"}
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

      <InputBox width="350px" color="#f8f9fa">
        <Input
          {...guestBookInput}
          placeholder="😀 방명록을 적어주세요"
          style={{
            fontSize: "1rem",
          }}
        />
      </InputBox>
      <Button
        disabled={guestBookInput.error}
        label="쓰기"
        type="button"
        style={{
          borderRadius: "7px",
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
