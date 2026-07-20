"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

let globalToken: string | null = null;
let fetchPromise: Promise<string | null> | null = null;

function fetchToken(): Promise<string | null> {
  if (globalToken) return Promise.resolve(globalToken);
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/auth/csrf-token")
    .then((r) => r.json())
    .then((data) => {
      globalToken = data.token;
      return globalToken;
    })
    .catch(() => null);

  return fetchPromise;
}

export function useCsrfToken(): () => Promise<string | null> {
  return fetchToken;
}

export function CsrfTokenProvider({ children }: { children: ReactNode }) {
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      fetchToken();
    }
  }, []);

  return <>{children}</>;
}
