"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function AvailabilityCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-xl border border-border bg-white/60 p-2 backdrop-blur-sm sm:p-3"
    >
      <div className="mb-1.5 flex items-center justify-between sm:mb-2">
        <h4 className="font-heading text-xs font-semibold text-primary">
          {monthNames[month]} {year}
        </h4>
        <a
          href={siteConfig.booking.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-body text-[10px] font-medium text-accent1 transition-colors hover:text-accent1/80"
        >
          Check live availability <ExternalLink size={10} />
        </a>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span
            key={d}
            className="text-center font-body text-[8px] font-medium text-muted-foreground sm:text-[9px]"
          >
            {d}
          </span>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isPast = day < todayDate;
          const isToday = day === todayDate;

          return (
            <div
              key={day}
              className={`flex h-7 w-7 items-center justify-center rounded-full font-body text-[10px] transition-colors sm:h-8 sm:w-8 sm:text-[11px] ${
                isToday
                  ? "bg-accent1 font-semibold text-primary-foreground"
                  : isPast
                    ? "text-muted-foreground/30"
                    : "text-primary/70"
              }`}
              aria-label={isToday ? `Today, ${monthNames[month]} ${day}` : `${monthNames[month]} ${day}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-1.5 flex items-center justify-between gap-x-2 border-t border-border pt-1.5 sm:mt-2 sm:pt-2">
        <span className="flex items-center gap-1 font-body text-[8px] text-muted-foreground sm:text-[9px]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent1 sm:h-2 sm:w-2" />
          Today
        </span>
        <span className="font-body text-[8px] text-muted-foreground sm:text-[9px]">
          Live dates on Airbnb
        </span>
      </div>
    </motion.div>
  );
}
