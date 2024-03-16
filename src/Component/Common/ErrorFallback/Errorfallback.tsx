'use client';

import { NextApiResponse } from 'next';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Flex from '@/Component/Common/Flex/Flex';
import { ToastContainer, ToastManager } from '@/Component/Common/Toast';
import ErrorImage from '~/public/images/error.webp';

export default function ErrorFallback({
  error,
}: {
  error: NextApiResponse;
  reset: () => void;
}) {
  useEffect(() => {
    ToastManager.error(
      '에러가 발생했습니다',
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
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Image
          src={ErrorImage}
          alt="에러 메시지"
          width={350}
          height={350}
          style={{
            borderRadius: '10px',
          }}
        />
        <ToastContainer enterTimeout={2000} leaveTimeout={10000} />
        <Link href="/">홈으로 이동</Link>
      </Flex>
    </div>
  );
}
