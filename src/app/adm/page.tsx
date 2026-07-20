"use client";

import { useState } from "react";

interface StatusItem {
  label: string;
  status: "ok" | "warn" | "error" | "unknown";
  detail: string;
}

function buildStatusItems(): { items: StatusItem[]; comingSoon: boolean } {
  const items: StatusItem[] = [];

  const addEnv = (name: string, label: string) => {
    const val = typeof process !== "undefined" ? process.env[name] : undefined;
    items.push({
      label,
      status: val ? "ok" : "error",
      detail: val ? "Configured" : "Not set",
    });
  };

  addEnv("NEXT_PUBLIC_SITE_URL", "Site URL");
  addEnv("NEXT_PUBLIC_SUPABASE_URL", "Supabase URL");
  addEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "Supabase Anon Key");
  addEnv("NEXT_PUBLIC_POSTHOG_KEY", "PostHog");
  addEnv("NEXT_PUBLIC_GA_ID", "Google Analytics (GA4)");
  addEnv("NEXT_PUBLIC_META_PIXEL_ID", "Meta Pixel");
  addEnv("NEXT_PUBLIC_SENTRY_DSN", "Sentry DSN");
  addEnv("RESEND_API_KEY", "Resend");
  addEnv("SLACK_BOT_TOKEN", "Slack Bot");

  const cs = process.env.NEXT_PUBLIC_COMING_SOON === "true";
  items.push({
    label: "Coming Soon Mode",
    status: cs ? "warn" : "ok",
    detail: cs ? "Landing page active (hero hidden, waitlist only)" : "Full site visible",
  });

  items.push({
    label: "Airbnb Integration",
    status: "warn",
    detail: "Listing not yet live on Airbnb",
  });

  return { items, comingSoon: cs };
}

const initialStatus = buildStatusItems();

export default function AdminDashboard() {
  const [status] = useState<StatusItem[]>(initialStatus.items);
  const isComingSoon = initialStatus.comingSoon;

  const handleToggleComingSoon = async () => {
    if (confirm("Toggle coming-soon mode and redeploy? This will trigger a Vercel deployment.")) {
      const res = await fetch("/api/deploy/toggle-coming-soon", { method: "POST" });
      if (res.ok) {
        alert("Redeploy triggered. The site will update in a few minutes.");
      } else {
        alert("Failed to trigger redeploy. Check server logs.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-stone-800">Dashboard</h1>
        <button
          onClick={handleToggleComingSoon}
          className="rounded-lg bg-stone-800 px-6 py-2 font-body text-sm font-medium text-white hover:bg-stone-700"
        >
          Toggle Coming Soon &amp; Redeploy
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {status.map((item) => (
          <div key={item.label} className="rounded-xl border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-body text-sm font-medium text-stone-700">{item.label}</h3>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  item.status === "ok"
                    ? "bg-green-500"
                    : item.status === "warn"
                      ? "bg-amber-500"
                      : item.status === "error"
                        ? "bg-red-500"
                        : "bg-stone-300"
                }`}
              />
            </div>
            <p className="mt-1 font-body text-xs text-stone-500">{item.detail}</p>
          </div>
        ))}
      </div>

      {isComingSoon && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-body text-sm font-medium text-amber-800">
            Coming-soon mode is active. The full site is hidden behind a landing page.
          </p>
        </div>
      )}
    </div>
  );
}
