"use client";

import { Suspense, useEffect, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    import("posthog-js").then((posthog) => {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url += `?${searchParams.toString()}`;
      }
      posthog.default.capture("$pageview", { $current_url: url });
    });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}

function MetaPixelInner() {
  const pathname = usePathname();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (!pixelId || typeof window === "undefined") return;

    const loadPixel = () => {
      if (document.querySelector(`script[data-pixel-id="${pixelId}"]`)) return;

      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      script.dataset.pixelId = pixelId;
      document.head.appendChild(script);
    };

    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          setTimeout(loadPixel, 1000);
          observer.disconnect();
        }
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      setTimeout(() => {
        observer.disconnect();
        loadPixel();
      }, 5000);
    } else {
      setTimeout(loadPixel, 2000);
    }

    if (pathname) {
      window.fbq?.("track", "PageView");
    }
  }, [pathname, pixelId]);

  return null;
}

export function MetaPixelProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <MetaPixelInner />
      </Suspense>
      {children}
    </>
  );
}

function GA4Inner() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    if (!document.querySelector(`script[data-ga-id="${gaId}"]`)) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      script.dataset.gaId = gaId;
      document.head.appendChild(script);

      const inline = document.createElement("script");
      inline.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(inline);
    }

    if (pathname) {
      window.dataLayer?.push({
        event: "page_view",
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname, gaId]);

  return null;
}

export function GA4Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <GA4Inner />
      </Suspense>
      {children}
    </>
  );
}

export function GaPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;
    window.dataLayer?.push({
      event: "page_view",
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}
