"use client";

import posthog from "posthog-js";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PosthogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    let url = window.origin + pathname;
    if (searchParams?.toString()) {
      url += `?${searchParams.toString()}`;
    }
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PosthogPageView() {
  return (
    <Suspense fallback={null}>
      <PosthogPageViewInner />
    </Suspense>
  );
}

export function initPosthog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
  if (key && typeof window !== "undefined") {
    posthog.init(key, {
      api_host: host,
      ui_host: host,
      capture_pageview: false,
      capture_pageleave: true,
    });
  }
}
