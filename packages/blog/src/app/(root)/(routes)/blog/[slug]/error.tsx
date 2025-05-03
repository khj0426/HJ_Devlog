"use client";

import NotFoundErrorFallback from "~/packages/shared/src/components/ErrorFallback/NotFoundErrorfallback";

export default function BlogSlugErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <NotFoundErrorFallback />;
}
