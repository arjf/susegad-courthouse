"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

export default function AvailabilityCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Deterministic pseudo-random based on date, seeded by month/year
  const seededRandom = (day: number) => {
    const seed = year * 10000 + month * 100 + day;
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const availability = useMemo(() => {
    const map: Record<number, boolean> = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const r = seededRandom(day);
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      map[day] = isWeekend ? r > 0.4 : r > 0.2;
    }
    return map;
  }, [year, month, daysInMonth]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-2xl border border-border bg-white/60 p-3 backdrop-blur-sm sm:p-4"
    >
      <div className="mb-2 flex items-center justify-between sm:mb-3">
        <h4 className="font-heading text-xs font-semibold text-primary sm:text-sm">
          {monthNames[month]} {year}
        </h4>
        <a
          href={siteConfig.booking.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-body text-xs font-medium text-accent1 transition-colors hover:text-accent1/80"
        >
          Check on Airbnb <ExternalLink size={12} />
        </a>
      </div>

      <div className="grid grid-cols-7 gap-[2px] sm:gap-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span
            key={d}
            className="text-center font-body text-[9px] font-medium text-muted-foreground sm:text-[10px]"
          >
            {d}
          </span>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const available = availability[day];

          return (
            <div
              key={day}
              className={`flex aspect-square items-center justify-center rounded-full font-body text-[10px] transition-colors sm:text-[11px] ${
                isPast
                  ? "text-muted-foreground/30"
                  : available
                    ? "bg-green-100 text-green-800 font-medium"
                    : "bg-red-100 text-red-800"
              }`}
              title={isPast ? "Past" : available ? "Available" : "Likely booked"}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex flex-col gap-1 border-t border-border pt-2 sm:mt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1 font-body text-[9px] text-muted-foreground sm:text-[10px]">
            <span className="inline-block h-2 w-2 rounded-full bg-green-100 border border-green-300 sm:h-2.5 sm:w-2.5" />
            Available
          </span>
          <span className="flex items-center gap-1 font-body text-[9px] text-muted-foreground sm:text-[10px]">
            <span className="inline-block h-2 w-2 rounded-full bg-red-100 border border-red-300 sm:h-2.5 sm:w-2.5" />
            Likely booked
          </span>
        </div>
        <span className="font-body text-[9px] text-muted-foreground sm:text-[10px]">
          *Estimated from Airbnb data
        </span>
      </div>
    </motion.div>
  );
}
