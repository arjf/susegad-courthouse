import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const results: Record<string, { success: boolean; error?: string }> = {};

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
              Prefer: "resolution=merge-duplicates",
            },
            body: JSON.stringify({ email }),
          }
        );
        results.supabase = res.ok
          ? { success: true }
          : { success: false, error: `Supabase: ${res.status} ${res.statusText}` };
      } catch (e) {
        results.supabase = { success: false, error: `Supabase: ${String(e)}` };
      }
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/contacts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        results.resend = res.ok
          ? { success: true }
          : { success: false, error: `Resend: ${res.status} ${res.statusText}` };
      } catch (e) {
        results.resend = { success: false, error: `Resend: ${String(e)}` };
      }
    }

    if (process.env.SHEETS_WEBHOOK_URL) {
      try {
        const res = await fetch(process.env.SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            timestamp: new Date().toISOString(),
            source: "thesusegadcourtyard.com",
          }),
        });
        results.sheets = res.ok
          ? { success: true }
          : { success: false, error: `Sheets: ${res.status} ${res.statusText}` };
      } catch (e) {
        results.sheets = { success: false, error: `Sheets: ${String(e)}` };
      }
    }

    const anySuccess = Object.values(results).some((r) => r.success);
    return NextResponse.json(
      { success: anySuccess, results },
      { status: anySuccess ? 200 : 500 }
    );
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
