"use client";

import { motion } from "framer-motion";
import BookingWidget from "./BookingWidget";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function HeroSection() {
  const handleSearch = (data: { checkIn: string; checkOut: string; guests: number }) => {
    console.log("Search:", data);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="min-h-screen bg-secondary">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <motion.div
          className="flex flex-1 flex-col justify-center px-6 py-24 md:px-12 lg:px-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="font-body text-sm font-medium uppercase tracking-widest text-accent1"
          >
            The Susegad Courtyard
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="mt-4 font-heading text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            A Heritage Home.
            <br />
            A Peaceful Escape.
            <br />
            A Way of Life.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg font-body text-lg leading-relaxed text-primary/70"
          >
            Wake up to nature, savor authentic Goan flavors and create memories that last a lifetime.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton text="Explore Rooms" variant="accent1" size="lg" />
            <PrimaryButton text="View Experiences" variant="outline" size="lg" />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-8"
          >
            <div>
              <p className="font-heading text-2xl font-bold text-primary">3</p>
              <p className="font-body text-sm text-primary/60">Bedrooms</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-primary">5 min</p>
              <p className="font-body text-sm text-primary/60">Anjuna Beach</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-primary">4.9</p>
              <p className="font-body text-sm text-primary/60">Guest Rating</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-1 items-center justify-center px-6 py-12 md:px-12 lg:px-16"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <div className="w-full max-w-md">
            <BookingWidget onSearch={handleSearch} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
