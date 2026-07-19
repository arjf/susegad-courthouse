import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Anjuna",
  description:
    "A curated local guide to Anjuna, Goa — pristine beaches, history & culture, and the best cafes and dining near The Susegad Courtyard.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore Anjuna | The Susegad Courtyard",
    description:
      "A curated local guide to Anjuna, Goa — beaches, culture, and dining near The Susegad Courtyard.",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
