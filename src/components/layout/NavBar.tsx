"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface NavBarProps {
  externalLinks: { label: string; href: string }[];
}

export default function NavBar({ externalLinks }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-secondary/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent",
        "border-b border-border/40",
      )}
    >
      <nav className="mx-auto flex max-w-dvw items-center justify-between px-6 py-3">
        <Link href="/" className="font-heading text-2xl font-bold text-primary">
          {siteConfig.name.split(" ").slice(-1)[0]}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {externalLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="font-body text-sm font-medium text-primary/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <a
            href={siteConfig.booking.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PrimaryButton text="Book on Airbnb" variant="accent1" size="sm" />
          </a>
        </motion.div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="text-primary" size={24} />
          ) : (
            <Menu className="text-primary" size={24} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-secondary border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-base font-medium text-primary/80 transition-colors hover:text-primary"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.booking.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PrimaryButton
                    text="Book on Airbnb"
                    variant="accent1"
                    size="default"
                  />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
