"use client";

import { useEffect } from "react";

import ErrorFallback from "@hj-devlog/shared/src/components/ErrorFallback/Errorfallback";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.setContext("Application 에러", {
      error,
    });

    Sentry.withScope((scope) => {
      scope.setTag("type", "Application");
      scope.setTag("error-name", error.name);

      Sentry.captureException(error, {
        level: "error",
        extra: {
          type: "Application 에러",
          ...error,
        },
      });
    });
  }, []);
  return <ErrorFallback error={error} reset={reset} />;
}
