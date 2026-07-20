import { getUser } from "@/lib/supabase/server";
import { withCsrf } from "@/lib/csrf";
import * as Sentry from "@sentry/nextjs";

export const POST = withCsrf(async function () {
  const user = await getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  Sentry.captureException(new Error("Admin-triggered test error from debug page"));

  console.log("[admin-debug] Sentry test error captured by:", user.email);

  return new Response(null, { status: 204 });
});
