"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

const currencies = Object.entries(siteConfig.pricing.rates).map(
  ([key, val]) => ({ id: key, ...val })
);

interface RegionToggleProps {
  onCurrencyChange: (currency: string) => void;
  currentCurrency: string;
}

export default function RegionToggle({
  onCurrencyChange,
  currentCurrency,
}: RegionToggleProps) {
  const [open, setOpen] = useState(false);
  const active = currencies.find((c) => c.id === currentCurrency) || currencies[0];

  return (
    <div className="relative">
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 font-body text-xs font-medium text-primary/70 transition-colors hover:border-accent1 hover:text-accent1"
      >
        <span>{active.symbol}</span>
        <span>{active.label}</span>
      </motion.button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {currencies.map((cur) => (
            <button
              key={cur.id}
              onClick={() => {
                onCurrencyChange(cur.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-4 py-2 font-body text-sm transition-colors hover:bg-secondary ${
                cur.id === currentCurrency
                  ? "bg-accent1/10 text-accent1 font-medium"
                  : "text-primary/70"
              }`}
            >
              <span>{cur.symbol}</span>
              <span>{cur.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
