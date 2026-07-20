import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";

export async function POST() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    return NextResponse.json({ error: "PostHog not configured" }, { status: 400 });
  }

  try {
    const res = await fetch("https://eu.i.posthog.com/capture/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event: "admin_debug_test",
        distinct_id: "admin@thesusegadcourtyard.com",
        properties: {
          source: "admin_debug_page",
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!res.ok) {
      console.error("[debug/posthog-test] PostHog error:", await res.text());
      return NextResponse.json({ error: "Failed to send event" }, { status: 500 });
    }

    console.log("[debug/posthog-test] Event sent to PostHog");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[debug/posthog-test] Error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
