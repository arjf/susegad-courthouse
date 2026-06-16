"use client";

import { siteConfig } from "@/lib/config";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";
import AnimateIn from "@/components/ui/AnimateIn";
import Image from "next/image";
import { MapPin, Star, Clock, Utensils, History, Waves } from "lucide-react";

interface GuidePlace {
  name: string;
  description: string;
  highlights: string[];
  image: string;
  rating?: string;
  category?: string;
  hours?: string;
  price?: string;
}

const guideData: Record<string, { title: string; icon: React.ReactNode; places: GuidePlace[] }> = {
  beaches: {
    title: "Pristine Beaches",
    icon: <Waves className="text-accent1" size={24} />,
    places: [
      {
        name: "Anjuna Beach",
        description: "As the iconic stretch of sand that put this region on the map, this beach is essential for any local guide. It beautifully balances the laid-back Goan spirit with a lively, energetic atmosphere.",
        highlights: [
          "Great for water sports enthusiasts looking to enjoy parasailing and jet skiing.",
          "Dotted with classic beach shacks serving fresh seafood and cold drinks.",
          "Known globally for its stunning sunsets over the Arabian Sea.",
        ],
        image: "https://images.unsplash.com/photo-1589982437477-67971626a86f?w=800&q=80",
      },
      {
        name: "Ozran Beach",
        rating: "4.5",
        category: "Beach",
        description: "Often referred to as Little Vagator, this is a highly scenic and slightly more secluded spot framed by green hills and unique rock formations.",
        highlights: [
          "Offers a more relaxed and peaceful vibe compared to the busier main beaches.",
          "Features cozy palapas and beach chairs for comfortable lounging.",
          "Excellent for guests who want to escape the heavier crowds for a quiet afternoon.",
        ],
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      },
    ],
  },
  culture: {
    title: "History & Culture",
    icon: <History className="text-accent1" size={24} />,
    places: [
      {
        name: "Chapora Fort",
        rating: "4.2",
        hours: "Closes 5:00 PM",
        description: "This ruined, centuries-old fortress sits high on a headland and offers a touch of history along with breathtaking panoramic views of the coastline.",
        highlights: [
          "Famous as one of the best sunset viewing spots in North Goa.",
          "Requires a short, scenic hike to reach the top, appealing to active guests.",
          "Offers sweeping, photogenic views of the surrounding beaches and river.",
        ],
        image: "https://images.unsplash.com/photo-1626621341717-C77779737094?w=800&q=80",
      },
      {
        name: "Anjuna Flea Market",
        rating: "3.9",
        category: "Market",
        description: "A vibrant, sprawling market that operates every Wednesday, perfect for guests looking to shop for souvenirs or experience the famous local bohemian culture.",
        highlights: [
          "Packed with countless stalls selling handmade crafts, jewelry, and beachwear.",
          "Features live music, food stalls, and a lively, colorful atmosphere.",
          "A great place for visitors to practice their bargaining skills.",
        ],
        image: "https://images.unsplash.com/photo-1533900272598-77339966628e?w=800&q=80",
      },
    ],
  },
  dining: {
    title: "Cafes & Dining",
    icon: <Utensils className="text-accent1" size={24} />,
    places: [
      {
        name: "Artjuna Cafe",
        rating: "4.2",
        price: "₹400-₹1,400",
        category: "Restaurant",
        hours: "Closes 10:30 PM",
        description: "This Portuguese-style cafe and lifestyle space is a massive hit with both locals and tourists, focusing heavily on health, wellness, and international cuisine.",
        highlights: [
          "Known for fantastic Mediterranean dishes, fresh bakes, and healthy breakfast bowls.",
          "Hosts a charming boutique shop offering clothing and unique jewelry.",
          "Features a relaxed, open-air garden setting where guests can unwind for hours.",
        ],
        image: "https://images.unsplash.com/photo-1554118811-1e0d572d9675?w=800&q=80",
      },
      {
        name: "CAFFE SICILY",
        rating: "4.6",
        price: "₹400-₹1,200",
        category: "European restaurant",
        hours: "Closes 12:00 AM Wed",
        description: "A top-rated local dining spot situated right in the neighborhood, known for its warm hospitality and high-quality comfort food.",
        highlights: [
          "Serves a delicious mix of authentic Italian meals and classic cafe fare.",
          "Offers a cozy, laid-back environment perfect for a casual lunch or a relaxed dinner.",
          "Highly praised by reviewers for its excellent, welcoming service.",
        ],
        image: "https://images.unsplash.com/photo-1554118811-1e0d572d9675?w=800&q=80",
      },
      {
        name: "Goa's Ark Restaurant",
        rating: "4.4",
        price: "₹400-₹1,600",
        category: "Mediterranean restaurant",
        description: "A fantastic multicuisine restaurant with an easygoing vibe, located very close to the neighborhood and popular with a wide range of travelers.",
        highlights: [
          "Serves a diverse menu featuring Mediterranean and Middle Eastern specialties.",
          "Known for its simple, charming surroundings tucked away from the main road.",
          "Features a welcoming, family-friendly atmosphere.",
        ],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      },
    ],
  },
};

export default function ExplorePage() {
  return (
    <>
      <NavBar externalLinks={siteConfig.nav.external} />
      
      <main className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-24">
        <AnimateIn direction="up">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center md:mb-24">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Local Guide
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                Explore Anjuna
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-primary/70">
                The Susegad Courtyard is your gateway to the best of North Goa. 
                From hidden beaches to artisanal cafes, here is our curated guide to the neighborhood.
              </p>
            </div>

            <div className="space-y-24">
              {Object.entries(guideData).map(([key, category]) => (
                <div key={key}>
                  <div className="mb-10 flex items-center gap-4 border-b border-border pb-4">
                    {category.icon}
                    <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {category.places.map((place, i) => (
                      <AnimateIn key={place.name} direction="up" delay={i * 0.1}>
                        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-md">
                          <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                              src={place.image}
                              alt={place.name}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-heading text-xl font-bold text-primary">
                                {place.name}
                              </h3>
                              {place.rating && (
                                <div className="flex items-center gap-1 font-body text-xs font-bold text-accent1">
                                  <Star size={12} fill="currentColor" />
                                  {place.rating}
                                </div>
                              )}
                            </div>
                            
                            {(place.category || place.hours || place.price) && (
                              <div className="mb-4 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-wider text-primary/50">
                                {place.category && <span className="flex items-center gap-1">📍 {place.category}</span>}
                                {place.hours && <span className="flex items-center gap-1">🕒 {place.hours}</span>}
                                {place.price && <span className="flex items-center gap-1">💰 {place.price}</span>}
                              </div>
                            )}

                            <p className="mb-4 font-body text-sm leading-relaxed text-primary/70">
                              {place.description}
                            </p>
                            <ul className="space-y-2">
                              {place.highlights.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 font-body text-xs text-primary/60">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent1" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AnimateIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </main>

      <Footer
        links={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Explore", href: "/explore" },
          { label: "Contact", href: "/contact" },
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
