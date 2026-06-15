"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import NavBar from "@/components/layout/NavBar";
import FloatingNav from "@/components/layout/FloatingNav";
import HeroSection from "@/components/sections/HeroSection";
import RoomCard from "@/components/cards/RoomCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import ImageGallery from "@/components/sections/ImageGallery";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("@/components/sections/MapSection"), {
  ssr: false,
});
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";
import RegionToggle from "@/components/widgets/RegionToggle";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Home() {
  const [currency, setCurrency] = useState(siteConfig.pricing.defaultRegion);
  const rate =
    siteConfig.pricing.rates[currency as keyof typeof siteConfig.pricing.rates]
      ?.rate || 1;
  const symbol =
    siteConfig.pricing.rates[currency as keyof typeof siteConfig.pricing.rates]
      ?.symbol || "₹";

  return (
    <>
      <NavBar externalLinks={siteConfig.nav.external} />
      <FloatingNav />
      <HeroSection />
      {/* Region toggle */}
      <div className="fixed top-20 right-6 z-1000 hidden md:block">
        <RegionToggle
          onCurrencyChange={setCurrency}
          currentCurrency={currency}
        />
      </div>

      <AnimateIn direction="up">
        <section id="about" className="bg-secondary py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Our Story
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                {siteConfig.tagline}
              </h2>
              <p className="mt-6 font-body text-lg leading-relaxed text-primary/70">
                A modest standalone home, five minutes from Anjuna Beach, tucked
                behind an inward walkway with a private gate. Surrounded by
                nature-preserved plots, our courtyard house offers the space and
                solitude Goa is meant for. No resort frills — just a stocked
                kitchen, reliable WiFi, a washing machine, and the freedom to
                live at your own pace.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-primary/60">
                <em>
                  Self-catered stay. No breakfast, cleaning, or food delivery
                  services.
                </em>
              </p>
              <div className="mt-8 grid grid-cols-3 gap-8 border-t border-border pt-8">
                <div>
                  <p className="font-heading text-3xl font-bold text-accent1">
                    {siteConfig.property.bedrooms}
                  </p>
                  <p className="mt-1 font-body text-sm text-primary/60">
                    Bedrooms
                  </p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-accent1">
                    {siteConfig.property.minAnjunaBeach.split(" ")[0]} min
                  </p>
                  <p className="mt-1 font-body text-sm text-primary/60">
                    Anjuna Beach
                  </p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-accent1">
                    {siteConfig.property.rating}
                  </p>
                  <p className="mt-1 font-body text-sm text-primary/60">
                    {siteConfig.property.reviewCount} Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up" delay={0.1}>
        <section id="stay" className="bg-primary/5 py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center md:mb-12">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Stay
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                Your Home in Goa
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
                Book the entire home or a single room on Airbnb. Everything you
                need, nothing you don&apos;t. Stocked kitchen, fast WiFi,
                washing machine, and a garden view of protected greenery.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {siteConfig.rooms.map((room, i) => (
                <RoomCard
                  key={room.title}
                  image={room.image}
                  title={room.title}
                  price={currency === "inr" ? room.price : room.priceUSD}
                  capacity={room.capacity}
                  amenities={room.amenities}
                  index={i}
                  priceLabel={currency === "inr" ? "/night" : "/night"}
                  symbol={symbol}
                />
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up" delay={0.1}>
        <section id="experiences" className="bg-secondary py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center md:mb-12">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Experiences
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                Discover Goa Your Way
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
                Walk to Anjuna Beach, cook local recipes, explore spice
                plantations, or do yoga in the garden. Curated experiences, zero
                fluff.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {siteConfig.experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.title}
                  image={exp.image}
                  title={exp.title}
                  duration={exp.duration}
                  price={exp.price}
                  tag={exp.tag}
                  index={i}
                  symbol={symbol}
                  rate={rate}
                />
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up" delay={0.1}>
        <section id="gallery" className="bg-primary/5 py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center md:mb-12">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Gallery
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                A Glimpse of Paradise
              </h2>
            </div>
            <ImageGallery images={siteConfig.gallery} lightbox={true} />
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up">
        <section id="reviews" className="bg-secondary py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Testimonials
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                Loved by Travelers
              </h2>
            </div>
            <TestimonialSlider
              reviews={siteConfig.testimonials}
              autoPlay={true}
            />
          </div>
        </section>
      </AnimateIn>

      <MapSection />

      <Footer
        links={[
          { label: "About Us", href: "/about" },
          { label: "Rooms", href: "#stay" },
          { label: "Experiences", href: "#experiences" },
          { label: "Gallery", href: "#gallery" },
          { label: "Contact", href: "#contact" },
        ]}
        socialLinks={[
          { platform: "facebook", href: siteConfig.social.facebook },
          { platform: "instagram", href: siteConfig.social.instagram },
          { platform: "youtube", href: siteConfig.social.youtube },
          { platform: "whatsapp", href: siteConfig.social.whatsapp },
        ]}
        logo={
          <span className="font-heading text-2xl font-bold text-primary-foreground">
            {siteConfig.name.split(" ").slice(-1)[0]}
          </span>
        }
      />
      <WhatsAppFloat
        phoneNumber={siteConfig.social.whatsappNumber}
        message={siteConfig.social.whatsappMessage}
      />
    </>
  );
}
