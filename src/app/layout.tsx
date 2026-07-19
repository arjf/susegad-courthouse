import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Susegad Courtyard | Heritage Home & Peaceful Escape in Goa",
    template: "%s | The Susegad Courtyard",
  },
  description:
    "Experience the art of Susegad living at our heritage courtyard home in Goa. Authentic Goan hospitality, peaceful stays, and unforgettable experiences.",
  keywords: [
    "Goa stay",
    "Anjuna Beach",
    "heritage home Goa",
    "self-catered Goa",
    "Susegad Courtyard",
    "vacation rental Goa",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "The Susegad Courtyard | Heritage Home in Goa",
    description:
      "A heritage standalone home, five minutes from Anjuna Beach. Self-catered stays surrounded by nature-preserved greenery.",
    images: [
      {
        url: siteConfig.gallery[0].src,
        width: 1200,
        height: 800,
        alt: siteConfig.gallery[0].alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Susegad Courtyard | Heritage Home in Goa",
    description:
      "A heritage standalone home, five minutes from Anjuna Beach. Self-catered stays surrounded by nature-preserved greenery.",
    images: [siteConfig.gallery[0].src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "travel",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: siteConfig.gallery.map((g) => g.src),
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Anjuna Beach",
    addressLocality: "Anjuna",
    addressRegion: "Goa",
    postalCode: "403509",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.contact.mapCoordinates.lat,
    longitude: siteConfig.contact.mapCoordinates.lng,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.property.rating,
    reviewCount: siteConfig.property.reviewCount,
  },
  amenityFeature: siteConfig.property.amenities.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .replace(/&/g, "\\u0026");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full min-w-full flex flex-col bg-secondary text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
        {children}
      </body>
    </html>
  );
}
