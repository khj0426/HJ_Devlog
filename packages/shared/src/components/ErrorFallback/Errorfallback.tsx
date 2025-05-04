"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Flex from "../Flex/Flex";
import { ToastManager, ToastContainer } from "../Toast";

export default function ErrorFallback({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    ToastManager.error(
      "에러가 발생했습니다",
      "서비스를 이용할 수 없습니다",
      6000
    );
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Image
          src={
            "https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg"
          }
          alt="에러 메시지"
          width={350}
          height={350}
          style={{
            borderRadius: "10px",
          }}
        />
        <ToastContainer enterTimeout={2000} leaveTimeout={10000} />
        <Link href="/">홈으로 이동</Link>
      </Flex>
    </div>
  );
}
