import type { NextConfig } from "next";

if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    "\n\u26a0\ufe0f  NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, sitemap, robots, and Open Graph metadata will fall back to the Vercel preview URL. Set it to your production domain in the Vercel Production environment.\n",
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Cache optimized images for 24h so each upstream Unsplash fetch happens
    // at most once per day per image, reducing the runtime dependency surface.
    // Self-hosting hero/critical images under /public removes it entirely.
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default nextConfig;
