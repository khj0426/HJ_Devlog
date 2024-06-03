'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Flex from '@/Component/Common/Flex/Flex';
import { ToastContainer, ToastManager } from '@/Component/Common/Toast';
import ErrorImage from '~/public/images/404-Space.png';

export default function NotFoundErrorFallback() {
  useEffect(() => {
    ToastManager.error(
      '페이지를 찾을 수 없습니다',
      '서비스를 이용할 수 없습니다',
      6000
    );
  }, []);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="50px"
      >
        <Image
          src={ErrorImage}
          alt="에러 메시지"
          width={350}
          height={350}
          style={{
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
        <ToastContainer enterTimeout={2000} leaveTimeout={10000} />
        <Link href="/">홈으로 이동</Link>
      </Flex>
    </div>
  );
}
