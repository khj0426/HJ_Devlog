'use client';

import { NextApiResponse } from 'next';

import ErrorFallback from '@/Component/Common/ErrorFallback/Errorfallback';

export default function Error({
  error,
  reset,
}: {
  error: NextApiResponse;
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} />;
}
