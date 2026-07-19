import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Susegad Courtyard in Anjuna, Goa. Ask about your stay or book an experience — we reply on email and WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | The Susegad Courtyard",
    description:
      "Get in touch with The Susegad Courtyard in Anjuna, Goa.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
