"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import {
  Home,
  Bed,
  Compass,
  Image as ImageIcon,
  Star,
  MapPin,
} from "lucide-react";

const sectionIcons: Record<string, React.ReactNode> = {
  Home: <Home size={16} />,
  Bed: <Bed size={16} />,
  Compass: <Compass size={16} />,
  Image: <ImageIcon size={16} />,
  Star: <Star size={16} />,
  MapPin: <MapPin size={16} />,
};

export default function FloatingNav() {
  const sections = siteConfig.nav.sections;

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {sections.map((section) => (
          <a
            key={section.label}
            href={section.href}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-medium text-primary-foreground/70 transition-all hover:bg-primary-foreground/10 hover:text-primary-foreground"
            )}
          >
            {sectionIcons[section.icon] || null}
            <span className="hidden sm:inline">{section.label}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
