import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { withCsrf } from "@/lib/csrf";

export const POST = withCsrf(async function (req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subject, body } = await req.json();

  if (!subject) {
    return NextResponse.json({ error: "Subject is required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Resend is not configured" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "debug@thesusegadcourtyard.com",
      to: user.email!,
      subject,
      text: body || "This is a test email from the Susegad admin debug panel.",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[debug/test-email] Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  console.log(`[debug/test-email] Test email sent to ${user.email}`);
  return NextResponse.json({ success: true });
});
