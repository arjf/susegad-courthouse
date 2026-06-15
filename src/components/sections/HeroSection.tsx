"use client";

import BookingWidget from "./BookingWidget";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function HeroSection() {
  const handleSearch = (data: { checkIn: string; checkOut: string; guests: number }) => {
    console.log("Search:", data);
  };

  return (
    <section className="min-h-screen bg-secondary">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-24 md:px-12 lg:px-16">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
            The Susegad Courtyard
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl lg:leading-[1.1]">
            A Heritage Home.
            <br />
            A Peaceful Escape.
            <br />
            A Way of Life.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-primary/70">
            Wake up to nature, savor authentic Goan flavors and create memories that last a lifetime.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton text="Explore Rooms" variant="accent1" size="lg" />
            <PrimaryButton text="View Experiences" variant="outline" size="lg" />
          </div>
          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="font-heading text-2xl font-bold text-primary">12+</p>
              <p className="font-body text-sm text-primary/60">Heritage Rooms</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-primary">50+</p>
              <p className="font-body text-sm text-primary/60">Experiences</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-primary">500+</p>
              <p className="font-body text-sm text-primary/60">Happy Guests</p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-12 md:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <BookingWidget onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}
