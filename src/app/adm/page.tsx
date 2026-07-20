import { ComingSoonToggle } from "@/components/admin/ComingSoonToggle";

interface StatusItem {
  label: string;
  status: "ok" | "warn" | "error" | "unknown";
  detail: string;
}

function buildStatusItems(): StatusItem[] {
  const items: StatusItem[] = [];

  const addEnv = (name: string, label: string) => {
    const val = process.env[name];
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
  addEnv("VERCEL_TOKEN", "Vercel API Token");
  addEnv("VERCEL_PROJECT_ID", "Vercel Project ID");

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

  return items;
}

export default function AdminDashboard() {
  const status = buildStatusItems();
  const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

  return (
    <div className="space-y-8">
      <ComingSoonToggle initial={isComingSoon} />

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
