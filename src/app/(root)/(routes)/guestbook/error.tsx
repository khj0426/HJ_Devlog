'use client';

import { NextApiResponse } from 'next';

import { useEffect } from 'react';

import Link from 'next/link';

import { ToastContainer, ToastManager } from '@/Component/Common/Toast';

export default function Error({
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
      <ToastContainer enterTimeout={2000} leaveTimeout={10000} />
      <Link href="/">홈으로 이동</Link>
    </div>
  );
}
