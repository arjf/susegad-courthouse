import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";
import AnimateIn from "@/components/ui/AnimateIn";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A heritage standalone home five minutes from Anjuna Beach, Goa. Self-catered stays surrounded by nature-preserved greenery. Learn our story.",
};

const propertyFacts = [
  { label: "Bedrooms", value: siteConfig.property.bedrooms },
  { label: "Bathrooms", value: siteConfig.property.bathrooms },
  { label: "Max Guests", value: siteConfig.property.maxGuests },
  { label: "Walk to Anjuna Beach", value: siteConfig.property.minAnjunaBeach },
  { label: "Guest Rating", value: `${siteConfig.property.rating} / 5` },
  { label: "Reviews", value: siteConfig.property.reviewCount },
];

export default function AboutPage() {
  return (
    <>
      <NavBar externalLinks={siteConfig.nav.external} />

      <main className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-24">
        <AnimateIn direction="up">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center md:mb-16">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Our Story
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                {siteConfig.tagline}
              </h1>
            </div>

            <div className="space-y-6 font-body text-lg leading-relaxed text-primary/70">
              <p>{siteConfig.description}</p>
              <p>
                A modest standalone home, five minutes from Anjuna Beach, tucked
                behind an inward walkway with a private gate. Surrounded by
                nature-preserved plots, our courtyard house offers the space and
                solitude Goa is meant for. No resort frills &mdash; just a stocked
                kitchen, reliable WiFi, a washing machine, and the freedom to live
                at your own pace.
              </p>
              {siteConfig.property.noServices && (
                <p className="text-base text-primary/60">
                  <em>
                    Self-catered stay. No breakfast, cleaning, or food delivery
                    services.
                  </em>
                </p>
              )}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6 border-y border-border py-10 md:grid-cols-3">
              {propertyFacts.map((fact) => (
                <div key={fact.label} className="text-center">
                  <p className="font-heading text-3xl font-bold text-accent1">
                    {fact.value}
                  </p>
                  <p className="mt-1 font-body text-sm text-primary/60">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-center font-heading text-3xl font-bold text-primary md:text-4xl">
                What You Get
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteConfig.property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent1/10 text-accent1">
                      <Check size={16} />
                    </span>
                    <span className="font-body text-sm font-medium text-primary">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">
                Ready to Stay?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-lg text-primary/70">
                Book the entire home or a single room on Airbnb, or message us
                directly on WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <PrimaryButton
                  text="Book on Airbnb"
                  variant="accent1"
                  size="lg"
                  href={siteConfig.booking.airbnbUrl}
                />
                <PrimaryButton
                  text="Chat on WhatsApp"
                  variant="outline"
                  size="lg"
                  href={siteConfig.social.whatsapp}
                />
              </div>
            </div>
          </div>
        </AnimateIn>
      </main>

      <Footer />
      <WhatsAppFloat
        phoneNumber={siteConfig.social.whatsappNumber}
        message={siteConfig.social.whatsappMessage}
      />
    </>
  );
}
