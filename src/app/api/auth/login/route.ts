import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withCsrf } from "@/lib/csrf";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export const POST = withCsrf(async function (req: Request) {
  const rateCheck = await checkRateLimit(req);
  if (!rateCheck.allowed) {
    const retryAfter = rateCheck.blockedUntil
      ? Math.ceil((rateCheck.blockedUntil - Date.now()) / 1000)
      : 1800;
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  resetRateLimit(req);

  const passwordResetRequired = data.user?.user_metadata?.password_reset_required === true;

  return NextResponse.json({ success: true, passwordResetRequired });
});
