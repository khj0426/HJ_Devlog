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
      5000
    );
  }, []);
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ToastContainer enterTimeout={1000} leaveTimeout={1000} />
      <Link href="/" />
    </div>
  );
}
