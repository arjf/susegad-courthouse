"use client";

import dynamic from "next/dynamic";

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

const ComingSoonPage = dynamic(() => import("@/components/ComingSoon"), {
  ssr: false,
});
const HomeContent = dynamic(() => import("./_home-content"), { ssr: false });

export default function Home() {
  return isComingSoon ? <ComingSoonPage /> : <HomeContent />;
}
