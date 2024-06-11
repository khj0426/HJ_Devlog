'use client';

import ErrorFallback from '@/Component/Common/ErrorFallback/Errorfallback';

export default function BlogSlugErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} />;
}
