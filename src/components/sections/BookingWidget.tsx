"use client";

import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface BookingWidgetProps {
  onSearch: (data: { checkIn: string; checkOut: string; guests: number }) => void;
}

export default function BookingWidget({ onSearch }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    onSearch({ checkIn, checkOut, guests });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-secondary p-8 shadow-lg">
      <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
        Check Availability
      </h3>
      <div className="space-y-5">
        <div>
          <label htmlFor="check-in" className="mb-1.5 block font-body text-sm font-medium text-primary/80">
            Check In
          </label>
          <input
            id="check-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 font-body text-sm text-primary outline-none transition-colors focus:border-accent1 focus:ring-1 focus:ring-accent1"
            required
          />
        </div>
        <div>
          <label htmlFor="check-out" className="mb-1.5 block font-body text-sm font-medium text-primary/80">
            Check Out
          </label>
          <input
            id="check-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 font-body text-sm text-primary outline-none transition-colors focus:border-accent1 focus:ring-1 focus:ring-accent1"
            required
          />
        </div>
        <div>
          <label htmlFor="guests" className="mb-1.5 block font-body text-sm font-medium text-primary/80">
            Guests
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 font-body text-sm text-primary outline-none transition-colors focus:border-accent1 focus:ring-1 focus:ring-accent1"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
        <PrimaryButton text="Search Availability" variant="accent1" size="lg" className="w-full" />
      </div>
    </form>
  );
}
