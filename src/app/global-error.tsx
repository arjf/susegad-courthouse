"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-secondary p-6">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-primary">Something went wrong</h1>
          <p className="mt-4 font-body text-primary/60">We&apos;ve been notified and will look into it.</p>
          <button
            onClick={reset}
            className="mt-6 rounded-lg bg-accent1 px-6 py-3 font-body text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
