"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import AvailabilityCalendar from "./AvailabilityCalendar";
import PrimaryButton from "@/components/ui/PrimaryButton";

const HeroMap = dynamic(() => import("@/components/sections/MapSection"), { ssr: false });

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/5">
      {/* Decorative background SVG */}
      <div className="pointer-events-none absolute inset-0 select-none opacity-[0.04] overflow-hidden max-w-full">
        <svg viewBox="0 0 1440 900" fill="none" className="h-full w-full max-w-full">
          <path d="M0 900V0h1440v900H0z" fill="#1E3A34" />
          <circle cx="1200" cy="200" r="400" fill="#B08D57" />
          <circle cx="200" cy="700" r="300" fill="#B08D57" />
          <path d="M0 600Q360 400 720 600t720-200v500H0V600z" fill="#1E3A34" />
          <path d="M200 300q50-80 130-80t130 80" stroke="#B08D57" strokeWidth="2" fill="none" />
          <path d="M800 200q60-100 160-100t160 100" stroke="#B08D57" strokeWidth="2" fill="none" />
          <ellipse cx="330" cy="220" rx="120" ry="160" fill="#1E3A34" opacity="0.3" />
          <ellipse cx="1100" cy="150" rx="100" ry="140" fill="#1E3A34" opacity="0.2" />
        </svg>
      </div>

      {/* Foreground decorative palms */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 select-none opacity-[0.03] overflow-hidden max-w-full">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-40 w-full max-w-full">
          <path d="M0 120V60Q180 0 360 40t360-20 360 30 360-10v80H0z" fill="#1E3A34" />
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-[90svh] max-w-7xl flex-col md:flex-row">
        {/* Left: text + stats */}
        <motion.div
          className="flex flex-1 flex-col justify-center px-6 pt-20 pb-4 md:px-12 md:pb-0 lg:px-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="font-body text-sm font-medium uppercase tracking-widest text-accent1"
          >
            {siteConfig.name}
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="mt-2 font-heading text-3xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            A Heritage Home.
            <br />
            A Peaceful Escape.
            <br />
            A Way of Life.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-2 max-w-lg font-body text-sm leading-relaxed text-primary/70 md:text-lg"
          >
            Five minutes from Anjuna Beach. A private standalone home surrounded by preserved greenery.
            Stocked kitchen, fast WiFi, washing machine — live Goa at your own pace.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-3 flex flex-wrap gap-2">
            <PrimaryButton text="Book on Airbnb" variant="accent1" size="lg" href={siteConfig.booking.airbnbUrl} />
            <PrimaryButton text="View Experiences" variant="outline" size="lg" />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={itemVariants}
            className="mt-3 flex items-center gap-4 border-t border-border pt-3"
          >
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-primary">{siteConfig.property.bedrooms}</p>
              <p className="font-body text-[11px] text-primary/60">Bedrooms</p>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-primary">{siteConfig.property.minAnjunaBeach.split(" ")[0]} min</p>
              <p className="font-body text-[11px] text-primary/60">Anjuna Beach</p>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-primary">{siteConfig.property.rating}</p>
              <p className="font-body text-[11px] text-primary/60">{siteConfig.property.reviewCount} reviews</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: interactive map + availability */}
        <motion.div
          className="flex flex-1 flex-col justify-center gap-2 px-6 pb-6 md:px-12 md:pb-0 lg:px-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <HeroMap compact />
          <AvailabilityCalendar />
        </motion.div>
      </div>
    </section>
  );
}
