import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { lodgingBusinessSchema, websiteSchema, jsonLdScript } from "@/lib/json-ld";
import { PostHogProvider, MetaPixelProvider, GA4Provider } from "@/components/providers/Analytics";
import { PosthogPageView } from "@/lib/posthog";
import { Analytics } from "@vercel/analytics/react";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#8B7D6B",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: isComingSoon
      ? "The Susegad Courtyard | Coming Soon — Anjuna, Goa"
      : "The Susegad Courtyard | Heritage Home & Peaceful Escape in Goa",
    template: isComingSoon ? "%s" : "%s | The Susegad Courtyard",
  },
  description: isComingSoon
    ? "A heritage courtyard home near Anjuna Beach, Goa. Opening soon. Sign up for updates."
    : "Experience the art of Susegad living at our heritage courtyard home in Goa. Authentic Goan hospitality, peaceful stays, and unforgettable experiences.",
  keywords: [
    "Goa stay",
    "Anjuna Beach",
    "heritage home Goa",
    "self-catered Goa",
    "Susegad Courtyard",
    "vacation rental Goa",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: isComingSoon
      ? "The Susegad Courtyard | Coming Soon — Anjuna, Goa"
      : "The Susegad Courtyard | Heritage Home in Goa",
    description: isComingSoon
      ? "A heritage courtyard home near Anjuna Beach, Goa. Opening soon."
      : "A heritage standalone home, five minutes from Anjuna Beach. Self-catered stays surrounded by nature-preserved greenery.",
    images: siteConfig.gallery.length > 0
      ? [{ url: `${siteConfig.url}${siteConfig.gallery[0].src}`, width: 1200, height: 800, alt: siteConfig.gallery[0].alt }]
      : [],
  },
  twitter: {
    card: "summary_large_image",
    title: isComingSoon
      ? "The Susegad Courtyard | Coming Soon — Anjuna, Goa"
      : "The Susegad Courtyard | Heritage Home in Goa",
    description: isComingSoon
      ? "A heritage courtyard home near Anjuna Beach, Goa. Opening soon."
      : "A heritage standalone home, five minutes from Anjuna Beach. Self-catered stays surrounded by nature-preserved greenery.",
    images: siteConfig.gallery.length > 0 ? [`${siteConfig.url}${siteConfig.gallery[0].src}`] : [],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: siteConfig.name },
};

const jsonLdScripts = [websiteSchema(), lodgingBusinessSchema()].map(jsonLdScript);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;

  return (
    <html lang="en" className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async nonce={nonce} src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
        {jsonLdScripts.map((script, i) => (
          <script key={i} type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: script }} />
        ))}
      </head>
      <body className="min-h-full min-w-full flex flex-col bg-secondary text-primary">
        <PostHogProvider>
          <PosthogPageView />
          <MetaPixelProvider>
            <GA4Provider>
              {children}
            </GA4Provider>
          </MetaPixelProvider>
        </PostHogProvider>

        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <noscript>
            <img
              height="1" width="1" style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        <Analytics />
      </body>
    </html>
  );
}
