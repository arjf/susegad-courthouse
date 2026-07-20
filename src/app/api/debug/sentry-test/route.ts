import { createClient } from "@/lib/supabase/server";
import * as Sentry from "@sentry/nextjs";

export async function POST() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Trigger a Sentry test error (intentional, for debugging)
  Sentry.captureException(new Error("Admin-triggered test error from debug page"));

  console.log("[admin-debug] Sentry test error captured");
  console.log("[admin-debug] Admin session:", session.user.email);

  return new Response(null, { status: 204 });
}
