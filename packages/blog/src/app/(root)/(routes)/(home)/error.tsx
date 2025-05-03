"use client";

import ErrorFallback from "~/packages/shared/src/components/ErrorFallback/Errorfallback";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} />;
}
