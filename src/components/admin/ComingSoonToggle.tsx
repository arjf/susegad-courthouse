"use client";

import { useState } from "react";

export function ComingSoonToggle({ initial }: { initial: boolean }) {
  const [comingSoon, setComingSoon] = useState(initial);

  const handleToggle = async () => {
    if (!confirm("Toggle coming-soon mode and redeploy? This will trigger a Vercel deployment.")) return;

    const res = await fetch("/api/deploy/toggle-coming-soon", { method: "POST" });
    if (res.ok) {
      setComingSoon((v) => !v);
      alert("Redeploy triggered. The site will update in a few minutes.");
    } else {
      alert("Failed to trigger redeploy. Check server logs.");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-heading text-3xl font-bold text-stone-800">Dashboard</h1>
      <button
        onClick={handleToggle}
        className="rounded-lg bg-stone-800 px-6 py-2 font-body text-sm font-medium text-white hover:bg-stone-700"
      >
        Toggle Coming Soon &amp; Redeploy
      </button>
    </div>
  );
}
