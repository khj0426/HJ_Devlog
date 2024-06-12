'use client';

import NotFoundErrorFallback from "@/Component/Common/ErrorFallback/NotFoundErrorfallback";

export default function BlogSlugErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <NotFoundErrorFallback />;
}
