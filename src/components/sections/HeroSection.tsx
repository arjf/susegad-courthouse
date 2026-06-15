"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import AvailabilityCalendar from "./AvailabilityCalendar";
import PrimaryButton from "@/components/ui/PrimaryButton";

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
      <div className="pointer-events-none absolute inset-0 select-none opacity-[0.04]">
        <svg viewBox="0 0 1440 900" fill="none" className="h-full w-full">
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
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 select-none opacity-[0.03]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-40 w-full">
          <path d="M0 120V60Q180 0 360 40t360-20 360 30 360-10v80H0z" fill="#1E3A34" />
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        {/* Left: text + availability */}
        <motion.div
          className="flex flex-1 flex-col justify-center px-6 pt-28 pb-8 md:px-12 md:pb-0 lg:px-16"
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
            className="mt-3 font-heading text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            A Heritage Home.
            <br />
            A Peaceful Escape.
            <br />
            A Way of Life.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-lg font-body text-base leading-relaxed text-primary/70 md:text-lg"
          >
            Five minutes from Anjuna Beach. A private standalone home surrounded by preserved greenery.
            Stocked kitchen, fast WiFi, washing machine — live Goa at your own pace.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
            <a href={siteConfig.booking.airbnbUrl} target="_blank" rel="noopener noreferrer">
              <PrimaryButton text="Book on Airbnb" variant="accent1" size="lg" />
            </a>
            <PrimaryButton text="View Experiences" variant="outline" size="lg" />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center gap-6 border-t border-border pt-6"
          >
            <div className="text-center">
              <p className="font-heading text-xl font-bold text-primary">{siteConfig.property.bedrooms}</p>
              <p className="font-body text-xs text-primary/60">Bedrooms</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="font-heading text-xl font-bold text-primary">{siteConfig.property.minAnjunaBeach.split(" ")[0]} min</p>
              <p className="font-body text-xs text-primary/60">Anjuna Beach</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="font-heading text-xl font-bold text-primary">{siteConfig.property.rating}</p>
              <p className="font-body text-xs text-primary/60">{siteConfig.property.reviewCount} reviews</p>
            </div>
          </motion.div>

          {/* Availability calendar */}
          <motion.div variants={itemVariants} className="mt-6 max-w-sm">
            <AvailabilityCalendar />
          </motion.div>
        </motion.div>

        {/* Right: decorative vector art */}
        <motion.div
          className="relative flex flex-1 items-center justify-center px-6 py-12 md:px-12 lg:px-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative w-full max-w-lg">
            {/* Main decorative illustration */}
            <svg viewBox="0 0 500 500" fill="none" className="h-auto w-full">
              {/* Sky gradient */}
              <rect width="500" height="500" rx="20" fill="url(#heroGrad)" />

              {/* Sun */}
              <circle cx="380" cy="100" r="50" fill="#B08D57" opacity="0.6" />
              <circle cx="380" cy="100" r="35" fill="#B08D57" opacity="0.9" />

              {/* Goan house */}
              <rect x="180" y="250" width="160" height="120" rx="4" fill="#F7F3EB" stroke="#1E3A34" strokeWidth="2" />
              {/* Roof */}
              <polygon points="150,260 260,180 370,260" fill="#A05A2C" stroke="#1E3A34" strokeWidth="2" />
              {/* Door */}
              <rect x="230" y="300" width="40" height="70" rx="20" fill="#1E3A34" />
              {/* Windows */}
              <rect x="195" y="280" width="25" height="25" rx="2" fill="#B08D57" opacity="0.6" />
              <rect x="280" y="280" width="25" height="25" rx="2" fill="#B08D57" opacity="0.6" />

              {/* Palm trees */}
              <line x1="120" y1="280" x2="120" y2="370" stroke="#1E3A34" strokeWidth="4" strokeLinecap="round" />
              <path d="M120 280Q95 260 80 275Q110 265 120 280Z" fill="#1E3A34" />
              <path d="M120 280Q145 250 160 265Q130 260 120 280Z" fill="#1E3A34" />
              <path d="M120 280Q110 240 95 245Q115 255 120 280Z" fill="#1E3A34" />
              <path d="M120 280Q135 235 145 240Q130 255 120 280Z" fill="#1E3A34" />

              <line x1="380" y1="250" x2="380" y2="340" stroke="#1E3A34" strokeWidth="3" strokeLinecap="round" />
              <path d="M380 250Q360 235 350 245Q370 240 380 250Z" fill="#1E3A34" />
              <path d="M380 250Q400 225 410 235Q390 235 380 250Z" fill="#1E3A34" />

              {/* Greenery / bushes */}
              <ellipse cx="200" cy="370" rx="60" ry="20" fill="#1E3A34" opacity="0.7" />
              <ellipse cx="320" cy="375" rx="50" ry="15" fill="#1E3A34" opacity="0.6" />
              <ellipse cx="160" cy="370" rx="30" ry="12" fill="#1E3A34" opacity="0.5" />

              {/* Walkway */}
              <rect x="240" y="370" width="20" height="80" rx="2" fill="#1E3A34" opacity="0.3" />

              {/* Gate */}
              <rect x="235" y="420" width="30" height="35" rx="15" fill="none" stroke="#1E3A34" strokeWidth="2" />
              <line x1="250" y1="420" x2="250" y2="455" stroke="#1E3A34" strokeWidth="1" />

              {/* Birds */}
              <path d="M300 140Q305 135 310 140" stroke="#1E3A34" strokeWidth="1.5" fill="none" opacity="0.5" />
              <path d="M320 130Q325 125 330 130" stroke="#1E3A34" strokeWidth="1.5" fill="none" opacity="0.5" />
              <path d="M290 145Q294 140 298 145" stroke="#1E3A34" strokeWidth="1" fill="none" opacity="0.4" />

              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F7F3EB" />
                  <stop offset="100%" stopColor="#E8E0D0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-2 -left-4 rounded-2xl border border-border bg-secondary px-4 py-2 shadow-sm"
            >
              <p className="font-heading text-sm font-semibold text-primary">Self-catered stay</p>
              <p className="font-body text-[11px] text-muted-foreground">No services — just freedom</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
