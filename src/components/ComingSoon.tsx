"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import {
  Globe,
  Send,
  Leaf,
  Mail,
  MapPin,
  Link2,
} from "lucide-react";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Globe className="h-5 w-5" />,
  facebook: <Link2 className="h-5 w-5" />,
  youtube: <Link2 className="h-5 w-5" />,
};

export default function ComingSoon({ variant = "full" }: { variant?: "full" | "hero" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
  };

  const content = (
    <>
      {/* Brand mark */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Leaf className="mx-auto h-10 w-10 text-accent1" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="font-heading text-5xl font-bold tracking-tight text-primary md:text-7xl"
      >
        {siteConfig.name}
      </motion.h1>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="h-0.5 w-16 origin-center bg-accent1"
      />

      {/* Subtitle / quip */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="font-heading text-2xl italic text-accent1 md:text-3xl"
      >
        {siteConfig.tagline}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="max-w-md font-body text-base leading-relaxed text-primary/60"
      >
        We&apos;re putting the final touches on our heritage home in Anjuna.
        Sign up to be the first to know when we open our doors.
      </motion.p>

      {/* Email signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {submitted ? (
          <p className="font-body text-accent1">
            Thank you! We&apos;ll let you know when we&apos;re ready.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full rounded-lg border border-primary/20 bg-white/50 py-3 pl-10 pr-4 font-body text-sm text-primary placeholder:text-primary/40 focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-accent1 px-5 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-accent1/90"
            >
              <Send className="h-4 w-4" />
              Notify Me
            </button>
          </form>
        )}
      </motion.div>

      {/* Contact details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary/50"
      >
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent1"
        >
          <Mail className="h-3.5 w-3.5" />
          {siteConfig.contact.email}
        </a>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Anjuna, Goa
        </span>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="flex items-center gap-4"
      >
        {Object.entries(siteConfig.social)
          .filter(([key]) => socialIcons[key])
          .map(([key, href]) => (
            <a
              key={key}
              href={href as string}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 text-primary/50 transition-all hover:border-accent1 hover:text-accent1"
            >
              {socialIcons[key]}
            </a>
          ))}
      </motion.div>
    </>
  );

  if (variant === "hero") {
    return (
      <section className="relative flex flex-col items-center justify-center bg-secondary py-24 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent1/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent1/5 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6">
          {content}
        </div>
      </section>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-secondary text-primary overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent1/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent1/5 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        {content}
      </div>
      <div className="relative z-10 border-t border-primary/10 px-6 py-4">
        <p className="text-center font-body text-xs text-primary/30">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
