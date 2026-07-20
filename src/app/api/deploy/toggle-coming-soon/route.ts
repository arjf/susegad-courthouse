import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vercelToken = process.env.VERCEL_TOKEN;
  const vercelTeam = process.env.VERCEL_TEAM_ID;
  const vercelProject = process.env.VERCEL_PROJECT_ID;

  if (!vercelToken || !vercelProject) {
    return NextResponse.json({ error: "Vercel API token not configured" }, { status: 400 });
  }

  try {
    const currentCs = process.env.NEXT_PUBLIC_COMING_SOON === "true";
    const newCs = currentCs ? "false" : "true";

    const queryParams = new URLSearchParams();
    if (vercelTeam) queryParams.set("teamId", vercelTeam);

    const url = `https://api.vercel.com/v1/projects/${vercelProject}/env${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    // Upsert the env var
    const upsertRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "NEXT_PUBLIC_COMING_SOON",
        value: newCs,
        type: "encrypted",
        target: ["production"],
        upsert: true,
      }),
    });

    if (!upsertRes.ok) {
      const err = await upsertRes.text();
      console.error("[toggle-coming-soon] Vercel env error:", err);
      return NextResponse.json({ error: "Failed to update env var" }, { status: 500 });
    }

    // Trigger new deployment
    const deployRes = await fetch(
      `https://api.vercel.com/v1/deployments${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "susegad-courthouse",
          project: vercelProject,
          target: "production",
        }),
      },
    );

    if (!deployRes.ok) {
      const err = await deployRes.text();
      console.error("[toggle-coming-soon] Vercel deploy error:", err);
      return NextResponse.json({ error: "Failed to trigger deployment" }, { status: 500 });
    }

    console.log(`[toggle-coming-soon] Toggled to ${newCs}, deployment started`);
    return NextResponse.json({ success: true, comingSoon: newCs === "true" });
  } catch (err) {
    console.error("[toggle-coming-soon] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
